export const responseFormat = (data) => ({
  ...data,
  data: data?.data || null,
  message: data?.message || "OK",
  error: data?.error || null,
});

export const convertPaging = (data) => ({
  ...data.query,
  size: parseInt(data.query?.size) || 10,
  page: parseInt(data.query?.page) || 1,
  paging: parseInt(data.query?.paging) || 0,
});
