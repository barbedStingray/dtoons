import axios from 'axios';
import { takeLatest, put } from 'redux-saga/effects';


// Generate List of dToons
function* fetchDtoonsStore(action) {
    try {
        console.log('in fetch dToons saga');

        // GET request for dToon Store
        const dToons = yield axios.get(`/api/dToons/store`);

        // dispatch action to set reducer
        yield put({ type: 'SET_DTOONS_STORE', payload: dToons.data });

    } catch (error) {
      console.log(`error in GET dToon List`);
      alert(`Error in GET dToons!`);
    }
  }

  function* dToonStoreSaga() {
    yield takeLatest('FETCH_DTOONS_STORE', fetchDtoonsStore);
  }

  
  export default dToonStoreSaga;
