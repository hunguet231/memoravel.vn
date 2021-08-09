import axios from "axios";

const getImgUrl = async (dataImag, preset) => {
  const url = "https://api.cloudinary.com/v1_1/dcsvjbc6c/image/upload";

  const formData = new FormData();
  formData.append("file", dataImag);
  formData.append("upload_preset", preset);

  const res = await axios.post(url, formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.data.secure_url;

  return data;
};

module.exports = getImgUrl;
