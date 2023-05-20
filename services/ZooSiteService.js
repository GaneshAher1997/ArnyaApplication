import Configs from "../configs/Config";
import { sendPostData, sendGetRequest } from "../utils/RequestHelper";

export const createZooSite = async (requestObj) => {
	let url = Configs.BASE_URL + "/zoos/createZooSite";
	return sendPostData(url, requestObj);
};
