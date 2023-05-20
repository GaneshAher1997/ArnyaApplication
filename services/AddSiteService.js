import Config from "../configs/Config";
import { sendPostData,sendGetRequest} from "../utils/RequestHelper";

export const PostSite = async (requestObj) => {
    let url = Config.BASE_URL + "/user/add-user-site";
    return sendPostData(url,requestObj);
};

export const getListSite = async (zoo_id) => {
    let url = Config.BASE_URL + "zoos/getZooSite/"+zoo_id;
    return sendGetRequest(url);
};

export const EditSite = async (requestObj) => {
    let url = Config.BASE_URL + "/user/edit-user-site";
    return sendPostData(url,requestObj);
};

export const getUserSite = async (requestObj) => {
    let url = Config.BASE_URL + "/user/get-user-site";
    return sendGetRequest(url,requestObj);
};


export const deletesite = async (requestObj) => {
    let url = Config.BASE_URL + "/user/delete-user-site";
    return sendPostData(url,requestObj);
};


export const getZooSite = async (zoo_id) => {
    let url = Config.BASE_URL + "zoos/getZooSite/"+zoo_id;
    return sendGetRequest(url);
};

{
    /* Author: Wasim Akram
      Description : Add a DeleteSite Api(GET) service */
}
export const deleteSite = async (requestObj) => {
    let url = Config.BASE_URL + "zoos/deletezoosite";
    return sendGetRequest(url,requestObj);
};

{
    /*Author: Wasim Akram 
    Description:  Add a Edit Api(POST) service
    */
}

export const editSite = async (requestObj) => {
    let url = Config.BASE_URL + "zoos/editzoosite";
    return sendPostData(url,requestObj);
};