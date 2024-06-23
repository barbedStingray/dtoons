import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

import useFetchUserDecks from '../../components/Scripts/useFetchUserDecks';
import ListGameDecks from '../../components/GameComponents/ListGameDecks';
import './DeckSelect.css';



const DeckSelect = () => {

  const user = useSelector((store) => store.user);
  const [userDecks, userDecksStatus] = useFetchUserDecks(user.id);

  // card details
  const [detailCard, setDetailCard] = useState({});

  // player deck
  const [playerOneDeckId, setPlayerOneDeckId] = useState(null);
  const [playerOneScore, setPlayerOneScore] = useState(0);
  const [scoringIndex, setScoringIndex] = useState(0);


  // SLOT GROUPINGS
  // deck/hand slots
  const [playerOneDeck, setPlayerOneDeck] = useState([]); // this is your deck
  const [handSlots, setHandSlots] = useState([null, null, null, null, null, null]); // this is your hand
  const [gameSlots, setGameSlots] = useState([null, null, null, null, null, null, null]); // this is the cards in play
  const [gameSlotPoints, setGameSlotPoints] = useState([0, 0, 0, 0, 0, 0, 0]);


  async function fetchOriginalGamingCards(deckId) {
    console.log('fetching the gaming cards', deckId);
    const deckOne = await axios.get(`/api/dToons/deckOne/${deckId}`);
    console.log('deckOne', deckOne.data);
    setPlayerOneDeck(deckOne.data);
    // return deckOne.data;
  }

  useEffect(() => {
    fetchOriginalGamingCards(1);
  }, [])



  function shuffleAndDeal(deck) {
    console.log('DECK SHuffle', deck);

    // Shuffle the deck
    const shuffledDeck = deck.sort(() => Math.random() - 0.5);

    // fill deckSlots
    console.log('shuffledDeck', shuffledDeck);
    const startHandSlots = shuffledDeck.slice(0, 6);
    console.log('startDeckSlots', startHandSlots);
    setHandSlots(startHandSlots);

    // remove first 6 cards from original deck
    console.log('shuffledDeck', shuffledDeck);
    const newPlayerOneDeck = shuffledDeck.slice(6);
    console.log('newPlayerOneDeck', newPlayerOneDeck);
    setPlayerOneDeck(newPlayerOneDeck);
  }



  function moveCard(fromSlots, setFromSlots, toSlots, setToSlots, dtoon, index) {
    console.log(`moving card at ${index}`, dtoon);

    // fromSlots REMOVE
    const updateFromSlots = [...fromSlots];
    updateFromSlots[index] = null;
    setFromSlots(updateFromSlots);

    // toSlots ADD 
    const updateToSlots = [...toSlots];
    const emptySlotIndex = updateToSlots.indexOf(null);
    if (emptySlotIndex !== -1) {
      updateToSlots[emptySlotIndex] = dtoon;
    }
    setToSlots(updateToSlots);
  }

  // every time gameSlotPoints Changes... Update the SCORE
  useEffect(() => {
    let oneScore = 0;
    for (let score of gameSlotPoints) {
      oneScore += score;
    }
    console.log('oneScore', oneScore);
    setPlayerOneScore(oneScore);
  }, [gameSlotPoints]);


  function scoreNextCard() {
    if (gameSlots[scoringIndex]) {

      const newGameSlotPoints = [...gameSlotPoints];
      newGameSlotPoints[scoringIndex] = gameSlots[scoringIndex].points;
      console.log('newGameSlotPoints', newGameSlotPoints);
      setGameSlotPoints(newGameSlotPoints);

      // ! at very end - move to next card
      setScoringIndex(scoringIndex + 1);
    }
    // other logic for points? 
    // todo check for target to indicate ability? 
    // todo check for conditions met
    // todo apply bonus
    // todo setPlayerOneScore again
  }


  function refillHand() {
    console.log('refilling your hand');

    // find number of empty slots
    const emptySlots = handSlots.filter(slot => slot === null).length;
    // console.log('empty slots', emptySlots);
    const newHandSlots = [...handSlots]; // duplicate the OG array
    // console.log('newHandSlots BEFORE', newHandSlots);
    const newPlayerOneDeck = [...playerOneDeck]; // duplicate the og deck
    // console.log('newPlayerOneDeck BEFORE', newPlayerOneDeck);

    // loop through and replace
    for (let i = 0; i < emptySlots; i++) {
      const nextCard = newPlayerOneDeck.shift();
      // console.log('newPlayerDECK', newPlayerOneDeck);
      console.log('nextCard', nextCard);
      const emptySlotIndex = newHandSlots.indexOf(null);
      console.log('emptySlotIndex', emptySlotIndex);
      // console.log('newHANDSLOTS', newHandSlots);
      newHandSlots[emptySlotIndex] = nextCard;
    }
    // console.log('newHandSlots AFTER', newHandSlots);
    console.log('newPlayerOneDeck AFTER', newPlayerOneDeck);
    setHandSlots(newHandSlots);
    setPlayerOneDeck(newPlayerOneDeck);
  }



  return (
    <div className='theGameDisplay'>



      {/* THE SCOREBOARD (LEFT SIDE) */}

      <div className='scoreboard'>
        <button onClick={() => shuffleAndDeal(playerOneDeck)}>DEAL CARDS</button>
        <button onClick={scoreNextCard}>SCORE NEXT CARD</button>
        <button onClick={refillHand}>REFILL HAND</button>

        <p>P1 SCORE: {playerOneScore}</p>

      </div>





      {/* THE GAME BOARD */}

      <div className='theGameBoard'>


        {/* OPPONENT CIRCLES */}
        <div className='opponentCircles'>
          <div className='cardSlot'></div>
          <div className='cardSlot'></div>
          <div className='cardSlot'></div>
          <div className='cardSlot'></div>
          <div className='cardSlot'></div>
          <div className='cardSlot'></div>
          <div className='cardSlot'></div>
        </div>



        <div className='middleSelectBar'>

        </div>


        {/* PLAYER CIRCLES */}

        <div className='playerCircles'>
          {gameSlots.map((dToon, index) => (
            <div key={index} className='cardSlot'>
              {dToon ? (
                <div
                  onMouseEnter={() => setDetailCard(dToon)}
                  onClick={() => moveCard(gameSlots, setGameSlots, handSlots, setHandSlots, dToon, index)}
                >
                  {/* <p>{slot.cardtitle}</p> */}
                  {/* <p>{dToon.count}</p> */}
                  <p>POINTS: {gameSlotPoints[index]}</p>
                  <img className='toonImageTest' src={dToon.image} alt='toon image here' />
                </div>
              ) : (
                <>
                  'EMPTY SLOT'
                  <p>POINTS: {gameSlotPoints[index]}</p>
                </>
              )}
            </div>
          ))}




        </div>

      </div>



      {/* GAME DECK SIDE (RIGHT SIDE) */}


      <div className='gameDeck'>

        <div className='gameCardDetails'>
          <p>{detailCard.desc0}</p>
        </div>

        <div className='playerDeck'>

          {handSlots.map((dToon, index) => (
            <div key={index} className='cardSlot'>
              {dToon ? (
                <div
                  onMouseEnter={() => setDetailCard(dToon)}
                  onClick={() => moveCard(handSlots, setHandSlots, gameSlots, setGameSlots, dToon, index)}
                >
                  <img className='toonImageTest' src={dToon.image} alt='toon image here' />
                </div>
              ) : (
                'EMPTY SLOT'
              )}
            </div>
          ))}


        </div>

      </div>


    </div>
  )
}

export default DeckSelect
