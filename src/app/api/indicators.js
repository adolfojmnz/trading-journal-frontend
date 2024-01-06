import { getIndicatorFilterParams } from "./filters";
import { useAuth } from "./auth";

export function getIndicators(filters) {
  const baseURL = "http://localhost:8000/api/indicators";
  const filterParams = getIndicatorFilterParams(filters);
  const url = `${baseURL}?${filterParams}`;

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  return useAuth(url, options);
}

export function getIndicatorDetail(indicatorID) {
  const url = `http://localhost:8000/api/indicators/${indicatorID}`;

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  return useAuth(url, options);
}