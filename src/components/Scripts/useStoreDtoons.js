import { useState, useEffect } from 'react';
import axios from 'axios';

const localCache = {};

export default function useCollectDtoons() {
    const [storeDtoons, setStoreDtoons] = useState([]);
    const [statusDtoons, setStatusDtoons] = useState('unloaded');
    // console.log('localCache', localCache);

    useEffect(() => {
        // if (!user) {
        //     setUserDtoons([]);
        // } else if (localCache[user]) {
        //     setUserDtoons(localCache[user]);
        // } else {
        //     requestUserDtoons(user);
        // }
        requestStoreDisplay();
        }, []);

            async function requestStoreDisplay(user) {
                console.log('API CALL');
                setStoreDtoons([]);
                setStatusDtoons('loading');
    
                try {
                    const dToons = await axios.get(`/api/dToons/store`);
                    setStoreDtoons(dToons.data);
                    // localCache[user] = dToons.data;
                    setStatusDtoons('loaded');
                } catch (error) {
                    console.log('error in dToon user Collection custom hook');
                }
            }

    return [storeDtoons, statusDtoons];
}
