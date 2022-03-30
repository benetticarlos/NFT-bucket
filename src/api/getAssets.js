import axios from 'axios';
import config from '../config/config';
export async function getAssets() {
  const options = {
    method: 'GET',
    url: 'https://api.opensea.io/api/v1/assets?order_direction=desc&limit=20&include_orders=false',
    params: { order_direction: 'desc', limit: '20', include_orders: 'false' },
    headers: {
      Accept: 'application/json',
      'X-API-KEY': config.OPENSEA_API_KEY,
    },
  };
  try {
    const response = await axios(options);
    console.log('process.env.REACT_APP_OPENSEA_API_KEY :>> ', process.env);
    return response.data.assets;
  } catch (error) {
    console.log(error);
  }
}
