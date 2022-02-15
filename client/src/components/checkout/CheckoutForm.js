import ExpandMoreOutlinedIcon from "@material-ui/icons/ExpandMoreOutlined";
import { AutoComplete, Col, Input, Row } from "antd";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import styles from "styles/CheckoutForm.module.scss";
import { shippingAddress } from "../../../store/Actions";
import { DataContext } from "../../../store/GlobalState";

export default function OrderForm() {
  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    city: "",
    district: "",
    ward: "",
    address_details: "",
  });
  const [dataAddress, setDataAddress] = useState([]);
  const [address, setAddress] = useState({
    cities: [],
    districts: [],
    district: {},
    wards: [],
  });
  const { dispatch } = useContext(DataContext);

  useEffect(() => {
    dispatch(shippingAddress(formData));
  }, [formData]);

  const fetchAddress = async () => {
    const url = "https://provinces.open-api.vn/api/?depth=3";
    const { data } = await axios.get(url);
    setDataAddress(data);
    setAddress({
      ...address,
      cities: data.map((obj) => ({ value: obj.name })),
    });
  };

  useEffect(() => {
    fetchAddress();
  }, []);

  const onFormDataChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onCityChange = (value) => {
    setFormData({
      ...formData,
      city: value,
    });
    const districts = dataAddress.find((obj) => obj.name === value).districts;
    setAddress({
      ...address,
      districts: districts.map((district) => ({
        value: district.name,
      })),
    });
  };

  const onDistrictChange = (value) => {
    setFormData({
      ...formData,
      district: value,
    });
    const city = dataAddress.find((obj) => obj.name === formData.city);
    const wards = city.districts.find((obj) => obj.name === value).wards;
    setAddress({
      ...address,
      wards: wards.map((ward) => ({ value: ward.name })),
    });
  };

  return (
    <div className="wrapper">
      <div className={styles.container}>
        <Row gutter={16}>
          <Col xs={24} lg={12}>
            <div className={styles.wrapField}>
              <p>Họ và tên</p>
              <input
                onChange={onFormDataChange}
                type="text"
                required
                name="full_name"
                className={styles.input}
              />
            </div>
          </Col>
          <Col xs={24} lg={12}>
            <div className={styles.wrapField}>
              <p>Số điện thoại</p>
              <input
                name="phone"
                onChange={onFormDataChange}
                type="text"
                required
                className={styles.input}
              />
            </div>
          </Col>
        </Row>
        <Row gutter={10}>
          <Col xs={24} lg={8}>
            <div className={styles.wrapField}>
              <p>Tỉnh/Thành phố</p>
              <AutoComplete
                style={{ width: "100%" }}
                onSelect={onCityChange}
                options={address.cities}
                filterOption={(inputValue, option) =>
                  option.value
                    .toUpperCase()
                    .indexOf(inputValue.toUpperCase()) !== -1
                }
              >
                <Input
                  type="text"
                  placeholder="Gõ để tìm kiếm"
                  required
                  className={styles.input}
                  suffix={<ExpandMoreOutlinedIcon />}
                />
              </AutoComplete>
            </div>
          </Col>
          <Col xs={24} lg={8}>
            <div className={styles.wrapField}>
              <p>Quận/Huyện</p>
              <AutoComplete
                style={{ width: "100%" }}
                onSelect={onDistrictChange}
                options={address.districts}
                filterOption={(inputValue, option) =>
                  option.value
                    .toUpperCase()
                    .indexOf(inputValue.toUpperCase()) !== -1
                }
              >
                <Input
                  type="text"
                  placeholder="Gõ để tìm kiếm"
                  required
                  className={styles.input}
                  suffix={<ExpandMoreOutlinedIcon />}
                />
              </AutoComplete>
            </div>
          </Col>
          <Col xs={24} lg={8}>
            <div className={styles.wrapField}>
              <p>Phường/Xã</p>
              <AutoComplete
                style={{ width: "100%" }}
                onSelect={(value) =>
                  setFormData({
                    ...formData,
                    ward: value,
                  })
                }
                options={address.wards}
                filterOption={(inputValue, option) =>
                  option.value
                    .toUpperCase()
                    .indexOf(inputValue.toUpperCase()) !== -1
                }
              >
                <Input
                  type="text"
                  placeholder="Gõ để tìm kiếm"
                  required
                  className={styles.input}
                  suffix={<ExpandMoreOutlinedIcon />}
                />
              </AutoComplete>
            </div>
          </Col>
        </Row>
        <div className={styles.wrapField}>
          <p>Địa chỉ cụ thể</p>
          <textarea
            name="address_details"
            onChange={onFormDataChange}
            placeholder="Tên đường, Toà nhà, Số nhà..."
            type="text"
            required
            className={styles.inputTextarea}
          />
        </div>
      </div>
    </div>
  );
}
