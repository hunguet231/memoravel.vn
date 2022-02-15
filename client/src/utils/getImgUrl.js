import axios from "axios";

const getImgUrl = async (dataImag) => {
  const url = "https://api.cloudinary.com/v1_1/dinntgpwi/image/upload";

  const formData = new FormData();
  formData.append("file", dataImag);
  formData.append("upload_preset", "memoravel");

  const res = await axios.post(url, formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.data.secure_url;

  return data;
};

module.exports = getImgUrl;
