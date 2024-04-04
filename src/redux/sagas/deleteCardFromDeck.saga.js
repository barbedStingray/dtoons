import axios from 'axios';
import { takeLatest, put } from 'redux-saga/effects';


// Generate List of dToons
function* deleteCardFromDeck(action) {
    try {
        console.log('delete card from deck saga');
        console.log('action.payload', action.payload);
        const card = action.payload.cardId;
        const deck = action.payload.deckId;

        // ! if you wanted to pass multiple data through delete 
        // yield axios.delete(`/api/dToons/deleteFromDeck`, { data: { card: card, deck: deck} });
        yield axios.delete(`/api/dToons/deleteFromDeck/${card}`);

        // Regenerate your deck reducer
        yield put({ type: 'FETCH_CARDS_FOR_DECK', payload: deck });


    } catch (error) {
        console.log(`error in delete card from deck saga`);
        alert(`error in delete card from deck saga`);
    }
}

function* deleteCardFromDeckSaga() {
    yield takeLatest('DELETE_CARD_FROM_DECK', deleteCardFromDeck);
}


export default deleteCardFromDeckSaga;
