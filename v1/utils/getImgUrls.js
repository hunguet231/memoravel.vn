import axios from "axios";

export const getImgUrls = async (images, preset) => {
  const url = "https://api.cloudinary.com/v1_1/dcsvjbc6c/image/upload";

  const formData = new FormData();

  let imgUrls = [];

  for (let i = 0; i < images.length; i++) {
    let image = images[i];

    formData.append("file", image.data_url);
    formData.append("upload_preset", preset);

    const res = await axios.post(url, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.data.secure_url;
    imgUrls.push(data);
  }

  return imgUrls;
};
