const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// this is the /api/decks route


// ******************* GET

// GET user decknames 
router.get('/names/:id', (req, res) => {
    console.log('in GET /names user decks', req.params.id);
    const queryText = `SELECT "id", "deckname" FROM "ddecks"
                        WHERE "user_id" = $1;`;

    pool.query(queryText, [req.params.id]).then((result) => {
        console.log('success in GET /names userDecks');
        res.send(result.rows);
    }).catch((error) => {
        console.log('error in GET /names user decks');
        alert('Error in GET /names user Decks');
    });
});



// GET single deck cards
router.get('/cards/:id', (req, res) => {
    console.log('in router GET /cards/:id', req.params.id);

    // This fetches the id for the card in the user collection
    const queryText = `SELECT 
"dcollection"."id",
    "dtoons"."cardtitle",
    "dtoons"."character",
    "dtoons"."image",
    "dtoons"."color",
    "dtoons"."points",
    "dtoons"."desc0",
    "dtoons"."desc1",
    "dtoons"."cardtype",
    "dtoons"."cardkind",
    "dtoons"."group",
    "dtoons"."gender",
    "dtoons"."role",
    "dtoons"."rarity",
    "dtoons"."movie"
FROM "deck_cards"
JOIN "dcollection" ON "dcollection"."id" = "deck_cards"."card_id"
JOIN "dtoons" ON "dtoons"."id" = "dcollection"."card_id"
WHERE "deck_id" = $1;`

    pool.query(queryText, [req.params.id]).then((result) => {
        console.log('success in GET /cards/:id');
        res.send(result.rows);
    }).catch((error) => {
        console.log('error in GET /cards/:id');
        alert('error in GET /cards/:id');
    });
});





// ******************* POST



// POST - create new DeckName
router.post('/newDeck/:id', (req, res) => {
    console.log('req.body', req.body.deck);
    console.log('req.params', req.params.id);
    const deckName = req.body.deck;

    const queryText = `INSERT INTO "ddecks" ("user_id", "deckname")
                        VALUES ($1, $2);`;

    pool.query(queryText, [req.params.id, deckName]).then((result) => {
        console.log('successful new deck added');
        res.sendStatus(201);
    }).catch((error) => {
        console.log('error in creating a new deck');
        res.sendStatus(500);
    });
});



// POST - add a card into a deck
router.post('/addCard', (req, res) => {
    console.log('addCard, req.body', req.body);
    const { deckId, toonId } = req.body;
    console.log('deckId', deckId);
    console.log('toonId', toonId);

    const queryText = `INSERT INTO "deck_cards" ("deck_id", "card_id")
                        VALUES ( $1, $2 )`;

    pool.query(queryText, [deckId, toonId]).then((result) => {
        console.log('success in posting to the deck');
        res.sendStatus(201);
    }).catch((error) => {
        console.log('error in post to deck');
        alert('error in post to deck');
    });
});





// *********************** DELETE


// DELETE - remove all cards in a deck
router.delete('/deleteDeckCards/:id', (req, res) => {
    console.log('in /deleteDeckCards/:id', req.params.id);
    const queryText = `DELETE FROM "deck_cards"
                        WHERE "deck_id" = $1;`

    pool.query(queryText, [req.params.id]).then((result) => {
        console.log('delete from deck SUCCESS');
        res.sendStatus(201);
    }).catch((error) => {
        console.log('error in delete from deck');
        res.sendStatus(500);
    });
});


// todo DELETE - remove deckName from list
router.delete('/deleteDeckName/:id', (req, res) => {
    console.log('in /deleteDeckName/:id', req.params.id);
    const queryText = `DELETE FROM "ddecks" WHERE "id" = $1;`;

    pool.query(queryText, [req.params.id]).then((result) => {
        console.log('delete deck name SUCCESS');
        res.sendStatus(201);
    }).catch((error) => {
        console.log('error in delete deck name');
        res.sendStatus(500);
    });
});



module.exports = router;
