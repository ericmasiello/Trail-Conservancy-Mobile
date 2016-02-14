import Firebase from 'firebase';
import _ from 'lodash';
import X2JS from 'x2js';
import FairLandXML from '../gpx/fairland';

const ROOT_URL = 'https://shining-fire-7029.firebaseio.com';

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
          return { ...obj, ID: i }
        }));
      }, (err) => {
        reject(err);
      });
    });
  }
}