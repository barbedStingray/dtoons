import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const HomePage = () => {

  const user = useSelector((store) => store.user);

  const dispatch = useDispatch();

  // console.log('user', user); // this is the object
  

  return (
    <div>
      <h1>dToons User Page</h1>

      <h1>WELCOME: {user.username}</h1>

      <p>Rules Link</p>
      <p>Game Link</p>
      <p>Game Link</p>


      
    </div>
  )
}

export default HomePage
