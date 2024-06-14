const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// this is the /api/shop router

// dToon 3 random store display
router.get('/display', (req, res) => {
    const queryText = `SELECT * FROM "dtoons"
                        ORDER BY RANDOM() LIMIT 3;`;

    pool.query(queryText).then((result) => {
        console.log(`/api/shop/display query success!`);
        res.send(result.rows);
    }).catch((error) => {
        console.log('/api/shop/display error query');
        res.sendStatus(500);
    });
});





module.exports = router;
