'use strict';

import Firebase from 'firebase';
import _ from 'lodash';
const ROOT_URL = 'https://shining-fire-7029.firebaseio.com';


  function fetchAll(firebasePathSuffix){
     const firebase = new Firebase(`${ROOT_URL}/` + firebasePathSuffix);
     return new Promise(function(resolve, reject) {

      firebase.once('value', (response) => {
        resolve(_.map(response.val(), (obj, i) => {
          return { ...obj, ID: i };
        }));
      }, (err) => {
        reject(err);
      });
    });
  }

  function saveOne(firebasePathSuffix, objToSave){
    const firebase = new Firebase(`${ROOT_URL}/` + firebasePathSuffix);
    return new Promise((resolve, reject) => {
       firebase.update(objToSave).then(
          (photo) => {resolve(objToSave);},
          (err) => {reject(err);}
        );
    });
  }

   function fetchOne(firebasePathSuffix){
    const firebase = new Firebase(`${ROOT_URL}/` + firebasePathSuffix);
    return new Promise(function(resolve, reject) {
      firebase.once('value', (response) => {
          resolve(response.val());
      }, (err) => {
        reject(err);
      });
   });
  }

export {fetchAll,saveOne,fetchOne};

