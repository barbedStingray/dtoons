import axios from 'axios';
import { takeLatest, put } from 'redux-saga/effects';


// Generate List of dToons
function* userCollection(action) {
    try {
        console.log('in GET user Collection');
        console.log('userID', action.payload)
        // axios
        const collection = yield axios.get()

        // set reducer

    } catch (error) {
      console.log(`error in GET user Collection`);
      alert(`error in GET user Collection`);
    }
  }

  function* userCollectionSaga() {
    yield takeLatest('FETCH_USER_COLLECTION', userCollection);
  }

  
  export default userCollectionSaga;
