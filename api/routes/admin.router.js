const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


// This is the /api/admin route

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
