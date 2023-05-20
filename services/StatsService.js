import Configs from "../configs/Config";
import { sendPostData, sendGetRequest } from "../utils/RequestHelper";

export const getHomeStat = async (zoo_id) => {
	let url = Configs.BASE_URL + `zoo/home/${zoo_id}`;
	return sendGetRequest(url);
};

//Based on Post it will return the hierarchy data
export const getHierarchy = async (requestObj) => {
	let url = Configs.BASE_URL + "collection/stats";
	return sendPostData(url, requestObj);
};

export const getSpeciesAnimals = async (requestObj) => {
	let url = Configs.BASE_URL + "collection/species/animals";
	return sendPostData(url, requestObj);
};


export const getSpeciesHierarchy = async (requestObj) => {
	let url = Configs.BASE_URL + "collection/species/stats";
	return sendPostData(url, requestObj);
};
