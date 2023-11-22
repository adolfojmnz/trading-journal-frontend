import { useAuth } from "./auth";

export function requestMetricsSummary() {
  const url = `http://localhost:8000/api/trades/metrics`;

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  return useAuth(url, options);
}

export function requestPNLMetrics() {
  const url = `http://localhost:8000/api/trades/metrics/pnl`;

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  return useAuth(url, options);
}

export function requestTotalTradesMetrics() {
  const url = `http://localhost:8000/api/trades/metrics/total`;

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  return useAuth(url, options);
}

export function requestHoldingTimeMetrics() {
  const url = `http://localhost:8000/api/trades/metrics/holding-time`;

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  return useAuth(url, options);
}

export function requestVolumeMetrics() {
  const url = `http://localhost:8000/api/trades/metrics/volume`;

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  return useAuth(url, options);
}