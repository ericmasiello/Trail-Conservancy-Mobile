'use strict';
import { REQUEST_PHOTO, RECEIVE_PHOTO, SEND_PHOTO, SEND_PHOTO_REPLY,CACHE_LAST_SAVED_PHOTO} from './types';
import {savePhoto,fetchPhoto } from '../utilities/data-model';


function requestPhoto() {
  return {
    type: REQUEST_PHOTO
  };
}

function receivePhoto(payload) {
  return {
    type: RECEIVE_PHOTO,
    payload
  };
}

function sendPhoto(payload) {
  return {
    type: SEND_PHOTO,
    payload
  };
}

function sendPhotoReply(payload) {
  return {
    type: SEND_PHOTO_REPLY,
    payload
  };
}

function cacheLastSavedPhoto(payload) {
  return {
    type: CACHE_LAST_SAVED_PHOTO,
    payload
  };
}

function fetchPhotoActionCreator(geoHash) {
  return (dispatch) => {
    dispatch(requestPhoto());
    fetchPhoto(geoHash).then((response)=>{
      dispatch(receivePhoto(response));
    });
  };
}

function savePhotoActionCreator(geoHash, filePath){
  return (dispatch) => {
    dispatch(sendPhoto(geoHash, filePath));
    savePhoto(geoHash, filePath)
      .then((response)=>{
        dispatch(sendPhotoReply(response));
        dispatch(cacheLastSavedPhoto(response));
      });
  };
}


export {fetchPhotoActionCreator,savePhotoActionCreator};
