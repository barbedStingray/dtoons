import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


const MydToons = () => {

  const user = useSelector((store) => store.user);
  const collection = useSelector((store) => store.userCollection);

  const dispatch = useDispatch();


useEffect(() => {
  fetchUserdToons();
}, []);


function fetchUserdToons() {
  console.log('fetching users dToons');
  dispatch({ type: `FETCH_USER_COLLECTION`, payload: user.id });
}


  return (
    <div>
      <h1>dToon Collection</h1>

    {JSON.stringify(collection)}

    </div>
  )
}

export default MydToons
