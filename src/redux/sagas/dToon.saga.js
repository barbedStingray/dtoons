import axios from 'axios';
import { takeLatest, put } from 'redux-saga/effects';


// Generate List of dToons
function* fetchDtoons(action) {
    try {
        console.log('in fetch dToons saga');

        // GET request for dToon Store
        const dToons = yield axios.get(`/api/dToons/store`);


        // dispatch action to set reducer
        yield put({ type: 'SET_DTOONS', payload: dToons.data });


    } catch (error) {
      console.log(`error in GET dToon List`);
      alert(`Error in GET dToons!`);
    }
  }

  function* dToonSaga() {
    yield takeLatest('FETCH_DTOONS', fetchDtoons);
  }

  
  export default dToonSaga;
