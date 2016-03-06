'use strict';
import { REQUEST_ANNOTATIONS, RECEIVE_ANNOTATIONS, SEND_ANNOTATION, SEND_ANNOTATION_REPLY } from './types';
import dataModel from '../utilities/data-model';

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

function sendAnnotationReply(payload) {
  return {
    type: SEND_ANNOTATION_REPLY,
    payload
  };
}

export function fetchAnnotations() {
  console.log('fetchAnnotations');
  return (dispatch) => {
    dispatch(requestAnnotations());
    dataModel.fetchMapAnnotations().then((response)=>{
      dispatch(receiveAnnotations(response));
    });
  };
}

export function saveAnnotation(geoHash, annotation){
   return (dispatch) => {
    dispatch(sendAnnotation(geoHash, annotation));
    dataModel.saveAnnotation(geoHash, annotation).then((response)=>{
      dispatch(sendAnnotationReply(response));
    });
  };
}
