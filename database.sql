

-- USER 
CREATE TABLE "dtoonuser" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "currency" VARCHAR (30) default '200',
    "admin" boolean default FALSE
);
INSERT INTO "dtoonuser" ("username", "password")
VALUES ('ben', 'ben'), ('tom', 'tom');

DELETE FROM "dtoonuser";



-- dtoon Table
CREATE TABLE "dtoons" (
	"id" SERIAL PRIMARY KEY,
	"cardtitle" VARCHAR (100),
	"character" VARCHAR (50),
	"image" VARCHAR (300),
	"color" VARCHAR (50),
	"points" VARCHAR (50),
	"desc0" VARCHAR (80),
	"desc1" VARCHAR (80),
	"cardtype" VARCHAR (20),
	"cardkind" VARCHAR (20),
	"group" VARCHAR (25),
	"gender" VARCHAR (20),
	"role" VARCHAR (20),
	"rarity" VARCHAR (20),
	"movie" VARCHAR (50)
);

DELETE FROM "dtoons";


-- dCollection
CREATE TABLE "dcollection" (
	"id" SERIAL PRIMARY KEY,
	"user_id" integer REFERENCES "dtoonuser",
	"card_id" integer REFERENCES "dtoons"
	);
	
DELETE FROM "dcollection";



-- Decks
CREATE TABLE "ddecks" (
	"id" SERIAL PRIMARY KEY,
	"user_id" integer REFERENCES "dtoonuser",
	"deckname" VARCHAR (50)
	);
	
DELETE FROM "ddecks";

	

-- deck_card
CREATE TABLE "deck_cards" (
	"id" SERIAL PRIMARY KEY,
	"deck_id" integer REFERENCES "ddecks",
	"card_id" integer REFERENCES "dtoons"
	);
	
DELETE FROM "deck_cards";

	





-- upload default dToons
INSERT INTO "dtoons" 
("cardtitle", "character", "image", "color", "points", "desc0", "desc1",
"cardtype", "cardkind", "group", "gender", "role", "rarity", "movie")
	VALUES
	
	('day dreamer', 'ariel', 
	'https://res.cloudinary.com/dzh1qe1zp/image/upload/v1711999564/dToons/theLittleMermaid/Ariel/ariel-05.png', 
	'pink', '10', '+3 for each Sea Creature', '+2 if next to any flounder', 'legend', 'mermaid', 
 	'royalty', 'female', 'hero', 'rare', 'the little mermaid'),
	
	('sea witch', 'ursula', 
	'https://res.cloudinary.com/dzh1qe1zp/image/upload/v1711999774/dToons/theLittleMermaid/Ursula/ursula-01_assj9u.png', 
	'black', '9', '-3 to each Sea Creature', '+2 if next to any Jetsam', 'animal', 'octopus', 
	'witch', 'female', 'villain', 'rare', 'the little mermaid'),
		
	('dancer', 'esmeralda', 
	'https://res.cloudinary.com/dzh1qe1zp/image/upload/v1712098225/dToons/theHunchbackofNotreDame/Esmeralda/azcik6mazdrxnuefo1s5.png', 
	'blue', '7', '+3 if next to another MUSIC card', '', 'Person', 'Person', 
	'music', 'female', 'good', 'common', 'the hunchback of notre dame'),
	
	('elvis lives', 'stitch', 
	'https://res.cloudinary.com/dzh1qe1zp/image/upload/v1712098493/dToons/LiloandStitch/Stitch/innnub94fxy85lwnhgz1.png', 
	'green', '5', '+5 to any Lilo in play', '', 'legend', 'monster', 
	'music', 'male', 'hero', 'epic', 'lilo and stitch'),

	('fish are friends', 'bruce', 
	'https://res.cloudinary.com/dzh1qe1zp/image/upload/v1712098672/dToons/FindingNemo/Bruce/kkxn0abgql87hkdctqqi.png', 
	'orange', '10', '+2 for each fish', '-2 to each fish', 'animal', 'shark', 
	'', 'male', 'neutral', 'legend', 'finding nemo'),
	
	('magic time', 'fairy godmother', 
	'https://res.cloudinary.com/dzh1qe1zp/image/upload/v1712098915/dToons/Cinderella/FairyGodmother/blhkzqf14rngrcn5zbav.png', 
	'purple', '9', '+13 to any cinderella', '', 'legend', 'fairy', 
	'', 'female', 'sidekick', 'legend', 'cinderella'),
	
	('laugh it up', 'timon', 
	'https://res.cloudinary.com/dzh1qe1zp/image/upload/v1712099181/dToons/theLionKing/Timon/xf1rutda3wcqxubshyvc.png', 
	'red', '5', '+3 if Pumba is in play', '-1 if any LION is in play', 'animal', 'merekat', 
	'', 'male', 'sidekick', 'common', 'the lion king'),
	
	('adventure time', 'john smith', 
	'https://res.cloudinary.com/dzh1qe1zp/image/upload/v1712099478/dToons/Pocahontas/JohnSmith/chakydanvelnyu2ilr5y.png', 
	'silver', '2', '+2 to all explorers', '-2 to each Villain', 'Person', 'person', 
	'explorer, soldier', 'male', 'hero', 'mythic', 'pocahontas'),
	
	('neverlanding', 'peter pan', 
	'https://res.cloudinary.com/dzh1qe1zp/image/upload/v1712099627/dToons/PeterPan/PeterPan/kdyngywr0bestkj6ghh4.png', 
	'yellow', '6', '+2 to any WENDY', '-2 if any Cpt Hook is in play', 'person', 'person', 
	'kid', 'male', 'hero', 'mythic', 'peter pan'),
	
	('the real king', 'mufasa', 
	'https://res.cloudinary.com/dzh1qe1zp/image/upload/v1712099806/dToons/theLionKing/Mufasa/rqfcq6qkj6afdlqkuryx.png', 
	'white', '7', '-5 to each Villain', '', 'animal', 'lion', 
	'royalty', 'male', 'neutral', 'epic', 'the lion king')
	;








-- inserts into collection
INSERT INTO "dcollection" ("user_id", "card_id")
VALUES ('2', '1'), ('1', '2');


-- viewing card collections
SELECT * FROM "dcollection"
JOIN "dtoons" ON "dtoons"."id" = "dcollection"."card_id"
JOIN "dtoonuser" ON "dtoonuser"."id" = "dcollection"."user_id"
WHERE "dtoonuser"."id" = 2;
;

-- inserts a new deck
INSERT INTO "ddecks" ("user_id", "deckname")
VALUES ('1', 'animals'), ('1', 'berry Squad'), ('2', 'witches');

-- viewing decks
SELECT * FROM "ddecks"
JOIN "dtoonuser" ON "dtoonuser"."id" = "ddecks"."user_id"
;


-- insert cards into decks
INSERT INTO "deck_cards" ("deck_id", "card_id")
VALUES ('3', '2'), ('1', '1'), ('2', '1'), ('2', '2');
	

-- viewing cards in decks
SELECT * FROM "deck_cards"
JOIN "ddecks" ON "ddecks"."id" = "deck_cards"."deck_id"
JOIN "dtoons" ON "dtoons"."id" = "deck_cards"."card_id" 
;









