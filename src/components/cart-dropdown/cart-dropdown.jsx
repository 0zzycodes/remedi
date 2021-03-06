import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import {
  selectCartItems,
  selectCartTotal
} from '../../redux/cart/cart.selectors';
import { toggleCartHidden } from '../../redux/cart/cart.actions';
import CustomButton from '../custom-button/custom-button';
import './cart-dropdown.scss';
import CartItem from '../cart-item/cart-item';
const CartDropdown = ({ cartItems, history, dispatch, total }) => {
  return (
    <div className="cart-dropdown">
      <div className="cart">
        <div className="cart-items">
          {cartItems.length ? (
            cartItems.map(cartItem => (
              <CartItem
                key={
                  cartItem.size
                    ? `${cartItem.size} ${cartItem.id}`
                    : cartItem.id
                }
                item={cartItem}
              />
            ))
          ) : (
            <span className="empty-message">Your cart is empty</span>
          )}
        </div>
      </div>
      {total === 0 ? (
        <CustomButton
          onClick={() => {
            history.push('/shop');
            dispatch(toggleCartHidden());
          }}
        >
          Go To Shop
        </CustomButton>
      ) : (
        <CustomButton
          onClick={() => {
            history.push('/checkout');
            dispatch(toggleCartHidden());
          }}
        >
          CHECKOUT
        </CustomButton>
      )}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotal
});

export default withRouter(connect(mapStateToProps)(CartDropdown));
