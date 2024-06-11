import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DragnDrop from '../../components/DragnDrop/DragnDrop';
import { useDrop } from 'react-dnd';

import ExpandableCard from '../../components/ExpandableCard/ExpandableCard';
// import useCollectDtoons from '../../components/Scripts/useCollectDtoons';
import useDeckCards from '../../components/Scripts/useDeckCards';


const EditDecksPage = () => {

    // const userCollection = useSelector((store) => store.userCollection);
    const deckCards = useSelector((store) => store.deckCards);
    const user = useSelector((store) => store.user);
    // console.log('deckCards', deckCards);

    const { deckId } = useParams();
    // console.log('deck id', deckId);

    // * custom hooks
    // const [userDtoons, dToonStatus] = useCollectDtoons(user.id);
    const [deckOfCarrds, deckStatus, addCard, removeCard] = useDeckCards(deckId);


    // drop functionality
    // const addCardToDeck = (dToon) => {
    //     console.log('adding toon id', dToon.id);
        // let dToonId = dToon.id;
        // dispatch({ type: 'ADD_CARD_TO_DECK', payload: { dToonId, deckId } });
    //     addCardToLocalDeck(dToon); // updates your custom Hook
    // }


    // const [openStates, setOpenStates] = useState([]);
    // const toggleCardOpenState = (index) => {
    //     // console.log('toggling card index');
    //     setOpenStates((prevStates) => {
    //         // console.log('openStates', openStates);
    //         const newStates = [...prevStates];
    //         newStates[index] = !newStates[index];
    //         return newStates;
    //     });
    // }



    // drop functionality
    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'dToon',
        drop: (item) => addCard(item.dToon.id, deckId),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));



    return (
        <div className='editDeck'>
            <h1>EDIT YOUR DECKNAME</h1>
            <h1>{deckId}</h1>


            <div className='deckView' ref={drop}>
                {deckOfCarrds.map((dToon) => (
                    <div key={dToon.id}>
                        <ExpandableCard
                            // key={dToon.id}
                            dToon={dToon}
                        // toggleCardOpenState={toggleCardOpenState}
                        // openStates={openStates}
                        />
                        {/* <img className='toonImage' src={dToon.image} alt='toon image' /> */}
                        <button onClick={() => removeCard(dToon.id, deckId)}>-</button>
                    </div>
                ))}
            </div>

            <p>userCollection</p>
            {/* <div className='collectionView'>
                {userDtoons.map((dToon) => (
                    <div key={dToon.id}>
                        <DragnDrop dToon={dToon} />
                    </div>
                ))}
            </div> */}



        </div>
    )
}

export default EditDecksPage
