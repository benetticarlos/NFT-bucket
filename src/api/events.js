import axios from 'axios';
import config from '../config/config';

export default async function getEvents(asset_contract_address, token_id) {
  const options = {
    method: 'GET',
    url: 'https://api.opensea.io/api/v1/events',
    params: {
      token_id: token_id.toString(),
      asset_contract_address: asset_contract_address.toString(),
    },
    headers: {
      Accept: 'application/json',
      'X-API-KEY': config.OPENSEA_API_KEY,
    },
  };

  try {
    const response = await axios(options);
    console.log('events desde funcion:>> ', response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
