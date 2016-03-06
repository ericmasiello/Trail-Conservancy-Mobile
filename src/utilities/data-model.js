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
            console.log('Save annotation failed');
            reject(error);
          } else {
            console.log('Save annotation succeeded');
            resolve(); // undefined for resolve means save was a success
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
    return new Promise((resolve, reject) => {

      // Save thumbnail
       this.doResizePhoto(filePath, 20, 20, 30)
      .then((resizedFilePath) => this.doSavePhoto(resizedFilePath,'thumbnail',geoHash));

      // Save larger
      this.doResizePhoto(filePath, 200, 200, 30)
      .then((resizedFilePath) => this.doSavePhoto(resizedFilePath,'large',geoHash));

      // Return immediately and let both promises run in parallel in background
      resolve();
    });
  },
  doResizePhoto(filePath, width, height, quality){
    return new Promise((resolve, reject) => {
       ImageResizer.createResizedImage(filePath, width, height, 'JPEG', quality).then((resizedImageUri) => {
        resolve(resizedImageUri);
       });
    });
  },
  doSavePhoto(filePath, attrName, geoHash){
    const firebase = new Firebase(`${ROOT_URL}/photos/` + geoHash);

    return new Promise((resolve, reject) => {
      var onComplete = function(error) {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      };
      RNFS.readFile(filePath, 'base64').then((fileData) => {  
        var photo = {};
        photo[attrName] = fileData;
        photo.geoHash = geoHash;
        firebase.update(photo,onComplete);
      })
      .catch((error) => {
        console.log(error.message);
      });
    });
  },
};
