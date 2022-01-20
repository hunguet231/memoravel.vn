import {
  CloseOutlined,
  EditOutlined,
  PictureOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, Modal, Select } from "antd";
import Image from "next/image";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import ImageUploading from "react-images-uploading";
import categories from "../../../utils/categories";
const Editor = dynamic(() => import("../../../components/Editor"), {
  ssr: false,
});

const { Option } = Select;

const CreateForm = ({ visible, onCreate, onCancel, loading }) => {
  const [form] = Form.useForm();
  const [images, setImages] = useState([]);
  const [summary, setSummary] = useState("");
  const [price, setPrice] = useState("");
  const [details, setDetails] = useState("");

  const onChange = (imageList, addUpdateIndex) => {
    setImages(imageList);
  };

  const handleFormValuesChange = (changedValues, allValues) => {
    const addCommas = (num) =>
      num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    const removeNonNumeric = (num) => num.toString().replace(/[^0-9]/g, "");

    if (allValues.price) {
      form.setFieldsValue({
        price: addCommas(removeNonNumeric(allValues.price)),
      });
      setPrice(addCommas(removeNonNumeric(allValues.price)));
    }
  };
  return (
    <Modal
      visible={visible}
      title="Tạo sản phẩm mới"
      onCancel={onCancel}
      style={{ top: 20 }}
      width={1000}
      footer={[
        // eslint-disable-next-line react/jsx-key
        <Button onClick={onCancel}>Huỷ bỏ</Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={() => {
            form
              .validateFields()
              .then((values) => {
                form.resetFields();

                values.images = images;
                values.summary = summary;
                values.price = price;
                values.details = details;

                onCreate(values);
              })
              .catch((info) => {
                console.log("Validate Failed:", info);
              });
          }}
        >
          Ghi nhận
        </Button>,
      ]}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        onValuesChange={handleFormValuesChange}
      >
        <Form.Item
          name="title"
          label="Tên sản phẩm"
          rules={[
            {
              required: true,
              message: "Hãy điền tên sản phẩm!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="summary" label="Tóm tắt">
          <Editor
            defaultValue={""}
            value={summary}
            onChange={(data) => {
              setSummary(data);
            }}
          />
        </Form.Item>
        <Form.Item name="story" label="Câu chuyện">
          <Input.TextArea rows={3} />
        </Form.Item>
        <Form.Item
          name="price"
          label="Giá"
          rules={[
            {
              required: true,
              message: "Hãy điền giá tiền!",
            },
          ]}
        >
          <Input value={price} />
        </Form.Item>
        <Form.Item
          name=""
          label="Ảnh sản phẩm"
          rules={[
            {
              required: true,
              message: "Hãy chọn ảnh sản phẩm!",
            },
          ]}
        >
          <ImageUploading
            value={images}
            multiple
            onChange={onChange}
            dataURLKey="data_url"
          >
            {({
              imageList,
              onImageUpload,
              onImageRemoveAll,
              onImageUpdate,
              onImageRemove,
              isDragging,
              dragProps,
            }) => (
              // write your building UI
              <div className="upload__image-wrapper">
                <span className="remove-all" onClick={onImageRemoveAll}>
                  Xoá tất cả
                </span>
                <div
                  className="drop-zone"
                  style={isDragging ? { border: "2px dashed #74b9ff" } : null}
                  onClick={onImageUpload}
                  {...dragProps}
                >
                  <PictureOutlined style={{ marginRight: "8px" }} /> Chọn ảnh
                  hoặc kéo thả vào đây
                </div>
                <div className="preview">
                  {images.map((image, index) => (
                    <div key={index} className="image-item">
                      <div className="img">
                        <Image
                          objectFit="cover"
                          src={image.data_url}
                          width="100"
                          height="100"
                          alt=""
                        />
                        <CloseOutlined
                          className="remove"
                          onClick={() => onImageRemove(index)}
                        />
                        <EditOutlined
                          className="update"
                          onClick={() => onImageUpdate(index)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </ImageUploading>
        </Form.Item>
        <Form.Item
          name="details"
          label="Mô tả chi tiết"
          rules={[
            {
              required: true,
              message: "Hãy điền mô tả chi tiết!",
            },
          ]}
        >
          <Editor
            defaultValue={""}
            value={details}
            onChange={(data) => {
              setDetails(data);
            }}
          />
        </Form.Item>
        <Form.Item name="vectary_link" label="Link Vectary">
          <Input />
        </Form.Item>
        <Form.Item
          name="category"
          label="Danh mục"
          rules={[
            {
              required: true,
              message: "Hãy chọn danh mục!",
            },
          ]}
        >
          <Select placeholder="Chọn danh mục">
            {categories.map((category) => (
              <Option value={category.name} key={category.id}>
                {category.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="in_stock" label="Số lượng còn lại">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateForm;
