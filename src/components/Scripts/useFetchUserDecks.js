import { useState, useEffect } from 'react';
import axios from 'axios';

const localCache = {};

export default function useFetchUserDecks(user) {
    const [userDecks, setUserDecks] = useState([]);
    const [userDecksStatus, setUserDecksStatus] = useState('unloaded');
    // console.log('localCache', localCache);

    useEffect(() => {
        // if (!user) {
        //     setUserDtoons([]);
        // } else if (localCache[user]) {
        //     setUserDtoons(localCache[user]);
        // } else {
        //     requestUserDtoons(user);
        // }
        requestUserDecks(user);
    }, [user]);

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
