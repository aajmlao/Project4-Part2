import axios from "axios";
//links from google cloud
export function displayAllGameRecord(){
    return axios.get('https://gamerecords-406318.uc.r.appspot.com/findAllGameRecord');
}

export function displayGameRecord(userId){
    return axios.get(`https://gamerecords-406318.uc.r.appspot.com//findByGRUserId?userId=${userId}`);
}

export function saveGameRecord(postData) {
    return axios.post('https://gamerecords-406318.uc.r.appspot.com/saveGameRecord', postData);
  }

export function deleteByUserId(userId){
    return axios.delete(`https://gamerecords-406318.uc.r.appspot.com/deleteByUserId?userId=${userId}`);
}