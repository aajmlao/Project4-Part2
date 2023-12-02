import axios from "axios";
// link from the google cloud
export function displayAllUserRecord() {
    return axios.get('https://gamerecords-406318.uc.r.appspot.com/findAllUserRecord');
  }

  export function saveUserRecord(postData) {
    return axios.post('https://gamerecords-406318.uc.r.appspot.com/saveUserRecord', postData);
  }  

  export function updateUserRecord(userId,usernameInput){
    return axios.put(`https://gamerecords-406318.uc.r.appspot.com/updateHandle?userId=${userId}&newHandle=${usernameInput}`);
  }