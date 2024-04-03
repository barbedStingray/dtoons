import axios from 'axios';
import { takeLatest, put } from 'redux-saga/effects';


// Generate List of dToons
function* userCollection(action) {
    try {
        console.log('in GET user Collection');
        console.log('userID', action.payload)

        const collection = yield axios.get(`/api/dToons/collection/${action.payload}`);
        console.log('collection', collection.data)
        // set reducer
        yield put({ type: 'SET_USER_COLLECTION', payload: collection.data })

    } catch (error) {
      console.log(`error in GET user Collection`);
      alert(`error in GET user Collection`);
    }
  }

  function* userCollectionSaga() {
    yield takeLatest('FETCH_USER_COLLECTION', userCollection);
  }

  
  export default userCollectionSaga;
