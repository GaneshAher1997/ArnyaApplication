import Configs from "../configs/Config";
import { sendPostData, sendGetRequest } from "../utils/RequestHelper";


export const createEducationType = async(requestObj) =>{
    let url = Configs.BASE_URL + "/masters/educationtype"
    return sendPostData(url, requestObj)
  }
  