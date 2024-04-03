import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import dToonsStore from './dToonStore.reducer';
import cardDetails from './cardDetails.reducer';
import congratsNewdToons from './congratulations.reducer';
import userCollection from './userCollection.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga


// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  dToonsStore, // display for dToon store
  cardDetails, // single card detail display
  congratsNewdToons, // sets newly bought dToons
  userCollection, // sets the users collection of cards
  
});

export default rootReducer;
