import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';


import LogOutButton from '../LogOutButton/LogOutButton';



const Nav = () => {

    // freeForAll - landing, about
    // login - home

    const user = useSelector(store => store.user);
    // console.log('user', user);



    return (
        <div>
            <LogOutButton />

            <Link to='/' ><h3>home</h3></Link>
            <Link to='/about'><h3>about</h3></Link>

{/* Logged in users */}
            {user.id ?
                <>
                    <Link to='/store'><h3>dToons Store</h3></Link>
                    <Link to='/mydToons'><h3>Collection</h3></Link>
                    <Link to='/rules'><h3>Rules</h3></Link>
                    <Link to='/decks'><h3>Decks</h3></Link>
                </>
                :
                <></>
            }
            
{/* Admin Users */}
            {user.admin ?
                <>
                    <Link to='/newdToon'><h3>New dToon</h3></Link>
                </>
                :
                <></>
            }


        </div>
    )
}

export default Nav