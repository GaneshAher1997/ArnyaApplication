import Configs from "../../configs/Config";
import { sendPostData, sendGetRequest } from "../../utils/RequestHelper";

export const getSectioninsight = async (requestObj) => {
	let url = Configs.BASE_URL + "zoos/section/insights";
	return sendPostData(url, requestObj);
};

export const getSectionlisting = async (requestObj) => {
	let url = Configs.BASE_URL + "zoos/section/listing";
	return sendPostData(url, requestObj);
};