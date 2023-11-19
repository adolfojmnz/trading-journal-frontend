import { useAuth } from "./auth";


export async function addTrade(data) {
  const url = "http://localhost:8000/api/trades";

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  };

  return useAuth(url, options);
}

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

export function updateTrade(tradeID, data) {
  const url = `http://localhost:8000/api/trades/${tradeID}`;

  const options = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  };

  return useAuth(url, options);
}

export function deleteTrade(tradeID) {
  const url = `http://localhost:8000/api/trades/${tradeID}`;

  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  return useAuth(url, options);
}
