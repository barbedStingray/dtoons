import { all, takeLatest, takeEvery, put } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import dToonStoreSaga from './dToonStore.saga';
import cardDetailsSaga from './cardDetails.saga';
import createdToonSaga from './createToon.saga';
import buydToonPackSaga from './buydToonPack.saga';
import userCollectionSaga from './userCollection.saga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga
// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
    dToonStoreSaga(), // fetch store images
    cardDetailsSaga(), // fetch singular card details
    createdToonSaga(), // create new dToon path
    buydToonPackSaga(), // purchase dToon pack
    userCollectionSaga(), // displays the users collection
  ]);  
}
