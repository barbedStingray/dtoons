import { useState, useEffect } from 'react';
import axios from 'axios';

const localCache = {};

export default function useCollectDtoons(deckId) {
    const [deckOfCards, setDeckOfCards] = useState([]);
    const [deckStatus, setDeckStatus] = useState('unloaded');
    // console.log('localCache', localCache);

    useEffect(() => {
        // if (!user) {
        //     setUserDtoons([]);
        // } else if (localCache[user]) {
        //     setUserDtoons(localCache[user]);
        // } else {
        //     requestUserDtoons(user);
        // }
        requestCardsForDeck(deckId);
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

    async function addCard(dToonId, deckId) {
        console.log('id CHECK', dToonId, deckId);
        // setDeckOfCards(prevDeckOfCards => [...prevDeckOfCards, card]);
        try {
            // ? I have to get the original id of the toon, not userCollection ID
            const result = await axios.get(`/api/dToons/getCardId/${dToonId}`);
            console.log('newCardId', result);
            console.log('newCardId', result.data[0].id);
            // console.log('deckId', action.payload.deckId);
            // const deckId = action.payload.deckId;
            const newCardId = result.data[0].id;
            // console.log('new variables', deckId, newCardId);
            // then post your toon to the deck
            await axios.post(`/api/dToons/addCard`, { deckId, newCardId });
            // Regenerate your deck
            requestCardsForDeck(deckId);

        } catch (error) {
            console.log('error in CUSTOM HOOK useDeckCards adding card', error);
        }
    }

    async function removeCard(cardId, deckId) {
        try {
            await axios.delete(`/api/dToons/deleteFromDeck/${cardId}`);
            // Regenerate your deck
            requestCardsForDeck(deckId);
        } catch (error) {
            console.log('error in CUSTOM HOOK useDeckCards adding card', error);
        }

    }


    return [deckOfCards, deckStatus, addCard, removeCard];
}
