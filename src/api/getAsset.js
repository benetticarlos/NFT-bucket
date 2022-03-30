import axios from 'axios';

export default async function getAsset(asset_contract_address, token_id) {
  const options = {
    method: 'GET',
    url: `https://api.opensea.io/api/v1/asset/${asset_contract_address}/${token_id}`,
  };

  try {
    const response = await axios(options);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
