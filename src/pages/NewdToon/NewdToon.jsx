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
        points: ''
    });

    // one function, sets all variables
    const newToonChange = (key) => (e) => {
        setNewToon({ ...newToon, [key]: e.target.value });
    }

    function createNewdToon(e) {
        e.preventDefault();
        console.log(`submitting data to create dToon`, newToon);
        dispatch({ type: 'CREATE_NEW_DTOON', payload: newToon })
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


            <br />

            {JSON.stringify(newToon)}



        </div>
    )
}

export default NewdToon
