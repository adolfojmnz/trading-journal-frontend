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

export async function getTradeList(filters) {
  const base_url = "http://localhost:8000/api/trades";

  const filterParams = getFilterParams(filters);

  const url = `${base_url}?${filterParams}`;

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

const getFilterParams = (filters) => {
  let filterParams = "";

  if (filters.asset) {
    filterParams += `asset=${filters.asset}&`;
  }

  if (filters.type) {
    filterParams += `type=${filters.type}&`;
  }

  if (filters.open_date) {
    filterParams += `open_date_eq=${filters.open_date}&`;
  }

  if (filters.open_date_gte) {
    filterParams += `open_date_gte=${filters.open_date_gte}&`;
  }

  if (filters.open_date_lte) {
    filterParams += `open_date_lte=${filters.open_date_lte}&`;
  }

  if (filters.close_date) {
    filterParams += `close_date_eq=${filters.close_date}&`;
  }

  if (filters.close_date_gte) {
    filterParams += `close_date_gte=${filters.close_date_gte}&`;
  }

  if (filters.close_date_lte) {
    filterParams += `close_date_lte=${filters.close_date_lte}&`;
  }

  if (filters.volume) {
    filterParams += `volume_eq=${filters.volume}&`;
  }

  if (filters.volume_gte) {
    filterParams += `volume_gte=${filters.volume_gte}&`;
  }

  if (filters.volume_lte) {
    filterParams += `volume_lte=${filters.volume_lte}&`;
  }

  if (filters.pnl) {
    filterParams += `pnl_eq=${filters.pnl}&`;
  }

  if (filters.pnl_gte) {
    filterParams += `pnl_gte=${filters.pnl_gte}&`;
  }

  if (filters.pnl_lte) {
    filterParams += `pnl_lte=${filters.pnl_lte}&`;
  }

  if (filters.profit) {
    filterParams += `profit_eq=${filters.profit}&`;
  }

  if (filters.profit_gte) {
    filterParams += `profit_gte=${filters.profit_gte}&`;
  }

  if (filters.profit_lte) {
    filterParams += `profit_lte=${filters.profit_lte}&`;
  }

  if (filters.loss) {
    filterParams += `loss_eq=${filters.loss}&`;
  }

  if (filters.loss_gte) {
    filterParams += `loss_gte=${filters.loss_gte}&`;
  }

  if (filters.loss_lte) {
    filterParams += `loss_lte=${filters.loss_lte}`;
  }

  console.log(filterParams);
  return filterParams;
}
