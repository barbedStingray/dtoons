import React from 'react';
import { useDrag } from 'react-dnd';


const DragnDrop = ({ dToon }) => {

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
        <img
            ref={drag}
            src={dToon.image}
            alt='dToon DRAG'
            // width='75px'
            height='75px'
            style={{ border: isDragging ? '5px solid gold' : '0px' }}
        />
    )
}

export default DragnDrop
