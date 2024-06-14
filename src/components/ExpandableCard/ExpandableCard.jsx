import React, { useState } from 'react';
import { AnimatePresence, motion as m } from 'framer-motion';




const ExpandableCard = ({ dToon, drag }) => {

    const [selectedId, setSelectedId] = useState(null);
    // console.log('selectedId', selectedId);


    return (
        <div
            key={dToon.id}
            className='dToonCard'
        >

            <div className='dToonStoreDisplay'>
                <m.div
                    layoutId={dToon.id}
                    // layoutId={`${selectedId}-modal`}
                    onClick={() => setSelectedId(dToon.id)}
                >
                    <m.p>{dToon.cardtitle}</m.p>
                    <m.img className='toonImageTest' ref={drag} src={dToon.image} alt='toon image here' />
                </m.div>
            </div>

            <AnimatePresence>
                {selectedId && (
                    <m.div
                        className='dToonModal'
                        layoutId={selectedId}
                        key='dToonModaltoon'
                        transition={{ layout: { duration: 0.75, type: 'spring' } }}
                    >
                        <m.p>{dToon.cardtitle}</m.p>
                        <m.img className='toonImageTest' src={dToon.image} alt='toon image here' />

                        {/* <m.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                    >
                        <p>Character: {dToon.character}</p>
                        <m.p>{dToon.movie}</m.p>
                        <m.p>{dToon.desc0}</m.p>
                        <m.p>{dToon.desc1}</m.p>
                    </m.div> */}

                        <m.button onClick={() => setSelectedId(null)}>BACK</m.button>
                    </m.div>
                )}
            </AnimatePresence>


        </div>
    )
}

export default ExpandableCard
