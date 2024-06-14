import axios from 'axios';

// delete entire deck
export default async function deleteEntireDeck(deckId) {
    console.log('deleting entire deck', deckId);
    try {
        await axios.delete(`/api/decks/deleteDeckCards/${deckId}`);
        console.log('Deleted all cards in the deck');
        await axios.delete(`/api/decks/deleteDeckName/${deckId}`);
        console.log('Deck deleted entirely');

    } catch (error) {
        console.log('error in Edit Cards in a Deck', error);
    }
}
