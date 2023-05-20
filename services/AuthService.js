import Configs from "../configs/Config";
import { sendPostData, sendGetRequest } from "../utils/RequestHelper";

export const signin = async (requestObj) => {
  let url = Configs.BASE_URL + "v1/auth/login";
  return sendPostData(url, requestObj);
};

export const getRefreshToken = async () => {
  let url = Configs.BASE_URL + "v1/auth/refreshtoken";
  return sendPostData(url);
};
