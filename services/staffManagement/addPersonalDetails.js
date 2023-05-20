import Configs from "../../configs/Config";
import { sendPostData, sendGetRequest } from "../../utils/RequestHelper";

export const personalDetails = async (requestObj) => {
  let url = Configs.BASE_URL + "/user/adduserpersonaldetails";
  return sendPostData(url, requestObj);
};
export const EditpersonalDetails = async (requestObj) => {
  let url = Configs.BASE_URL + "/user/edituserpersonaldetails";
  return sendPostData(url, requestObj);
};
export const getPersonalDetails = async (requestObj) => {
  let url = Configs.BASE_URL + "user/getuserpersonaldetails";
  return sendGetRequest(url,requestObj);
};

export const addStaff = async (requestObj) => {
  let url = Configs.BASE_URL + "/user/add-staff";
  return sendPostData(url, requestObj);
};
export const getStaffList = async (requestObj) => {
  let url = Configs.BASE_URL + "user/get-zoo-staff";
  return sendPostData(url,requestObj);
};
export const getStaffDetails = async (id) => {
  let url = Configs.BASE_URL + "user/get-staff-details";
  return sendGetRequest(url,id);
};

export const emailExist = async (requestObj) => {
  let url = Configs.BASE_URL + "user/email-check";
  return sendPostData(url, requestObj);
};