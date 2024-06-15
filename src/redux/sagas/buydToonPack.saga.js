import axios from 'axios';
import { takeLatest, put } from 'redux-saga/effects';


// Generate List of dToons
function* buydToonPack(action) {
    try {
        console.log('in POST new dToon Purchase');
        console.log('action.payload', action.payload);
        
        // would have to assign this to a variable if you send things back?
        const newToons = yield axios.post(`/api/shop/purchase`, action.payload);
        console.log('newToons', newToons.data);

        // set a reducer for display of congratulations
        yield put({ type: 'CONGRATS_NEW_DTOONS', payload: newToons.data });
        
        // todo create the function trigger to reveal the screen /action.function? 

    } catch (error) {
      console.log(`error in POST new dToon Purchase`);
      alert(`error in POST new dToon Purchase!`);
    }
  }

  function* buydToonPackSaga() {
    yield takeLatest('BUY_DTOON_PACK', buydToonPack);
  }

  
  export default buydToonPackSaga;
