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
    console.log('letters', letters);
    console.log('points', points);
    console.log('rarity', rarity);
    console.log('page', page);
    console.log('limit', limit);

    if (!userId) {
        return res.status(400).send('User ID is Required');
    }

    const offset = (page - 1) * limit;

    try {
        // Building the filter conditions
        let filterConditions = [];
        let queryValues = [userId];

        if (colors) {
            filterConditions.push('"dtoons"."color" = ANY($' + (queryValues.length + 1) + ')');
            queryValues.push(colors); // Assuming colors are passed as comma-separated values
        }
        if (letters) {
            filterConditions.push('"dtoons"."character" ILIKE $' + (queryValues.length + 1));
            queryValues.push(`${letters}%`);
        }
        if (points) {
            filterConditions.push('"dtoons"."points" = ANY($' + (queryValues.length + 1) + ')');
            queryValues.push(points); // Assuming points are passed as comma-separated values
        }
        if (rarity) {
            filterConditions.push('"dtoons"."rarity" = ANY($' + (queryValues.length + 1) + ')');
            queryValues.push(rarity); // Assuming rarity are passed as comma-separated values
        }

        // Base query to include card counts and filters
        let baseQueryText = `
        WITH CardCounts AS (
            SELECT 
                "card_id", 
                COUNT(*) AS "count"
            FROM "dcollection"
            WHERE "user_id" = $1
            GROUP BY "card_id"
        ),
        distinct_cards AS (
            SELECT DISTINCT "dcollection"."card_id"
            FROM "dcollection"
            JOIN "dtoons" ON "dtoons"."id" = "dcollection"."card_id"
            WHERE "dcollection"."user_id" = $1`;

        if (filterConditions.length > 0) {
            baseQueryText += ' AND ' + filterConditions.join(' AND ');
        }

        baseQueryText += `
        )
        SELECT 
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
            "dtoons"."movie",
            COALESCE(cc."count", 1) AS "count"
        FROM 
            distinct_cards
        JOIN 
            "dtoons" ON "dtoons"."id" = distinct_cards."card_id"
        LEFT JOIN 
            CardCounts AS cc ON distinct_cards."card_id" = cc."card_id"
        ORDER BY "dtoons"."character"
        LIMIT $${queryValues.length + 1} OFFSET $${queryValues.length + 2}`;

        queryValues.push(limit, offset);

        // final queries
        console.log('Final Query:', baseQueryText);
        console.log('Query Values:', queryValues);

        const mainQueryResult = await pool.query(baseQueryText, queryValues);
        
        // Count query for total number of items
        let countQueryText = `
        SELECT COUNT(DISTINCT "dcollection"."card_id") AS total_count
        FROM "dcollection"
        JOIN "dtoons" ON "dtoons"."id" = "dcollection"."card_id"
        WHERE "dcollection"."user_id" = $1`;

        if (filterConditions.length > 0) {
            countQueryText += ' AND ' + filterConditions.join(' AND ');
        }

        console.log('Count Query:', countQueryText);
        const countQueryResult = await pool.query(countQueryText, [userId, ...queryValues.slice(1, queryValues.length - 2)]);
        
        const mainData = mainQueryResult.rows;
        const totalCount = countQueryResult.rows[0].total_count;
        const totalPages = Math.ceil(totalCount / limit);

        console.log('RESULTS PAGES', totalCount, totalPages);
        res.status(200).json({ results: mainData, totalCount, totalPages });

    } catch (error) {
        console.log('error in searching user toons', error);
        res.sendStatus(500);
    }
});

module.exports = router;
