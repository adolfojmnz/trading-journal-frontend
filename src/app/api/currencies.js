import { useAuth } from "./auth";

export function getCurrencies() {
  const url = `http://localhost:8000/api/currencies`;

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  return useAuth(url, options);
}