import axios from 'axios';
import { takeLatest, put } from 'redux-saga/effects';


// Generate List of dToons
function* createNewToon(action) {
    try {
        console.log('in CREATE / POST new dToon');

        // POST a new dToon
        yield axios.post(`/api/admin/newToon`, action.payload);

    } catch (error) {
      console.log(`error in POST new dToon`);
      alert(`Error in POST new dToon!`);
    }
  }

  function* createdToonSaga() {
    yield takeLatest('CREATE_NEW_DTOON', createNewToon);
  }

  
  export default createdToonSaga;
