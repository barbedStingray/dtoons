import React, { useState, useEffect } from 'react';
import useDeckCards from '../../components/Scripts/useDeckCards';
import ExpandableCard from '../ExpandableCard/ExpandableCard';
import saveEditsToDeck from '../../components/Scripts/saveEditsToDeck';
import { useDrop } from 'react-dnd';

const EditDeck = ({ deckId, setDeckDisplay }) => {
    // const [deckOfCards] = useDeckCards(deckId);
    const [originalDeckOfCards, deckStatus] = useDeckCards(deckId);
    const [deckOfCards, setDeckOfCards] = useState([]);
    // console.log('originalDeckOfCards', originalDeckOfCards);
    // console.log('deckOfCards', deckOfCards);

    // Copy the original deck to local state when the component mounts
    useEffect(() => {
        setDeckOfCards([...originalDeckOfCards]);
    }, [originalDeckOfCards]);

    // ! Why does it refactor me to prevDeck? is it the same as deckOfCards?
    const handleAddCard = (dToon) => {
        setDeckOfCards(prevDeck => [...prevDeck, dToon]);
    };
    const handleRemoveCard = (cardId) => {
        setDeckOfCards(prevDeck => prevDeck.filter(card => card.id !== cardId));
    };

    // drop functionality
    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'dToon',
        drop: (item) => handleAddCard(item.dToon),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));


    return (
        <div>
            <p>LETS EDIT THIS DECK!</p>

            <button onClick={() => setDeckDisplay('deckList')}>Back to Deck List</button>
            <button onClick={() => saveEditsToDeck(deckOfCards, deckId)}>Save Deck</button>

            <div className='deckView' ref={drop}>
                {deckOfCards.map((dToon) => (
                    <div key={dToon.id}>
                        <ExpandableCard dToon={dToon} />
                        <button onClick={() => handleRemoveCard(dToon.id)}>-</button>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default EditDeck;
