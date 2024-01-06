import { useAuth } from "./auth";
import { getCountryFilterParams } from "./filters";

export function getCountries(filters) {
  const baseURL = "http://localhost:8000/api/countries";
  const filterParams = getCountryFilterParams(filters);
  const url = `${baseURL}?${filterParams}`;

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  return useAuth(url, options);
}

export function getCountryDetail(countryID) {
  const url = `http://localhost:8000/api/countries/${countryID}`;

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  return useAuth(url, options);
}