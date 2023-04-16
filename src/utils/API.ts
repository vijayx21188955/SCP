import axios from 'axios';

const endPoint = 'http://52.91.154.176:8000';
const globalPoint = 'http://3.236.171.13:8000';

export const fetchData = async(QUERY: string, GLOBAL: boolean) => {
  // Compose the URL for your project's endpoint and add the query
  const API_URL = `${GLOBAL ? globalPoint : endPoint}/${QUERY}`;
  console.log('get', API_URL);

  return await fetch(API_URL)
  .then((res) => res.json())
  .catch((error) => error);
};

export const fetchRequest = async(METHOD: string, QUERY: string, PARAM: any, GLOBAL: boolean) => {
  // Compose the URL for your project's endpoint and add the query
  const API_URL = `${GLOBAL ? globalPoint : endPoint}/${QUERY}`;
  console.log('Post', API_URL);

  return await fetch(API_URL, {
    method: METHOD,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(PARAM),
  })
  .then((res) => res.json())
  .catch((error) => error);
};

export const axioData = async (METHOD: string, QUERY: string, PARAM: any) => {
  let config = {
    method: METHOD,
    maxBodyLength: Infinity,
    url: `${globalPoint}/${QUERY}`,
    headers: { 
      'Content-Type': 'application/json'
    },
    data : JSON.stringify(PARAM)
  };
  
  return axios.request(config)
  .then((response) => response.data)
  .catch((error) => {
    console.log(error);
  });
}