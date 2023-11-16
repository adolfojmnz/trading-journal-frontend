import { useAuth } from "./auth";


export async function getTradeList() {
  const url = "http://localhost:8000/api/trades";

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  return useAuth(url, options);
}

export function getTradeDetail(tradeID) {
  const url = `http://localhost:8000/api/trades/${tradeID}`;

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  return useAuth(url, options);
}

