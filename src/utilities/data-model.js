'use strict';

import X2JS from 'x2js';
import FairLandXML from '../gpx/fairland';
import { resizePhoto, readPhotoToBase64 } from './photo-lib';
import { fetchAll, saveOne, fetchOne } from './firebase-lib';

function fetchMapTrail(){
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
}

function fetchMapAnnotations() {
  return fetchAll('annotations');
}

function saveAnnotation(geoHash, annotation) {
  return saveOne('annotations/' + geoHash, annotation);
}

function fetchPhoto(geoHash) {
   return fetchOne('photos/' + geoHash);
}

function savePhoto(geoHash, filePath) {
  return new Promise((resolve, reject) => {
    var thumb = resizePhoto(filePath, 20, 20, 30)
      .then((resizedFilePath) => readPhotoToBase64(resizedFilePath, geoHash))
      .catch((err) => {
        console.log(err.message);
      });

    var large = resizePhoto(filePath, 400, 500, 60)
      .then((resizedFilePath) => readPhotoToBase64(resizedFilePath, geoHash))
      .catch((err) => {
        console.log(err.message);
      });

    Promise.all([thumb,large]).then((arr) => {
        const data = {'thumb':arr[0],'large':arr[1],'geoHash':geoHash};
        saveOne('photos/' + geoHash,data).then(resolve(data));
    });

  });
}

export {fetchMapTrail,fetchMapAnnotations,saveAnnotation,fetchPhoto,savePhoto};
