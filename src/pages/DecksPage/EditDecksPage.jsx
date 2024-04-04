import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const EditDecksPage = () => {

    const userCollection = useSelector((store) => store.userCollection);
    const user = useSelector((store) => store.user);

    const dispatch = useDispatch();


    const { deckId } = useParams();
    console.log('deck id', deckId);

  // set card collection reducer
  useEffect(() => {
    fetchUserdToons();
  }, []);

  function fetchUserdToons() {
    console.log('fetching users dToons');
    dispatch({ type: `FETCH_USER_COLLECTION`, payload: user.id });
  }

  return (
    <div>
      <h1>EDIT YOUR DECKNAME</h1>
      <h1>{deckId}</h1>
    <p>Deck Card List</p>

    <p>userCollection</p>
      {/* {JSON.stringify(userCollection)} */}
      {userCollection.map((card) => (
        <img className='toonImage' src={card.image} alt='toon image' />
      ))}
    </div>
  )
}

export default EditDecksPage
