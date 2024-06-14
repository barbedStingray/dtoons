import { useState, useEffect } from 'react';
import axios from 'axios';

// This script fetches user decks

export default function useFetchUserDecks(user, dependency) {
    const [userDecks, setUserDecks] = useState([]);
    const [userDecksStatus, setUserDecksStatus] = useState('unloaded');
    // console.log('localCache', localCache);

    useEffect(() => {
        requestUserDecks(user);
    }, [user, dependency]);

    async function requestUserDecks(user) {
        console.log('API CALL');
        setUserDecks([]);
        setUserDecksStatus('loading');

        try {
            const deckList = await axios.get(`/api/dToons/userDecks/${user}`);
            setUserDecks(deckList.data);
            // localCache[user] = dToons.data;
            setUserDecksStatus('loaded');
        } catch (error) {
            console.log('error in dToon user Collection custom hook');
        }
    }

    return [userDecks, userDecksStatus];
}
