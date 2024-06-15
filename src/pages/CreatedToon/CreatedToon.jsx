import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import InputChange from './InputChange';

import cardTree from '../../components/Scripts/dToonAttributes/cardTree';
import attColor from '../../components/Scripts/dToonAttributes/attColor';
import attPoints from '../../components/Scripts/dToonAttributes/attPoints';
import attMovie from '../../components/Scripts/dToonAttributes/attMovie';

const NewdToon = () => {


    const attType = ['People', 'Animal', 'Thing', 'Legend', 'Place'];
    console.log(attType);
    const { People, Animal, Thing, Legend, Place } = cardTree;
    console.log('cardTree', cardTree);

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
    function createNewdToon(e) {
        e.preventDefault();
        console.log(`submitting data to create dToon`, newToon);
        dispatch({ type: 'CREATE_NEW_DTOON', payload: newToon })
        // clear inputs
        setNewToon({
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
        })

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

    const [newCardAttributes, setNewCardAttributes] = useState({
        cardtitle: '',
        character: '',
        image: '',
        color: null,
        points: null,
        desc0: '',
        desc1: '',
        cardtype: null,
        cardkind: null,
        group: '',
        gender: '',
        role: '',
        rarity: '',
        movie: null,
    });
    console.log('newCardAttributes', newCardAttributes);

    function insertNewCardAttributes(e) {
        const { name, value } = e.target;
        console.log('name & value', name, value);
        setNewCardAttributes({ ...newCardAttributes, [name]: value });

        // // Reset cardkind to empty string when cardtype changes
        // if (name === 'cardtype') {
        //     setNewCardAttributes({ ...newCardAttributes, ['cardkind']: '' });
        // }
    }


    const getCardKindOptions = () => {
        switch (newCardAttributes.cardtype) {
            case 'People':
                return People;
            case 'Animal':
                return Animal;
            case 'Thing':
                return Thing;
            case 'Legend':
                return Legend;
            case 'Place':
                return Place;
            default:
                return [];
        }
    };
    const cardKindOptions = getCardKindOptions();


    return (
        <div>
            <h1>Lets make a dToon</h1>

            <select name='cardtype' onChange={insertNewCardAttributes}>
                <option value=''>Select Type</option>
                {attType.map((att) => (
                    <option key={att} value={att}>{att}</option>
                ))}
            </select>

            <select name='cardkind' onChange={insertNewCardAttributes}>
                <option value=''>Select Type</option>
                {cardKindOptions.map((att) => (
                    <option key={att} value={att}>{att}</option>
                ))}
            </select>

            <select name='color' onChange={insertNewCardAttributes}>
                <option value=''>Select Type</option>
                {attColor.map((att) => (
                    <option key={att} value={att}>{att}</option>
                ))}
            </select>

            <select name='points' onChange={insertNewCardAttributes}>
                <option value=''>Select Type</option>
                {attPoints.map((att) => (
                    <option key={att} value={att}>{att}</option>
                ))}
            </select>

            <select name='movie' onChange={insertNewCardAttributes}>
                <option value=''>Select Type</option>
                {attMovie.map((att) => (
                    <option key={att} value={att}>{att}</option>
                ))}
            </select>
            {JSON.stringify(newCardAttributes)}



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


            {JSON.stringify(newToon)}

            <img src={`${newToon.image}`} alt='new toon image' className='toonImage' />



        </div>
    )
}

export default NewdToon
