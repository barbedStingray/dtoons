const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();




// dToon 3 random store display
router.get('/store', (req, res) => {
    const queryText = `SELECT * FROM "dtoons"
                        ORDER BY RANDOM() LIMIT 3;`;

    pool.query(queryText).then((result) => {
        console.log(`/api/dToons/store query success!`);
        res.send(result.rows);
    }).catch((error) => {
        console.log('/api/dToons/store error query');
        res.sendStatus(500);
    });
});



// dToon user specific collection
router.get('/collection/:id', (req, res) => {
    console.log('in /collection/:id');

    // use dcollection.id to remove user specific cards from their library
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
FROM "dcollection"

JOIN "dtoons" ON "dtoons"."id" = "dcollection"."card_id"
WHERE "user_id" = $1;`;

    pool.query(queryText, [req.params.id]).then((result) => {
        console.log(`success!`);
        console.log(result.rows);
        res.send(result.rows);
    }).catch((error) => {
        console.log('Error in /collection/:id');
        res.sendStatus(500);
    });
})


// GET /cardDetails
router.get('/cardDetails/:id', (req, res) => {
    const queryText = `SELECT * FROM "dtoons" WHERE "id" = $1;`;

    // console.log('req.params.id', req.params.id);
    pool.query(queryText, [req.params.id]).then((result) => {
        console.log(`success for cardDetails`);
        res.send(result.rows.length > 0 ? result.rows[0] : {});
    }).catch((error) => {
        console.log('/cardDetails error query');
        res.sendStatus(500);
    });
});




// Purchase a dToon pack of 2
router.post('/purchase', async (req, res) => {
    console.log('router /purchase');
    console.log('req.body', req.body);

    try {
        const getText = `SELECT "id" FROM "dtoons"
        ORDER BY RANDOM() LIMIT 2;`;
        const postText = `INSERT INTO "dcollection" ("user_id", "card_id")
        VALUES ($1, $2)`

        const newToons = await pool.query(getText);
        console.log('newToons', newToons.rows);
        console.log('toon_one', newToons.rows[0].id);
        console.log('toon_two', newToons.rows[1].id);
        const toonOne = newToons.rows[0].id;
        const toonTwo = newToons.rows[1].id;

        await pool.query(postText, [req.body.id, toonOne]);
        await pool.query(postText, [req.body.id, toonTwo]);

        // res.sendStatus(201);
        // send your toons back to the buydToonPack.saga
        res.status(201).send({ toonOne, toonTwo });

    } catch (error) {
        console.log('Error in /purchase dToons');
        res.sendStatus(500);
    }
});






// CREATE NEW DTOON
router.post('/newToon', (req, res) => {

    console.log('req.body', req.body);

    const queryText = `INSERT INTO "dtoons"
        ("cardtitle", "character", "image", "color", "points", "desc0", "desc1", 
        "cardtype", "cardkind", "group", "gender", "role", "rarity", "movie")
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14);`;

    pool.query(queryText, [
        req.body.cardtitle,
        req.body.character,
        req.body.image,
        req.body.color,
        req.body.points,
        req.body.desc0,
        req.body.desc1,
        req.body.cardtype,
        req.body.cardkind,
        req.body.group,
        req.body.gender,
        req.body.role,
        req.body.rarity,
        req.body.movie
        
    ]).then((result) => {
        console.log(`success in POST new dToon`);
        res.sendStatus(201);
    }).catch((error) => {
        console.log(`error in POST /newToon`);
        res.sendStatus(500);
    });
});

module.exports = router;
