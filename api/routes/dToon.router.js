const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// this is the /api/dToon router





// POST - Purchase a dToon pack of 2
router.post('/purchase', async (req, res) => {
    console.log('router /purchase');
    console.log('req.body', req.body);

    try {
        const getText = `SELECT * FROM "dtoons"
        ORDER BY RANDOM() LIMIT 2;`;
        const postText = `INSERT INTO "dcollection" ("user_id", "card_id")
        VALUES ($1, $2)`

        const newToons = await pool.query(getText);
        // console.log('newToons', newToons.rows);
        console.log('toon_one', newToons.rows[0]);
        console.log('toon_two', newToons.rows[1]);
        // console.log('toon_two', newToons.rows[1].id);
        const toonIdOne = newToons.rows[0].id;
        const toonIdTwo = newToons.rows[1].id;
        const toonOne = newToons.rows[0];
        const toonTwo = newToons.rows[1];

        // post new toons to the user collection
        await pool.query(postText, [req.body.id, toonIdOne]);
        await pool.query(postText, [req.body.id, toonIdTwo]);

        // res.sendStatus(201);
        // send your toons back to the buydToonPack.saga
        res.status(201).send([toonOne, toonTwo]);

    } catch (error) {
        console.log('Error in /purchase dToons');
        res.sendStatus(500);
    }
});



module.exports = router;

