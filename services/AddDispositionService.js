// created by ganesh 
// Date:- 31 march 2023
// work:-
//  1.mannerOfDeath
//  2.carcassCondition
//  3.carcassDisposition


import { sendPostData, sendGetRequest } from "../utils/RequestHelper";
import Configs from "../configs/Config";



export const addanimalmortality = async (requestObj) => {
  let url = Configs.BASE_URL + "animal/addanimalmortality"
  return sendPostData(url, requestObj)
}

export const getAnimal = async (requestObj) => {
  let url = Configs.BASE_URL + "animals"
  return sendGetRequest(url, requestObj)
}
export const mannerOfDeath = async (requestObj) => {
  let url = Configs.BASE_URL + "masters/mannerofDeath";
  return sendGetRequest(url, requestObj);
};


export const carcassCondition = async (requestObj) => {
  let url = Configs.BASE_URL + "masters/carcassCondition";
  return sendGetRequest(url, requestObj);
};


export const carcassDisposition = async (requestObj) => {
  let url = Configs.BASE_URL + "masters/carcassDisposition";
  return sendGetRequest(url, requestObj);
};
