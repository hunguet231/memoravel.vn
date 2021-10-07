export const responseFormat = (data) => ({
  ...data,
  data: data?.data || null,
  message: data?.message || "OK",
  error: data?.error || null,
});

export const convertPaging = (data) => ({
  ...data.query,
  size: data.query?.size ? parseInt(data.query.size) : 10,
  page: data.query?.page ? parseInt(data.query.page) : 1,
  paging: data.query?.paging ? parseInt(data.query.paging) : 0,
});

export const validateEmail = (content) => {
  const regex =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return (
    content && regex.test(String(content).replace(/\s+/g, "").toLowerCase())
  );
};

export const validatePhone = (content) => {
  const regex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$/;
  const isValid = content && content.length > 8 && content.length <= 16;
  return (
    isValid && regex.test(String(content).replace(/\s+/g, "").toLowerCase())
  );
};

export const requestObjectMultiLang = (object, isEmpty = false) => {
  let objectLang = { ...object };

  if (object.vi && !object.en) {
    objectLang.en = object.vi;
  } else if (!object.vi && object.en) {
    objectLang.vi = object.en;
  } else if (!object.vi && !object.en && isEmpty) {
    objectLang = "";
  }

  return JSON.stringify(objectLang);
};

export const responseObjectMultiLang = (objectString, key) => {
  const data = JSON.parse(objectString);

  return key ? data[key] : data;
};

export const convertTitleToAlias = (title) => {
  return "";
};
