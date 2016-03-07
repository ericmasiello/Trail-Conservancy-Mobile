'use strict';
import { REQUEST_PHOTO, RECEIVE_PHOTO, SEND_PHOTO, SEND_PHOTO_REPLY } from './types';
import dataModel from '../utilities/data-model';

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

export function fetchPhoto() {
  return (dispatch) => {
    dispatch(requestPhoto());
    dataModel.fetchMapPhoto().then((response)=>{
      dispatch(receivePhoto(response));
    });
  };
}

export function savePhoto(geoHash, filePath){
   return (dispatch) => {
    dispatch(sendPhoto(geoHash, filePath));
    dataModel.savePhoto(geoHash, filePath).then((response)=>{
      dispatch(sendPhotoReply(response));
    });
  };
}
