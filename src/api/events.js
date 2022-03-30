import axios from 'axios';

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
      'X-API-KEY': '25d2252ed8444f49aeafd5ad5339cc34',
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
