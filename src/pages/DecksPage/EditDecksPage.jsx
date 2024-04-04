import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const EditDecksPage = () => {

    const userCollection = useSelector((store) => store.userCollection);
    const deckCards = useSelector((store) => store.deckCards);
    const user = useSelector((store) => store.user);
    console.log('deckCards', deckCards);

    const dispatch = useDispatch();


    const { deckId } = useParams();
    console.log('deck id', deckId);

    // set card collection reducer
    useEffect(() => {
        fetchUserdToons();
        fetchCardsForDeck();
    }, []);

    function fetchUserdToons() {
        console.log('fetching users dToons');
        dispatch({ type: `FETCH_USER_COLLECTION`, payload: user.id });
    }

    function fetchCardsForDeck() {
        console.log('fetching deckId:', deckId);
        dispatch({ type: 'FETCH_CARDS_FOR_DECK', payload: deckId });
    }

    function addCardToDeck(cardId) {
        console.log('adding card to deck', cardId);
        dispatch({ type: 'ADD_CARD_TO_DECK', payload: { cardId, deckId } });
    }

    function deleteCardFromDeck(cardId) {
        console.log('deleting card from deck');
        dispatch({ type: 'DELETE_CARD_FROM_DECK', payload: {cardId, deckId} });
    }



    return (
        <div>
            <h1>EDIT YOUR DECKNAME</h1>
            <h1>{deckId}</h1>



            <p>Deck Card List</p>
            {deckCards.map((card) => (
                <div key={card.id}>
                    <img className='toonImage' src={card.image} alt='toon image' />
                    <button onClick={() => deleteCardFromDeck(card.id, deckId)}>-</button>
                </div>
            ))}
            {/* {JSON.stringify(deckCards)} */}


            <p>userCollection</p>
            {/* {JSON.stringify(userCollection)} */}
            {userCollection.map((card) => (
                <div key={card.id}>
                    <img className='toonImage' src={card.image} alt='toon image' />
                    <button onClick={() => addCardToDeck(card.id, deckId)}>+</button>
                </div>
            ))}
        </div>
    )
}

export default EditDecksPage
