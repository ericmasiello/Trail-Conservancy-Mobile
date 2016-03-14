'use strict';

let ImageResizer = require('react-native-image-resizer').default;

var RNFS = require('react-native-fs');

  function resizePhoto(filePathToResize, width, height, quality) {
    return new Promise((resolve, reject) => {
       ImageResizer.createResizedImage(filePathToResize, width, height, 'JPEG', quality).then((resizedImageUri) => {
        resolve(resizedImageUri);
       });
    });
  }
  function readPhotoToBase64(filePath, geoHash) {
    return new Promise((resolve, reject) => {
      RNFS.readFile(filePath, 'base64').then((fileData) => {
        resolve('data:image/png;base64,' + fileData);
      })
      .catch((error) => {
        reject(error);
      });
    });
  }

  export {resizePhoto,readPhotoToBase64};

