export const getTradeFilterParams = (filters) => {
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

  return filterParams;
}

export const getAssetFilterParams = (filters) => {
  let filterParams = "";

  if (filters.symbol) {
    filterParams += `symbol=${filters.symbol}&`;
  }

  if (filters.base_currency_symbol) {
    filterParams += `base_currency_symbol=${filters.base_currency_symbol}&`;
  }
  if (filters.quote_currency_symbol) {
    filterParams += `quote_currency_symbol=${filters.quote_currency_symbol}&`;
  }
  if (filters.pip_decimal_position) {
    filterParams += `pip_decimal_position=${filters.pip_decimal_position}&`;
  }

  return filterParams;
}