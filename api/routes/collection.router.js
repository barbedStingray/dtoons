const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// This is the /collection route



// route fetches and filters user dToon collection
router.get('/search/:id', async (req, res) => {
    console.log('searching user dToons PARAMS', req.params.id);
    
    const userId = req.params.id;
    const { colors, letters, points, rarity, page = 1, limit = 10 } = req.query; // = defaults if no parameter
    console.log('user', userId);
    console.log('colors', colors);
    console.log('letter', letters);
    console.log('points', points);
    console.log('rarity', rarity);
    console.log('page', page);
    console.log('limit', limit);

    if (!userId) {
        return res.status(400).send('User ID is Required');
    }

    const offset = (page - 1) * limit;

    // let queryText = 'SELECT * FROM "dtoons"';
    let queryText = `SELECT 
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
            JOIN "dtoonuser" ON "dtoonuser"."id" = "dcollection"."user_id"
            WHERE "dtoonuser"."id" = $1`;

    let countQueryText = `SELECT COUNT(*) AS total_count FROM "dcollection"
        JOIN "dtoons" ON "dtoons"."id" = "dcollection"."card_id"
        WHERE "dcollection"."user_id" = $1`;


    let queryValues = [userId];
    const conditions = [];


    // PARAMETERS - Query Text Building
    if (colors) {
        conditions.push('"color" = ANY($' + (queryValues.length + 1) + ')');
        queryValues.push(colors);
    }
    if (letters) {
        conditions.push('"character" ILIKE $' + (queryValues.length + 1));
        queryValues.push(`${letters}%`);
    }
    // if (points && points.length > 0) { // Adjusted for multiple points
    if (points) {
        conditions.push('"points" = ANY($' + (queryValues.length + 1) + ')');
        queryValues.push(points);
    }
    if (rarity) {
        conditions.push('"rarity" = ANY($' + (queryValues.length + 1) + ')');
        queryValues.push(rarity);
    }

    // main query additional conditions
    if (conditions.length > 0) {
        queryText += ' AND ' + conditions.join(' AND ');
        countQueryText += ' AND ' + conditions.join(' AND ');
    }

    // final logs for checking
    console.log('queryText', queryText);
    console.log('queryValues', queryValues);
    console.log('countQueryText', countQueryText);


    try {
        // main query to fetch data for current page
        const mainQueryResult = await pool.query(queryText + ` LIMIT $${queryValues.length + 1} OFFSET $${queryValues.length + 2}`, [...queryValues, limit, offset]);
        // query count for total number of items
        const countQueryResult = await pool.query(countQueryText, queryValues);
        // extract data
        const mainData = mainQueryResult.rows;
        const totalCount = countQueryResult.rows[0].total_count;
        // calculate total pages
        const totalPages = Math.ceil(totalCount / limit);
        // send your response package
        console.log('RESULTS PAGES', totalCount, totalPages);
        res.status(200).json({ results: mainData, totalCount, totalPages });

    } catch (error) {
        console.log('error in searching user toons', error);
        res.sendStatus(500);
    }
});







module.exports = router;
