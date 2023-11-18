import { useAuth } from "./auth";


export function getAssetList() {
  const url = "http://localhost:8000/api/assets";

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  return useAuth(url, options);
}

export function getAssetDetails(assetID) {
  const url = `http://localhost:8000/api/assets/${assetID}`;

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  return useAuth(url, options);
}

export function updateAsset(assetID, data) {
  const url = `http://localhost:8000/api/assets/${assetID}`;

  const options = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  };

  return useAuth(url, options);
}