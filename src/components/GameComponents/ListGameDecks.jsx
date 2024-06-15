import React, { useState } from 'react';
import useDeckCards from '../Scripts/useDeckCards';

const ListGameDecks = ({ deck, setModalVisible, setPlayerOneDeckId }) => {

    const { id, deckname } = deck;
    const [deckOfCards, deckStatus] = useDeckCards(id);
    const [deckPreview, setDeckPreview] = useState(false);
    console.log('deck', deck);
    const toggleDeckPreview = () => setDeckPreview((prev) => !prev);


    function selectAndBeginGame(deckId) {
        console.log('begining the game with', deckId);
        setModalVisible(false);
        setPlayerOneDeckId(deckId);    
      }
    


    return (
        <div>
            <p onClick={toggleDeckPreview}>{deckname}</p>
            {deckPreview && (
                <>
                    {deckOfCards.map((dToon) => (
                        <div key={dToon.id}>
                            <p>{dToon.cardtitle}</p>
                        </div>
                    ))}
                </>
            )}
            <button onClick={() => selectAndBeginGame(id)}>Select</button>
        </div>
    );
};

export default ListGameDecks;
