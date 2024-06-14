import { useState, useEffect } from 'react';
import axios from 'axios';

// this script fetches the user cards for a single deck

export default function useCollectDtoons(deckId) {
    const [deckOfCards, setDeckOfCards] = useState([]);
    const [deckStatus, setDeckStatus] = useState('unloaded');

    useEffect(() => {
        if (!deckId) {
            setDeckOfCards([]);
            setDeckStatus('unloaded');
            return; 
        } else {
            requestCardsForDeck(deckId);
        }
    }, [deckId]);

    async function requestCardsForDeck(deckId) {
        console.log('API CALL');
        setDeckOfCards([]);
        setDeckStatus('loading');

        try {
            const deck = await axios.get(`/api/dToons/deck/${deckId}`);
            setDeckOfCards(deck.data);
            // localCache[user] = dToons.data;
            setDeckStatus('loaded');
        } catch (error) {
            console.log('error in dToon user Collection custom hook');
        }
    }

    return [deckOfCards, deckStatus];
}
