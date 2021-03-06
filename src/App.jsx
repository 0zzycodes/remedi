import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import './App.css';
import Homepage from './pages/home/homepage';
import Contact from './pages/contact/contact';
import ShopPage from './pages/shop/shop';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up';
import Checkout from './pages/checkout/checkout';
import Header from './components/header/header';
import {
  auth,
  createUserProfileDocument
  // addCollectionAndDocuments
} from './firebase/firebase.utils';
import { addLocation } from './redux/location/location.actions';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';
import { selectCartTotal } from './redux/cart/cart.selectors';
import { selectShippingDetail } from './redux/shipping/shipping.selectors';
import Footer from './components/footer/footer';
import CarePage from './pages/care/care-page';
import ResellerPage from './pages/reseller-page/reseller-page';
import ReferralPage from './pages/referral-page/referral-page';
import PaymentPage from './pages/payment/payment-page';
import UserPage from './pages/user/user-page';
// import RequestForm from './components/request-form/request-form';
import loader from './assets/loader.gif';
// import { selectCollectionsForPreview } from './redux/shop/shop.selector';

class App extends React.Component {
  state = {
    isAvailableInYourCountry: false,
    isLoading: true
  };
  unSubscribeFromAuth = null;
  componentDidMount() {
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    const {
      setCurrentUser
      // collectionsArray
    } = this.props;
    this.unSubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        });
      }
      setCurrentUser(userAuth);
      this.setState({
        isLoading: false
      });
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          const lat = position.coords.latitude;
          const long = position.coords.longitude;
          fetch(`${proxy}https://geocode.xyz/${lat},${long}?json=1 `)
            .then(res => res.json())
            .then(res => {
              this.props.addLocation(res.country);
            });
        });
      }
      // addCollectionAndDocuments('collections', collectionsArray);
    });
  }
  componentWillUnmount() {
    this.unSubscribeFromAuth();
  }
  render() {
    const { currentUser, shippingDetails, total } = this.props;
    return this.state.isLoading ? (
      <div className="loading">
        <img src={loader} alt="Loader" />
      </div>
    ) : (
      <div>
        <Header />
        <div className="wrapper">
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route path="/shop" component={ShopPage} />
            <Route path="/contact" component={Contact} />
            <Route
              exact
              path="/checkout"
              render={() =>
                total === 0 ? <Redirect to="/shop" /> : <Checkout />
              }
            />
            {/* <Route exact path="/payment" component={PaymentPage} /> */}
            <Route
              exact
              path="/payment"
              render={() =>
                total === 0 ? (
                  <Redirect to="/shop" />
                ) : shippingDetails.firstName ? (
                  <PaymentPage />
                ) : (
                  <Redirect to="/checkout" />
                )
              }
            />

            <Route exact path="/my-account" component={UserPage} />
            <Route exact path="/care" component={CarePage} />
            <Route exact path="/reseller" component={ResellerPage} />
            <Route exact path="/referral" component={ReferralPage} />
            <Route
              exact
              path="/signin"
              render={() =>
                currentUser ? <Redirect to="/" /> : <SignInAndSignUpPage />
              }
            />
          </Switch>
        </div>
        <Footer />
      </div>
    );

    // <div className="not-avail">
    //   <div>
    //     <h1 className="info">
    //       Sorry this website is not available in your country, yet
    //     </h1>
    //     <RequestForm />
    //   </div>
    // </div>
  }
}
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  total: selectCartTotal,
  shippingDetails: selectShippingDetail
  // collectionsArray: selectCollectionsForPreview
});
const mapDispatchToProps = dispatch => ({
  addLocation: location => dispatch(addLocation(location)),
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
