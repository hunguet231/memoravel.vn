import { UploadOutlined } from "@ant-design/icons";
import { Button, Image, message, Upload } from "antd";
import React from "react";

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("Hãy chọn định dạng ảnh JPG/PNG!");
  }
  const isLt3M = file.size / 1024 / 1024 < 2;
  if (!isLt3M) {
    message.error("Kích thước tối đa là 2MB!");
  }
  return isJpgOrPng && isLt3M;
}

export default class UploadImg extends React.Component {
  state = {
    loading: false,
    imageUrl: "",
  };

  handleChange = (info) => {
    if (info.file.status === "uploading") {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl) => {
        this.setState({
          imageUrl,
          loading: false,
        });

        this.props.getImageUrl(imageUrl, this.props.type);
      });
    }
  };

  render() {
    const { loading, imageUrl } = this.state;

    const uploadButton = (
      <Button
        icon={<UploadOutlined />}
        loading={loading}
        style={{ marginBottom: "5px" }}
      >
        Chọn ảnh
      </Button>
    );

    return (
      <>
        <Upload
          action={"/api/noop"}
          name="avatar"
          className="avatar-uploader"
          showUploadList={false}
          beforeUpload={beforeUpload}
          onChange={this.handleChange}
        >
          {uploadButton}
        </Upload>
        {(imageUrl || this.props.defaultData) && (
          <div className="img-upload-container">
            <Image
              src={imageUrl || this.props.defaultData}
              alt="Banner"
              className="img-upload-inner"
              style={{ maxHeight: "150px", width: "auto" }}
            />
          </div>
        )}
      </>
    );
  }
}
