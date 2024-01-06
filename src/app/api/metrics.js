import { useAuth } from "./auth";
import { getTradeFilterParams } from "./filters";

export function requestMetricsSummary(filters) {
  const baseURL = `http://localhost:8000/api/trades/metrics`;
  const filterParams = getTradeFilterParams(filters);
  const url = `${baseURL}?${filterParams}`;

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  return useAuth(url, options);
}

export function requestPNLMetrics(filters) {
  const baseURL = `http://localhost:8000/api/trades/metrics/pnl`;
  const filterParams = getTradeFilterParams(filters);
  const url = `${baseURL}?${filterParams}`;

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  return useAuth(url, options);
}

export function requestTotalTradesMetrics(filters) {
  const baseURL = `http://localhost:8000/api/trades/metrics/total`;
  const filterParams = getTradeFilterParams(filters);
  const url = `${baseURL}?${filterParams}`;

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  return useAuth(url, options);
}

export function requestHoldingTimeMetrics(filters) {
  const baseURL = `http://localhost:8000/api/trades/metrics/holding-time`;
  const filterParams = getTradeFilterParams(filters);
  const url = `${baseURL}?${filterParams}`;

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  return useAuth(url, options);
}

export function requestVolumeMetrics(filters) {
  const baseURL = `http://localhost:8000/api/trades/metrics/volume`;
  const filterParams = getTradeFilterParams(filters);
  const url = `${baseURL}?${filterParams}`;

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  return useAuth(url, options);
}

export function requestAssetMetrics(assetID) {
  const url = `http://localhost:8000/api/assets/${assetID}/metrics`

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  return useAuth(url, options);
}
