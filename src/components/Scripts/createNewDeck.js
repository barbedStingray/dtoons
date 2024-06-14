import axios from 'axios';

// function to POST the name of a deck, and refresh the list

export default async function createNewDeck(user, deckName, refreshDeckList) {
    console.log(user, deckName);
    try {
        await axios.post(`/api/decks/newDeck/${user}`, { deck: deckName });
        // regenerate deckList
        refreshDeckList();
    } catch (error) {
        console.error('Error creating new deck:', error);
    }
}
