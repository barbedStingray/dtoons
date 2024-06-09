import { useState, useEffect } from 'react';
import axios from 'axios';

const localCache = {};

export default function useCollectDtoons(user) {
    const [userDtoons, setUserDtoons] = useState([]);
    const [dToonStatus, setdToonStatus] = useState('unloaded');
    // console.log('localCache', localCache);

    useEffect(() => {
        // if (!user) {
        //     setUserDtoons([]);
        // } else if (localCache[user]) {
        //     setUserDtoons(localCache[user]);
        // } else {
        //     requestUserDtoons(user);
        // }
        requestUserDtoons(user);
        }, [user]);

            async function requestUserDtoons(user) {
                console.log('API CALL');
                setUserDtoons([]);
                setdToonStatus('loading');
    
                try {
                    const dToons = await axios.get(`/api/dToons/collection/${user}`);
                    setUserDtoons(dToons.data);
                    // localCache[user] = dToons.data;
                    setdToonStatus('loaded');
                } catch (error) {
                    console.log('error in dToon user Collection custom hook');
                }
            }

    return [userDtoons, dToonStatus];
}
