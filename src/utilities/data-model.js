'use strict';

import Firebase from 'firebase';
import _ from 'lodash';
import X2JS from 'x2js';
import FairLandXML from '../gpx/fairland';

const ROOT_URL = 'https://shining-fire-7029.firebaseio.com';

let ImageResizer = require('react-native-image-resizer').default;

var RNFS = require('react-native-fs');


export default {

  fetchMapTrail(){

    //Temporary until we get data from firebase containing trails
    const x2js = new X2JS();
    const fairland = x2js.xml2js(FairLandXML);

    return new Promise(function(resolve, reject) {

      setTimeout(()=>{
        resolve(fairland.gpx.trk[0].trkseg.trkpt.map((o)=> {
          return {
            latitude: parseFloat(o._lat),
            longitude: parseFloat(o._lon)
          };
        }));

      }, 1000);
    });
  },

  fetchMapAnnotations() {
    const firebase = new Firebase(`${ROOT_URL}/annotations`);
    return new Promise(function(resolve, reject) {

      firebase.once('value', (response) => {
        resolve(_.map(response.val(), (obj, i) => {
          return { ...obj, ID: i };
        }));
      }, (err) => {
        reject(err);
      });
    });
  },
  saveAnnotation(geoHash, annotation) {

    const firebase = new Firebase(`${ROOT_URL}/annotations/` + geoHash);
    return new Promise(function(resolve, reject) {
        var onComplete = function(error) {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        };
        annotation.geoHash = geoHash;
        firebase.update(annotation,onComplete);
    });
  },
  fetchPhoto(geoHash) {
    const firebase = new Firebase(`${ROOT_URL}/photos`);
    return new Promise(function(resolve, reject) {

      firebase.once('value', (response) => {
        resolve(_.map(response.val(), (obj, i) => {
          return { ...obj, ID: i };
        }));
      }, (err) => {
        reject(err);
      });
    });
  },
  savePhoto(geoHash, filePath) {

    var doSavePhoto = (filePathToSave, attrName, geoHashToSave) => {
      const firebase = new Firebase(`${ROOT_URL}/photos/` + geoHash);

      return new Promise((resolve, reject) => {
        var onComplete = function(error) {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        };
        RNFS.readFile(filePathToSave, 'base64').then((fileData) => {
          var photo = {};
          photo[attrName] = 'data:image/png;base64,' + fileData;
          photo.geoHash = geoHashToSave;
          firebase.update(photo,onComplete);
        })
        .catch((error) => {
          console.log(error.message);
        });
      });
    };

    var doResizePhoto = (filePathToResize, width, height, quality) => {
      return new Promise((resolve, reject) => {
         ImageResizer.createResizedImage(filePathToResize, width, height, 'JPEG', quality).then((resizedImageUri) => {
          resolve(resizedImageUri);
         });
      });
    };

    return new Promise((resolve, reject) => {

      // Save thumbnail
      doResizePhoto(filePath, 20, 20, 30)
      .then((resizedFilePath) => doSavePhoto(resizedFilePath,'thumbnail',geoHash));

      // Save larger
      doResizePhoto(filePath, 200, 200, 30)
      .then((resizedFilePath) => doSavePhoto(resizedFilePath,'large',geoHash));

      // Return immediately and let both promises run in parallel in background
      resolve();
    });

  },
};
