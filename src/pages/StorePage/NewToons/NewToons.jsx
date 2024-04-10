import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import ExpandableCard from '../../../components/ExpandableCard/ExpandableCard';


const NewToons = () => {

    const newToons = useSelector((store) => store.congratsNewdToons);
    const [openStates, setOpenStates] = useState([]);

    const toggleCardOpenState = (index) => {
        // console.log('toggling card index');
        setOpenStates((prevStates) => {
            // console.log('openStates', openStates);
            const newStates = [...prevStates];
            newStates[index] = !newStates[index];
            return newStates;
        });
    }


    return (
        <div>
            <h1>YOUR NEW DTOONS!</h1>
            {/* {JSON.stringify(newToons)} */}

            {newToons.map((dToon) => (
                <ExpandableCard
                    key={dToon.id}
                    dToon={dToon}
                    toggleCardOpenState={toggleCardOpenState}
                    openStates={openStates}
                />
            ))}


        </div>
    )
}

export default NewToons
