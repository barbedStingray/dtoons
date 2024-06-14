import React, { useState } from 'react';
import useDeckCards from '../../components/Scripts/useDeckCards';
import deleteEntireDeck from '../../components/Scripts/deleteEntireDeck';

const DeckPreview = ({ deck, setDeckId, setDeckDisplay, refreshUserDecks }) => {
    const { id, deckname } = deck;
    const [deckOfCards, deckStatus] = useDeckCards(id);
    const [deckPreview, setDeckPreview] = useState(false);
    console.log('deck', deck);

    const toggleDeckPreview = () => setDeckPreview((prev) => !prev);
    function toggleEditDeckView() {
        setDeckId(id);
        setDeckDisplay('editDeck');
    }

    const handleDeleteDeck = async () => {
        await deleteEntireDeck(id);
        refreshUserDecks();
      };



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
        <button onClick={toggleEditDeckView}>Edit</button>
        <button onClick={handleDeleteDeck}>Delete Deck</button>
        </div>
    );
};

export default DeckPreview;
