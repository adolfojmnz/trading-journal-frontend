import { getReportFilterParams } from "./filters";
import { useAuth } from "./auth";

export function getReports(filters) {
  const baseURL = "http://localhost:8000/api/reports";
  const filterParams = getReportFilterParams(filters);
  const url = `${baseURL}?${filterParams}`;

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  return useAuth(url, options);
}

export function getReportDetail(reportID) {
  const url = `http://localhost:8000/api/reports/${reportID}`;

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  return useAuth(url, options);
}