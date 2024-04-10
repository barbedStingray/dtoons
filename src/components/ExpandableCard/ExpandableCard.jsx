import React, { useState } from 'react';
import { motion as m } from 'framer-motion';




const ExpandableCard = ({ dToon, drag }) => {

    const [openState, setOpenState] = useState(false);

    return (
        <m.div
            key={dToon.id}
            className='card'
            onClick={() => setOpenState(!openState)}
            layout
            // transition={{ layout: { type: 'spring' } }}
            transition={{ layout: { duration: 0.75, type: 'spring' } }}
        >
            <m.div layout='position'>
                <img ref={drag} className='toonImage' src={dToon.image} alt='toon image' />
            </m.div>

            {openState && (
                <m.div
                    className='expand'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    <p>Title: {dToon.cardtitle}</p>
                    <p>Character: {dToon.character}</p>
                    <p>Ability: {dToon.desc0}</p>
                    <p>Ability: {dToon.desc1}</p>
                    <p>Ability: {dToon.cardtype}</p>
                    <p>Ability: {dToon.cardkind}</p>
                    <p>Ability: {dToon.rarity}</p>
                    <p>Ability: {dToon.movie}</p>
                </m.div>
            )}

        </m.div>
    )
}

export default ExpandableCard
