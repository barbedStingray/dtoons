import React from 'react';
import { useDrag } from 'react-dnd';
import ExpandableCard from '../ExpandableCard/ExpandableCard';


const DragnDrop = ({ dToon, toggleCardOpenState, openStates }) => {

    // console.log('image', dToon.image );
    // console.log('id', dToon.id );

    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'dToon',
        item: { dToon: dToon },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));



    return (

        <ExpandableCard
            drag={drag}
            dToon={dToon}
            toggleCardOpenState={toggleCardOpenState}
            openStates={openStates}
        />
    )
}

export default DragnDrop
