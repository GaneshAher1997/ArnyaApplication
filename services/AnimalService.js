import Configs from "../configs/Config";
import { sendPostData, sendGetRequest } from "../utils/RequestHelper";

export const addAnimal = async (requestObj) => {
    let url = Configs.BASE_URL + "animal/create";
    return sendPostData(url, requestObj);
};

export const getAnimalConfigs = async (requestObj) => {
	let url = Configs.BASE_URL + "animal/getconfigs";
	return sendGetRequest(url,requestObj);
};

export const getAnimalList = async(requestObj) =>{
    let url = Configs.BASE_URL + "animals/getzooanimals"
    return sendGetRequest(url, requestObj)
  }

  export const getAnimalDetails = async (requestObj) => {
    let url = Configs.BASE_URL + "animal-details"
    return sendGetRequest(url, requestObj)
}

export const animalEditData = async (requestObj) => {
	let url = Configs.BASE_URL + "animal/update";
	return sendPostData(url, requestObj);
};

export const DeleteAnimal = async(requestObj) =>{
  let url = Configs.BASE_URL + "animal/remove"
  return sendPostData(url, requestObj)
}