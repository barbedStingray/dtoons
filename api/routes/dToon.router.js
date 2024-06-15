const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// this is the /api/dToon router

// GET user decknames 
router.get('/deckOne/:id', (req, res) => {
    console.log('in GET /deckOne', req.params.id);

    const queryText = `SELECT 
"dtoons"."id",
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
FROM "ddecks"
JOIN "deck_cards" ON "deck_cards"."deck_id" = "ddecks"."id"
JOIN "dcollection" ON "deck_cards"."card_id" = "dcollection"."id"
JOIN "dtoons" ON "dcollection"."card_id" = "dtoons"."id"
WHERE "ddecks"."id" = $1;`;

    pool.query(queryText, [req.params.id]).then((result) => {
        console.log('success in GET /deckOne');
        res.send(result.rows);
    }).catch((error) => {
        console.log('error in GET /deckOne:', error);
        res.status(500).send('Error in GET /deckOne');
    });
});

module.exports = router;
