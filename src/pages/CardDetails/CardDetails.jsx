import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const CardDetails = () => {

    const cardDetails = useSelector((store) => store.cardDetails);
    console.log('cardDetails', cardDetails);

    const dispatch = useDispatch();
    const { id } = useParams(); // hook for refresh and load
    console.log('ID', id);


    useEffect(() => {
        dispatch({ type: 'FETCH_CARD_DETAILS', payload: id });
    }, [id]);




    return (
        <div>
            <h1>CARD DETAILS</h1>

            {JSON.stringify(cardDetails)}
            <h2>{cardDetails.id}</h2>
            <img className='toonImage' src={cardDetails.image} alt='toon image' />
        </div>
    )
}

export default CardDetails
