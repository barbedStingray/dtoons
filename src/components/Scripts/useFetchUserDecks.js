import { useState, useEffect } from 'react';
import axios from 'axios';

// This script fetches user deck names

export default function useFetchUserDecks(user, deckListUpdated) {
    const [userDecks, setUserDecks] = useState([]);
    const [userDecksStatus, setUserDecksStatus] = useState('unloaded');
    // console.log('localCache', localCache);

    useEffect(() => {
        requestUserDecks(user);
    }, [user, deckListUpdated]);

    async function requestUserDecks(user) {
        console.log('API CALL');
        setUserDecks([]);
        setUserDecksStatus('loading');

        try {
            const deckList = await axios.get(`/api/decks/names/${user}`);
            setUserDecks(deckList.data);
            // localCache[user] = dToons.data;
            setUserDecksStatus('loaded');
        } catch (error) {
            console.log('error in dToon user Collection custom hook');
        }
    }

    return [userDecks, userDecksStatus];
}
