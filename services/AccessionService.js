import Configs from "../configs/Config";
import { sendPostData, sendGetRequest } from "../utils/RequestHelper";

export const listAccessionType = async () => {
	let url = Configs.BASE_URL + "masters/getAccessionType";
	return sendGetRequest(url);
};

export const createAccessionType = async (requestObj) => {
	let url = Configs.BASE_URL + "masters/accessionType";
	return sendPostData(url, requestObj);
};

export const getAccessionType = async (itemId) => {
	let url = Configs.BASE_URL + "masters/accessionType/" + itemId;
	return sendGetRequest(url);
};
