import Config from "../configs/Config";
import { sendPostData ,sendGetRequest} from "../utils/RequestHelper";

export const getEnclosureBySectionId = async (requestObj) => {
    let url = Config.BASE_URL + `enclosure/details`;
    return sendGetRequest(url,requestObj);
};
export const getSectionDetails = async (requestObj) => {
    let url = Config.BASE_URL + `zoos/section/details`;
    return sendPostData(url,requestObj);
};
export const getSpeciesListingBySections = async (requestObj) => {
    let url = Config.BASE_URL + `collection/species/stats`;
    return sendPostData(url,requestObj);
};

export const getAnimalListBySections = async (requestObj) => {
    let url = Config.BASE_URL + `enclosure/animaldetails`;
    return sendGetRequest(url,requestObj);
};



