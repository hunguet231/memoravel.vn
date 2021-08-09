import { Button, Form, Modal, Input, Select } from "antd";
import {
  LinkOutlined,
  CloseOutlined,
  EditOutlined,
  PictureOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { getData } from "../../../utils/fetchData";
import ImageUploading from "react-images-uploading";
import SkeletonForm from "./SkeletonForm";
import dynamic from "next/dynamic";
import categories from "../../../utils/categories";
const Editor = dynamic(() => import("../../../components/Editor"), {
  ssr: false,
});

const { Option } = Select;

const UpdateForm = ({ visible, onUpdate, onCancel, updateItem, loading }) => {
  const [form] = Form.useForm();
  const [data, setData] = useState(null);
  const [images, setImages] = useState([]);
  const [summary, setSummary] = useState("");
  const [price, setPrice] = useState("");
  const [details, setDetails] = useState("");

  // fetch product
  useEffect(() => {
    const fetchData = async () => {
      setData(null);
      const res = await getData(`products/${updateItem && updateItem._id}`);
      setData(res.product);
    };

    fetchData();
  }, [updateItem]);

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
      title="Sửa đổi"
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
                values.id = updateItem._id;

                onUpdate(values);
              })
              .catch((info) => {
                console.log("Validate Failed:", info);
              });
          }}
        >
          Cập nhật
        </Button>,
      ]}
    >
      {data ? (
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
          onValuesChange={handleFormValuesChange}
        >
          <Form.Item
            name="title"
            label="Tên sản phẩm"
            // rules={[
            //   {
            //     required: true,
            //     message: "Hãy điền tên sản phẩm!",
            //   },
            // ]}
          >
            <Input defaultValue={data.title} />
          </Form.Item>
          <Form.Item name="summary" label="Tóm tắt">
            <Editor
              defaultValue={data.summary}
              value={summary}
              onChange={(data) => {
                setSummary(data);
              }}
            />
          </Form.Item>
          <Form.Item name="story" label="Câu chuyện">
            <Input.TextArea rows={3} defaultValue={data.story} />
          </Form.Item>
          <Form.Item
            name="price"
            label="Giá"
            // rules={[
            //   {
            //     required: true,
            //     message: "Hãy điền giá tiền!",
            //   },
            // ]}
          >
            <Input value={price} defaultValue={data.price} />
          </Form.Item>
          <Form.Item
            name=""
            label="Ảnh sản phẩm"
            // rules={[
            //   {
            //     required: true,
            //     message: "Hãy chọn ảnh sản phẩm!",
            //   },
            // ]}
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
            // rules={[
            //   {
            //     required: true,
            //     message: "Hãy điền mô tả chi tiết!",
            //   },
            // ]}
          >
            <Editor
              defaultValue={data.details}
              value={details}
              onChange={(data) => {
                setDetails(data);
              }}
            />
          </Form.Item>
          <Form.Item name="vectary_link" label="Link Vectary">
            <Input defaultValue={data.vectary_link} />
          </Form.Item>
          <Form.Item
            name="category"
            label="Danh mục"
            // rules={[
            //   {
            //     required: true,
            //     message: "Hãy chọn danh mục!",
            //   },
            // ]}
          >
            <Select placeholder="Chọn danh mục" defaultValue={data.category}>
              {categories.map((category) => (
                <Option value={category.name} key={category.id}>
                  {category.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="in_stock" label="Số lượng còn lại">
            <Input defaultValue={data.in_stock} />
          </Form.Item>
        </Form>
      ) : (
        <SkeletonForm />
      )}
    </Modal>
  );
};

export default React.memo(UpdateForm);
