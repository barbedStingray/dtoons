const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();




// dToon CARD ID - IMAGE
router.get('/store', (req, res) => {
    const queryText = `SELECT "id", "image" FROM "dtoons";`;

    pool.query(queryText).then((result) => {
        console.log(`/dToons query success!`);
        res.send(result.rows);
    }).catch((error) => {
        console.log('/dToons error query');
        res.sendStatus(500);
    });
});


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






router.post('/newToon', (req, res) => {

    console.log('req.body', req.body);

    const queryText = `INSERT INTO "dtoons"
        ("cardtitle", "character", "image", "color", "points")
        VALUES ($1, $2, $3, $4, $5);`;

        pool.query(queryText, [
            req.body.cardtitle,
            req.body.character,
            req.body.image,
            req.body.color,
            req.body.points,
        ]).then((result) => {
            console.log(`success in POST new dToon`);
            res.sendStatus(201);
        }).catch((error) => {
            console.log(`error in POST /newToon`);
            res.sendStatus(500);
        });
});

module.exports = router;
