import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import DragnDrop from '../../components/DragnDrop/DragnDrop';
import { useDrop } from 'react-dnd';





const EditDecksPage = () => {

    const userCollection = useSelector((store) => store.userCollection);
    const deckCards = useSelector((store) => store.deckCards);
    const user = useSelector((store) => store.user);
    console.log('deckCards', deckCards);

    const dispatch = useDispatch();

    const { deckId } = useParams();
    // console.log('deck id', deckId);

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

    function deleteCardFromDeck(cardId) {
        console.log('deleting card from deck');
        dispatch({ type: 'DELETE_CARD_FROM_DECK', payload: { cardId, deckId } });
    }
    // drop functionality
    const addCardToDeck = (dToon) => {
        console.log('adding toon id', dToon.id);
        let dToonId = dToon.id;
        dispatch({ type: 'ADD_CARD_TO_DECK', payload: { dToonId, deckId } });
    }


    // drop functionality
    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'dToon',
        drop: (item) => addCardToDeck(item.dToon),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));



    return (
        <div className='editDeck'>
            <h1>EDIT YOUR DECKNAME</h1>
            <h1>{deckId}</h1>


            <div className='deckView' ref={drop}>
                {deckCards.map((card) => (
                    <div key={card.id}>
                        <img className='toonImage' src={card.image} alt='toon image' />
                        <button onClick={() => deleteCardFromDeck(card.id, deckId)}>-</button>
                    </div>
                ))}
            </div>

            <p>userCollection</p>
            <div className='collectionView'>
                {/* {JSON.stringify(userCollection)} */}
                {userCollection.map((card) => (
                    <div key={card.id}>
                        <DragnDrop dToon={card} />
                    </div>
                ))}
            </div>



        </div>
    )
}

export default EditDecksPage
