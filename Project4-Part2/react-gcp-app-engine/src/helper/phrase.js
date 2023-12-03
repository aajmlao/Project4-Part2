import axios from "axios";

 export function fetchPhrases() {
      return axios.get('https://gamerecords-406318.uc.r.appspot.com/findAllPhrase');
    
  };
