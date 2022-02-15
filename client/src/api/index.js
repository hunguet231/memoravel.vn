import { ApiConstant, AppConstant } from "const";
import Cookies from "js-cookie";

const defaultFormRequest = {
  mode: "cors",
  cache: "no-cache",
  credentials: "same-origin",
  redirect: "follow",
  referrerPolicy: "no-referrer",
};

const getTokenAndHeader = (isFormData) => {
  const token = Cookies.get(AppConstant.APP_TOKEN)
    ? "Bearer " + Cookies.get(AppConstant.APP_TOKEN)
    : "";
  const overrideHeader = isFormData
    ? { ...ApiConstant.HEADER_FORM_DATA }
    : { ...ApiConstant.HEADER_DEFAULT };
  return {
    token,
    overrideHeader,
  };
};

export const fetchData = async (
  url = "",
  method = ApiConstant.METHOD.get,
  body = {},
  isFormData = false
) => {
  const { token, overrideHeader } = getTokenAndHeader(isFormData);
  const bodyData = [ApiConstant.METHOD.put, ApiConstant.METHOD.post].includes(
    method
  )
    ? { body: JSON.stringify(body) }
    : {};
  const response = await fetch(ApiConstant.BASE_URL + url, {
    method: method,
    ...defaultFormRequest,
    headers: {
      ...overrideHeader,
      Authorization: token,
    },
    ...bodyData,
  });
  const responseData = await response.json();
  return {
    ...responseData,
    status: response.status,
  };
};
