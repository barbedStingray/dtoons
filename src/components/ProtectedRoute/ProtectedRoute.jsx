import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// A Custom Wrapper Component -- This will keep our code DRY.
// Responsible for watching redux state, and returning an appropriate component
// API for this component is the same as a regular route

// THIS IS NOT SECURITY! That must be done on the server
// A malicious user could change the code and see any view
// so your server-side route must implement real security
// by checking req.isAuthenticated for authentication
// and by checking req.user for authorization

function ProtectedRoute({ children }) {
  const user = useSelector((store) => store.user);

  useEffect(() => {
    console.log('user', user.id);
  }, [user]);



  return (
    <>
      {user.id ?
        // If the user is logged in, show the protected component
        children
        :
        // Otherwise, redirect to the Loginpage
        // ! This navigate seems to trigger on page refreshes
        // <Navigate to='/' />
        // ! substitude empty stuff for now
        <></>
      }
    </>

  );
}

export default ProtectedRoute;
