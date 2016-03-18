'use strict';
import { REQUEST_ANNOTATIONS, RECEIVE_ANNOTATIONS, SEND_ANNOTATION, CACHE_LAST_ANNOTATION } from './types';
import {fetchMapAnnotations,saveAnnotation} from '../utilities/data-model';

function requestAnnotations() {
  return {
    type: REQUEST_ANNOTATIONS
  };
}

function receiveAnnotations(payload) {
  return {
    type: RECEIVE_ANNOTATIONS,
    payload
  };
}

function sendAnnotation(payload) {
  return {
    type: SEND_ANNOTATION,
    payload
  };
}


function cacheLastAnnotation(payload) {
  return {
    type: CACHE_LAST_ANNOTATION,
    payload
  };
}

function fetchAnnotationsActionCreator() {
  console.log('fetchAnnotations');
  return (dispatch) => {
    dispatch(requestAnnotations());
    fetchMapAnnotations().then((response)=>{
      dispatch(receiveAnnotations(response));
    });
  };
}

function saveAnnotationActionCreator(geoHash, annotation){
   return (dispatch) => {
    dispatch(sendAnnotation(geoHash, annotation));
    saveAnnotation(geoHash, annotation)
      .then((response)=>{
        dispatch(cacheLastAnnotation(response));
      })
      .catch((err) => console.log(err));
  };
}

export {saveAnnotationActionCreator,fetchAnnotationsActionCreator,cacheLastAnnotation};
