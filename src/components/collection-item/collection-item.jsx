import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// import {Link} from 'react-router-dom';
import { addItem } from '../../redux/cart/cart.actions';
import CustomButton from '../custom-button/custom-button';

import './collection-item.scss';

const CollectionItem = ({ item, addItem, history, match }) => {
  console.log(match);

  const { name, price, imageUrl } = item;
  const edName = name
    .split(' ')
    .join('-')
    .toLowerCase();
  console.log(edName);

  return (
    <div className="collection-item">
      {/* <div className="collection-item"> */}
      <div className="img-container">
        <div
          className="image"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
      </div>
      {/* <div className="image">
        <img src={imageUrl} alt="Product Preview" />
      </div> */}
      <div className="collection-footer">
        <h5
          className="name"
          onClick={() => history.push(`/shop/hoodies/${edName}`)}
        >
          {name.toUpperCase()}
        </h5>
        <span className="price">#{price * 300}</span>
      </div>
      <CustomButton onClick={() => addItem(item)} inverted>
        Cart &#43;
      </CustomButton>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  addItem: item => dispatch(addItem(item))
});

export default withRouter(connect(null, mapDispatchToProps)(CollectionItem));
