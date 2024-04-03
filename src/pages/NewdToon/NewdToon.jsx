import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import InputChange from './InputChange';


const NewdToon = () => {

    const dispatch = useDispatch();

    const [newToon, setNewToon] = useState({
        cardtitle: '',
        character: '',
        image: '',
        color: '',
        points: '',
        desc0: '',
        desc1: '',
        cardtype: '',
        cardkind: '',
        group: '',
        gender: '',
        role: '',
        rarity: '',
        movie: '',
    });

    // one function, sets all variables
    const newToonChange = (key) => (e) => {
        setNewToon({ ...newToon, [key]: e.target.value });
    }

    function verifyPhoto() {
        console.log(`lets check the photo...`);
    }

    function createNewdToon(e) {
        e.preventDefault();
        console.log(`submitting data to create dToon`, newToon);
        dispatch({ type: 'CREATE_NEW_DTOON', payload: newToon })

        // todo clear inputs
        
    }

    // mapping input types
    const inputBoxes = [
        {
            value: newToon.cardtitle,
            placeholder: 'Card Title',
            type: 'text',
            attribute: 'cardtitle'
        },
        {
            value: newToon.character,
            placeholder: 'Character',
            type: 'text',
            attribute: 'character'
        },
        {
            value: newToon.image,
            placeholder: 'URL',
            type: 'text',
            attribute: 'image'
        },
        {
            value: newToon.color,
            placeholder: 'Color',
            type: 'text',
            attribute: 'color'
        },
        {
            value: newToon.points,
            placeholder: 'Points',
            type: 'text',
            attribute: 'points'
        },
        {
            value: newToon.desc0,
            placeholder: 'first ability',
            type: 'text',
            attribute: 'desc0'
        },
        {
            value: newToon.desc1,
            placeholder: 'second ability',
            type: 'text',
            attribute: 'desc1'
        },
        {
            value: newToon.cardtype,
            placeholder: 'Card Type',
            type: 'text',
            attribute: 'cardtype'
        },
        {
            value: newToon.cardkind,
            placeholder: 'Card Kind',
            type: 'text',
            attribute: 'cardkind'
        },
        {
            value: newToon.group,
            placeholder: 'Groups...',
            type: 'text',
            attribute: 'group'
        },
        {
            value: newToon.gender,
            placeholder: 'Gender',
            type: 'text',
            attribute: 'gender'
        },
        {
            value: newToon.role,
            placeholder: 'Role...',
            type: 'text',
            attribute: 'role'
        },
        {
            value: newToon.rarity,
            placeholder: 'Rarity',
            type: 'text',
            attribute: 'rarity'
        },
        {
            value: newToon.movie,
            placeholder: 'Movie',
            type: 'text',
            attribute: 'movie'
        }
    ];


    return (
        <div>
            <h1>Lets make a dToon</h1>


            <form onSubmit={createNewdToon}>
                {inputBoxes.map((box, i) => (
                    <InputChange
                        key={i}
                        value={box.value}
                        onChangeFunction={newToonChange}
                        placeholder={box.placeholder}
                        type={box.type}
                        attribute={box.attribute}
                    />
                ))}
                
                <button type='submit' >Create</button>
            </form>

            <button onClick={() => verifyPhoto()}>Verify URL</button>



            <br />

            {JSON.stringify(newToon)}



        </div>
    )
}

export default NewdToon
