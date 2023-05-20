import Config from "../configs/Config";
import { sendPostData ,sendGetRequest} from "../utils/RequestHelper";

export const ChangeEnclosureRequest = async (requestObj) => {
    let url = Config.BASE_URL + "enclosure/createenclosureentitytransferrequest";
    return sendPostData(url,requestObj);
};

export const AddEnclosure = async (requestObj) => {
    let url = Config.BASE_URL + "/enclosure/create-enclosure";
    return sendPostData(url,requestObj);
};

export const GetEnclosure = async (requestObj) => {
	let url = Config.BASE_URL + "enclosures";
	return sendPostData(url,requestObj);
}

export const GetDetailesEnclosure = async (itemId) => {
	let url = Config.BASE_URL + "/enclosure/get-enclosure/" + itemId;
	return sendGetRequest(url);
}
export const editEnclosure = async (requestObj) => {
    let url = Config.BASE_URL + "enclosure/update-enclosure";
    return sendPostData(url, requestObj);
};