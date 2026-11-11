export const SET_DIVIDEND_DETAILS_DATA =
  "corporateAction/SET_DIVIDEND_DETAILS_DATA";
export const SET_DIVIDEND_ID_INFO = "corporateAction/SET_DIVIDEND_DETAILS_DATA";

export const setDividendDetailsData = (payload) => ({
  type: SET_DIVIDEND_DETAILS_DATA,
  payload,
});

export const setDividendIdInfo = (payload) => ({
  type: SET_DIVIDEND_ID_INFO,
  payload,
});
