import {
  createSelector
} from 'reselect';
const selectShipping = state => state.shipping;



export const selectShippingDetails = createSelector(
  [selectShipping],
  shipping => shipping
);
export const selectCity = createSelector(
  [selectShipping],
  city => city.city
);
export const selectShippingDetail = createSelector(
  [selectShippingDetails],
  details => details.shippingDetails
);