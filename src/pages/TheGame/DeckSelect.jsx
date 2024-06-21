import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

import useFetchUserDecks from '../../components/Scripts/useFetchUserDecks';
import ListGameDecks from '../../components/GameComponents/ListGameDecks';
import DragnDrop from '../../components/DragnDrop/DragnDrop';
import GameDeckToon from '../../components/DtoonIcons/GameDeckToon';
import { useDrop } from 'react-dnd';
import './DeckSelect.css';



const DeckSelect = () => {

  const user = useSelector((store) => store.user);
  const [userDecks, userDecksStatus] = useFetchUserDecks(user.id);

  // player deck
  const [playerOneDeckId, setPlayerOneDeckId] = useState(null);

  // SLOT GROUPINGS
  // deck/hand slots
  const [playerOneDeck, setPlayerOneDeck] = useState([]); // this is your deck
  const [deckSlots, setDeckSlots] = useState([null, null, null, null, null, null]); // this is your hand
  const [gameSlots, setGameSlots] = useState([null, null, null, null, null, null, null]); // this is the cards in play

  const [deckSlot1, setDeckSlot1] = useState(null);
  const [deckSlot2, setDeckSlot2] = useState(null);
  const [deckSlot3, setDeckSlot3] = useState(null);
  const [deckSlot4, setDeckSlot4] = useState(null);
  const [deckSlot5, setDeckSlot5] = useState(null);
  const [deckSlot6, setDeckSlot6] = useState(null);

  // game slots player 1
  const [gameSlot1, setGameSlot1] = useState(null);
  const [gameSlot2, setGameSlot2] = useState(null);
  const [gameSlot3, setGameSlot3] = useState(null);
  const [gameSlot4, setGameSlot4] = useState(null);
  const [gameSlot5, setGameSlot5] = useState(null);
  const [gameSlot6, setGameSlot6] = useState(null);
  const [gameSlot7, setGameSlot7] = useState(null);

  console.log('deckSlot1', deckSlot1);
  console.log('deckSlot2', deckSlot2);
  console.log('deckSlot3', deckSlot3);
  console.log('deckSlot4', deckSlot4);
  console.log('deckSlot5', deckSlot5);
  console.log('deckSlot6', deckSlot6);

  console.log('gameSlot1', gameSlot1);
  console.log('gameSlot2', gameSlot2);
  console.log('gameSlot3', gameSlot3);
  console.log('gameSlot4', gameSlot4);
  console.log('gameSlot5', gameSlot5);
  console.log('gameSlot6', gameSlot6);
  console.log('gameSlot7', gameSlot7);


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




  // SLOT FUNCTIONALITY
  // Drop functionality for each slot
  const [, dropGameSlot1] = useDrop({
    accept: 'dToon',
    drop: (item) => handleGameDrop(1, item.dToon, item.fromDeckSlot),
    canDrop: () => !gameSlot1,
    collect: (monitor) => ({ // This is optional??
      isOver: !!monitor.isOver(),
    }),
  });
  const [, dropGameSlot2] = useDrop({
    accept: 'dToon',
    drop: (item) => handleGameDrop(2, item.dToon, item.fromDeckSlot),
    canDrop: () => !gameSlot2,
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });
  const [, dropGameSlot3] = useDrop({
    accept: 'dToon',
    drop: (item) => handleGameDrop(3, item.dToon, item.fromDeckSlot),
    canDrop: () => !gameSlot3,
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });
  const [, dropGameSlot4] = useDrop({
    accept: 'dToon',
    drop: (item) => handleGameDrop(4, item.dToon, item.fromDeckSlot),
    canDrop: () => !gameSlot4,
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });
  const [, dropGameSlot5] = useDrop({
    accept: 'dToon',
    drop: (item) => handleGameDrop(5, item.dToon, item.fromDeckSlot),
    canDrop: () => !gameSlot5,
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });
  const [, dropGameSlot6] = useDrop({
    accept: 'dToon',
    drop: (item) => handleGameDrop(6, item.dToon, item.fromDeckSlot),
    canDrop: () => !gameSlot6,
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });
  const [, dropGameSlot7] = useDrop({
    accept: 'dToon',
    drop: (item) => handleGameDrop(7, item.dToon, item.fromDeckSlot),
    canDrop: () => !gameSlot7,
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });
  // Function to handle dropping a dToon into a slot
  const handleGameDrop = (gameSlot, dToon, fromDeckSlot) => {
    console.log(`Added toon to slot ${gameSlot}`, dToon);
    console.log(`Added dToon.id`, dToon.id);
    console.log('fromDECKSLOT', fromDeckSlot);
    if (!fromDeckSlot) {
      console.log('cannot move to another board space, WHY NOT?');
      return;
    }
    switch (gameSlot) {
      case 1: setGameSlot1(dToon);
        break;
      case 2: setGameSlot2(dToon);
        break;
      case 3: setGameSlot3(dToon);
        break;
      case 4: setGameSlot4(dToon);
        break;
      case 5: setGameSlot5(dToon);
        break;
      case 6: setGameSlot6(dToon);
        break;
      case 7: setGameSlot7(dToon);
        break;
      default: break;
    }
    switch (fromDeckSlot) {
      case 1: setDeckSlot1(null);
        break;
      case 2: setDeckSlot2(null);
        break;
      case 3: setDeckSlot3(null);
        break;
      case 4: setDeckSlot4(null);
        break;
      case 5: setDeckSlot5(null);
        break;
      case 6: setDeckSlot6(null);
        break;
      default: break;
    }
  };
  // Function to handle dropping a dToon into a slot
  const handleDeckDrop = (deckSlot, dToon, fromGameSlot) => {
    console.log(`Added toon to slot ${deckSlot}`, dToon);
    switch (deckSlot) {
      case 1:
        setDeckSlot1(dToon);
        break;
      case 2:
        setDeckSlot2(dToon);
        break;
      case 3:
        setDeckSlot3(dToon);
        break;
      case 4:
        setDeckSlot4(dToon);
        break;
      case 5:
        setDeckSlot5(dToon);
        break;
      case 6:
        setDeckSlot6(dToon);
        break;
      default:
        break;
    }
    switch (fromGameSlot) {
      case 1: setGameSlot1(null);
        break;
      case 2: setGameSlot2(null);
        break;
      case 3: setGameSlot3(null);
        break;
      case 4: setGameSlot4(null);
        break;
      case 5: setGameSlot5(null);
        break;
      case 6: setGameSlot6(null);
        break;
      case 7: setGameSlot7(null);
        break;
      default: break;
    }
  };

  // DECK SLOTS
  const [, dropDeckSlot1] = useDrop({
    accept: 'dToon',
    drop: (item) => handleDeckDrop(1, item.dToon, item.fromGameSlot),
    canDrop: () => !deckSlot1,
    collect: (monitor) => ({ // This is optional??
      isOver: !!monitor.isOver(),
    }),
  });
  const [, dropDeckSlot2] = useDrop({
    accept: 'dToon',
    drop: (item) => handleDeckDrop(2, item.dToon, item.fromGameSlot),
    canDrop: () => !deckSlot2,
    collect: (monitor) => ({ // This is optional??
      isOver: !!monitor.isOver(),
    }),
  });
  const [, dropDeckSlot3] = useDrop({
    accept: 'dToon',
    drop: (item) => handleDeckDrop(3, item.dToon, item.fromGameSlot),
    canDrop: () => !deckSlot3,
    collect: (monitor) => ({ // This is optional??
      isOver: !!monitor.isOver(),
    }),
  });
  const [, dropDeckSlot4] = useDrop({
    accept: 'dToon',
    drop: (item) => handleDeckDrop(4, item.dToon, item.fromGameSlot),
    canDrop: () => !deckSlot4,
    collect: (monitor) => ({ // This is optional??
      isOver: !!monitor.isOver(),
    }),
  });
  const [, dropDeckSlot5] = useDrop({
    accept: 'dToon',
    drop: (item) => handleDeckDrop(5, item.dToon, item.fromGameSlot),
    canDrop: () => !deckSlot5,
    collect: (monitor) => ({ // This is optional??
      isOver: !!monitor.isOver(),
    }),
  });
  const [, dropDeckSlot6] = useDrop({
    accept: 'dToon',
    drop: (item) => handleDeckDrop(6, item.dToon, item.fromGameSlot),
    canDrop: () => !deckSlot6,
    collect: (monitor) => ({ // This is optional??
      isOver: !!monitor.isOver(),
    }),
  });


  function createDropGameSlot(gameSlot, index) {
    console.log('createDropGameSlot', gameSlot, index);
    const [, drop] = useDrop({
      accept: 'dToon',
      drop: (item) => handleGameDrop(gameSlot, item.dToon, item.fromDeckSlot),
      canDrop: () => !gameSlots[index],
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    });
    return drop;
  };

  const dropGameSlots = gameSlots.map((slot, index) => createDropGameSlot(index + 1, index));
  console.log('DROP GAME SLOTS', dropGameSlots);




  function shuffleAndDeal(deck) {
    console.log('DECK SHuffle', deck);
    // Shuffle the deck
    const shuffledDeck = deck.sort(() => Math.random() - 0.5);
    // Deal six cards
    // setDealtCards(shuffledDeck.slice(0, 6));

    // console.log('dealt card 2', dealtCards[2]);
    console.log('shuffledDeck[0]', shuffledDeck[0]);
    console.log('shuffledDeck[1]', shuffledDeck[1]);
    console.log('shuffledDeck[2]', shuffledDeck[2]);
    console.log('shuffledDeck[3]', shuffledDeck[3]);
    console.log('shuffledDeck[4]', shuffledDeck[4]);
    console.log('shuffledDeck[5]', shuffledDeck[5]);

    setDeckSlot1(shuffledDeck[0] || null);
    setDeckSlot2(shuffledDeck[1] || null);
    setDeckSlot3(shuffledDeck[2] || null);
    setDeckSlot4(shuffledDeck[3] || null);
    setDeckSlot5(shuffledDeck[4] || null);
    setDeckSlot6(shuffledDeck[5] || null);
  }

  console.log('cards in deck', playerOneDeck);



  return (
    <div className='theGameDisplay'>

      <button onClick={() => shuffleAndDeal(playerOneDeck)}>DEAL CARDS</button>


      {/* THE SCOREBOARD (LEFT SIDE) */}

      <div className='scoreboard'>


        {deckSlots.map((slot, index) => (
          <div key={index} className='cardSlot'>
            {slot ? (
              <div>
                <DragnDrop dToon={slot} deckSlot={index + 1} />
              </div>
            ) : (
              'EMPTY SLOT'
            )}
          </div>
        ))}


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
          <div className='cardSlot' ref={dropGameSlot1} >
            {gameSlot1 ? (
              <div>
                <DragnDrop dToon={gameSlot1} gameSlot={1} />
              </div>
            ) : (
              'Empty Slot'
            )}
          </div>
          <div className='cardSlot' ref={dropGameSlot2} >
            {gameSlot2 ? (
              <div>
                <DragnDrop dToon={gameSlot2} gameSlot={2} />
              </div>
            ) : (
              'Empty Slot'
            )}
          </div>
          <div className='cardSlot' ref={dropGameSlot3} >
            {gameSlot3 ? (
              <div>
                <DragnDrop dToon={gameSlot3} gameSlot={3} />
              </div>
            ) : (
              'Empty Slot'
            )}
          </div>
          <div className='cardSlot' ref={dropGameSlot4} >
            {gameSlot4 ? (
              <div>
                <DragnDrop dToon={gameSlot4} gameSlot={4} />
              </div>
            ) : (
              'Empty Slot'
            )}
          </div>
          <div className='cardSlot' ref={dropGameSlot5} >
            {gameSlot5 ? (
              <div>
                <DragnDrop dToon={gameSlot5} gameSlot={5} />
              </div>
            ) : (
              'Empty Slot'
            )}
          </div>
          <div className='cardSlot' ref={dropGameSlot6} >
            {gameSlot6 ? (
              <div>
                <DragnDrop dToon={gameSlot6} gameSlot={6} />
              </div>
            ) : (
              'Empty Slot'
            )}
          </div>
          <div className='cardSlot' ref={dropGameSlot7} >
            {gameSlot7 ? (
              <div>
                <DragnDrop dToon={gameSlot7} gameSlot={7} />
              </div>
            ) : (
              'Empty Slot'
            )}
          </div>
        </div>

      </div>



      {/* GAME DECK SIDE (RIGHT SIDE) */}


      <div className='gameDeck'>

        {/* <div className='gameCardDetails'>
        </div> */}

        <div className='playerDeck'>

          <div className='cardSlot' ref={dropDeckSlot1} >
            {deckSlot1 ? (
              <div>
                <DragnDrop dToon={deckSlot1} deckSlot={1} />
              </div>
            ) : (
              'Empty Slot'
            )}
          </div>
          <div className='cardSlot' ref={dropDeckSlot2} >
            {deckSlot2 ? (
              <div>
                <DragnDrop dToon={deckSlot2} deckSlot={2} />
              </div>
            ) : (
              'Empty Slot'
            )}
          </div>
          <div className='cardSlot' ref={dropDeckSlot3} >
            {deckSlot3 ? (
              <div>
                <DragnDrop dToon={deckSlot3} deckSlot={3} />
              </div>
            ) : (
              'Empty Slot'
            )}
          </div>
          <div className='cardSlot' ref={dropDeckSlot4} >
            {deckSlot4 ? (
              <div>
                <DragnDrop dToon={deckSlot4} deckSlot={4} />
              </div>
            ) : (
              'Empty Slot'
            )}
          </div>
          <div className='cardSlot' ref={dropDeckSlot5} >
            {deckSlot5 ? (
              <div>
                <DragnDrop dToon={deckSlot5} deckSlot={5} />
              </div>
            ) : (
              'Empty Slot'
            )}
          </div>
          <div className='cardSlot' ref={dropDeckSlot6} >
            {deckSlot6 ? (
              <div>
                <DragnDrop dToon={deckSlot6} deckSlot={6} />
              </div>
            ) : (
              'Empty Slot'
            )}
          </div>



        </div>

      </div>






    </div>
  )
}

export default DeckSelect
