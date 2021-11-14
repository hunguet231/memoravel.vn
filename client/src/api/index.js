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

  const response = await fetch(ApiConstant.BASE_URL + url, {
    method: method,
    ...defaultFormRequest,
    headers: {
      ...overrideHeader,
      Authorization: token,
    },
    body: JSON.stringify(body),
  });

  return response.json();
};
