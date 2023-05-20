import Configs from "../configs/Config";
import { sendPostData, sendGetRequest } from "../utils/RequestHelper";

export const AddIdProofService = async(requestObj) =>{
  let url = Configs.BASE_URL + "user/add-user-id-proof"
  return sendPostData(url, requestObj)
}

export const GetIdProofService = async(requestObj) =>{
  let url = Configs.BASE_URL + "user/get-user-id-proof"
  return sendGetRequest(url, requestObj)
}
export const getIdProofsForm = async() =>{
  let url = Configs.BASE_URL + "masters/idproofs/form"
  return sendGetRequest(url)
}
