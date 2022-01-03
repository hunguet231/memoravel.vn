import { AppConst } from '../const';
import { responseFormat } from '../utils';
import axios from 'axios';

// Giao hang tiet kiem
export const getShipment = async (req, res) => {
  try {
    const shipmentUrl = `${process.env.GHTK_API_URL}/services/shipment/fee?`;
    const params = new URLSearchParams({
      pick_province: req.body.pick_province,
      pick_district: req.body.pick_district,
      province: req.body.province,
      district: req.body.district,
      weight: req.body.weight,
      value: req.body.value || '',
      deliver_option: 'none',
      tags: req.body.tags || '',
    });

    const { data } = await axios.get(shipmentUrl + params, {
      headers: {
        'Content-Type': 'application/json',
        Token: process.env.GHTK_API_TOKEN,
      },
    });

    res.status(AppConst.STATUS_OK).json(data);
  } catch (error) {
    res
      .status(AppConst.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: 'error' }));
  }
};

export const createOrder = async (req, res) => {
  try {
    const orderUrl = `${process.env.GHTK_API_URL}/services/shipment/order/?ver=1.5`;
    const dataBody = {
      products: req.body.products,
      order: req.body.order,
    };

    const { data } = await axios.post(orderUrl, dataBody, {
      headers: {
        'Content-Type': 'application/json',
        Token: process.env.GHTK_API_TOKEN,
      },
    });

    res.status(AppConst.STATUS_OK).json(data);
  } catch (error) {
    res
      .status(AppConst.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: 'error' }));
  }
};

export const getOrder = async (req, res) => {
  try {
    const orderUrl = `${process.env.GHTK_API_URL}/services/shipment/v2/${req.params.id}`;

    const { data } = await axios.get(orderUrl, {
      headers: {
        'Content-Type': 'application/json',
        Token: process.env.GHTK_API_TOKEN,
      },
    });

    res.status(AppConst.STATUS_OK).json(data);
  } catch (error) {
    res
      .status(AppConst.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: 'error' }));
  }
};
