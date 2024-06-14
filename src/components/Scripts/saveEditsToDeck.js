import axios from 'axios';

export default async function saveEditCardsInDeck(dToonArray, deckId) {
    console.log('edit ARGs', dToonArray, deckId);
    try {
        // * Step 1: Delete all cards in the current deck
        await axios.delete(`/api/decks/deleteDeckCards/${deckId}`);
        // console.log('Deleted all cards in the deck');
        // * Step 2: Add each new card to the deck
        for (const toon of dToonArray) {
            // console.log('Processing toon', toon.id);
            let toonId = toon.id;
            await axios.post(`/api/decks/addCard`, { deckId, toonId });
        }
        // Optionally refresh the deck or handle success
        console.log('Deck saved successfully');
        // setDeckDisplay('deckList');

    } catch (error) {
        console.log('error in Edit Cards in a Deck', error);
    }
}
