import axios from 'axios';

export async function getAssets() {
  const options = {
    method: 'GET',
    url: 'https://api.opensea.io/api/v1/assets?order_direction=desc&limit=20&include_orders=false',
    params: { order_direction: 'desc', limit: '20', include_orders: 'false' },
    headers: {
      Accept: 'application/json',
      'X-API-KEY': process.env.OPENSEA_API_KEY,
    },
  };
  try {
    const response = await axios(options);

    return response.data.assets;
  } catch (error) {
    console.log(error);
  }
}
