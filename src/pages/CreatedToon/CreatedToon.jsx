import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import InputChange from './InputChange';

import cardTree from '../../components/Scripts/dToonAttributes/cardTree';
import characterTree from '../../components/Scripts/dToonAttributes/characterTree';
import attColor from '../../components/Scripts/dToonAttributes/attColor';
import attPoints from '../../components/Scripts/dToonAttributes/attPoints';

const NewdToon = () => {

    const attType = Object.keys(cardTree);
    const attMovie = Object.keys(characterTree);
    const [kinds, setKinds] = useState([]); // stores kinds based on Type
    const [characters, setCharacters] = useState([]); // stores characters based on Movie
    const allCharacters = Object.values(characterTree).flat(); // returns all characters in characterTree






    const dispatch = useDispatch();

    // function createNewdToon(e) {
    //     e.preventDefault();
    //     console.log(`submitting data to create dToon`, newToon);
    //     dispatch({ type: 'CREATE_NEW_DTOON', payload: newToon })
    //     // clear inputs
    //     setNewToon({
    //         cardtitle: '',
    //         character: '',
    //         image: '',
    //         color: '',
    //         points: '',
    //         desc0: '',
    //         desc1: '',
    //         cardtype: '',
    //         cardkind: '',
    //         group: '',
    //         gender: '',
    //         role: '',
    //         rarity: '',
    //         movie: '',
    //     })
    // }


    const [newCardAttributes, setNewCardAttributes] = useState({
        cardtitle: '',
        character: null,
        image: '',
        color: null,
        points: null,
        desc0: '',
        desc1: '', // pre written examples?
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
        if (name === 'cardtype') {
            setKinds(cardTree[value] || []);
            setNewCardAttributes({ ...newCardAttributes, [name]: value, cardkind: '' }); // Reset character when movie changes
        } else if (name === 'movie') {
            setCharacters(characterTree[value] || []);
            setNewCardAttributes({ ...newCardAttributes, [name]: value, character: '' }); // Reset character when movie changes
        } else {
            setNewCardAttributes({ ...newCardAttributes, [name]: value });
        }
    }



// SEARCHING FOR A CHARACTER FROM WHOLE LIST
// Used for finding target characters? 
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredCharacters, setFilteredCharacters] = useState([]);

    const handleSearchChange = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        if (query.length === 0) {
            setFilteredCharacters([]);
        } else {
            // Filter characters based on search query
            const filtered = allCharacters.filter((char) =>
                char.toLowerCase().includes(query)
            );
            // Sort filtered characters: starts with query first, then contains query
            const sortedFiltered = filtered.sort((a, b) => {
                const startsWithQueryA = a.toLowerCase().startsWith(query);
                const startsWithQueryB = b.toLowerCase().startsWith(query);
                if (startsWithQueryA && !startsWithQueryB) return -1;
                if (!startsWithQueryA && startsWithQueryB) return 1;
                return 0;
            });
            setFilteredCharacters(sortedFiltered);
        }
    };


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
                <option value=''>Select Kind</option>
                {kinds.map((att) => (
                    <option key={att} value={att}>{att}</option>
                ))}
            </select>

            <select name='color' onChange={insertNewCardAttributes}>
                <option value=''>Select Color</option>
                {attColor.map((att) => (
                    <option key={att} value={att}>{att}</option>
                ))}
            </select>

            <select name='points' onChange={insertNewCardAttributes}>
                <option value=''>Select Points</option>
                {attPoints.map((att) => (
                    <option key={att} value={att}>{att}</option>
                ))}
            </select>

            <select name='movie' onChange={insertNewCardAttributes}>
                <option value=''>Select Movie</option>
                {attMovie.map((att) => (
                    <option key={att} value={att}>{att}</option>
                ))}
            </select>

            <select name='character' onChange={insertNewCardAttributes}>
                <option value=''>Select Character</option>
                {characters.map((att) => (
                    <option key={att} value={att}>{att}</option>
                ))}
            </select>
            {JSON.stringify(newCardAttributes)}





            <div>
                <h4>Characters from Tree</h4>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="search a character..."
                />
                {filteredCharacters.length > 0 && (
                    <ul>
                        {filteredCharacters.map((char, index) => (
                            <li key={index}>{char}</li>
                        ))}
                    </ul>
                )}
            </div>




        </div>
    )
}

export default NewdToon
