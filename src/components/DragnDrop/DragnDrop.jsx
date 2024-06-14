import React from 'react';
import { useDrag } from 'react-dnd';
// import ExpandableCard from '../ExpandableCard/ExpandableCard';


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
        <div
            key={dToon.id}
            className='dToonCard'
        >

            <div className='dToonStoreDisplay'>
                <div
                    // layoutId={dToon.id}
                >
                    <p>{dToon.cardtitle}</p>
                    {/* <p>{dToon.count}</p> */}
                    <img className='toonImageTest' ref={drag} src={dToon.image} alt='toon image here' />
                </div>
            </div>


        </div>


        // <ExpandableCard
        //     drag={drag}
        //     dToon={dToon}
        //     // toggleCardOpenState={toggleCardOpenState}
        //     // openStates={openStates}
        // />
    )
}

export default DragnDrop
