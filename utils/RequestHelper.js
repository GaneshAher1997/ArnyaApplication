import { getAsyncData } from "./Utils";

const getRawJson = (obj) => {
  let rawJson = JSON.stringify(obj);
  return rawJson;
};

const getUserToken = async () => {
  const data = await getAsyncData("@antz_user_token");
  return `Bearer ${data}`;
};

export async function sendPostData(url, obj) {
  const token = await getUserToken();
  console.log(url);
  let response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: obj == undefined ? null : getRawJson(obj),
  });
  // console.log(await response.text());
  // return;
  let data = await response.json();
  if (!response.ok) {
    throw new ValidationError(data.message, data.errors);
  }
  return data;
}

export async function sendGetRequest(url, params = {}) {
  const token = await getUserToken();
  if (Object.keys(params).length != 0) {
    let queryString = new URLSearchParams(params);
    url += "?" + queryString.toString();
  }
  console.log(url);
  let response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: token
    },
  });
   // console.log(await response.text());
  // return;
  let data = await response.json();
  if (!response.ok) {
    throw new ValidationError(data.message, data.errors);
  }
  return data;
}

export class ValidationError extends Error {
  constructor(message, errors = {}) {
    super(message);
    this.name = "ValidationError";
    this.errors = errors;
  }
}