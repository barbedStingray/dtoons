import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

import useFetchUserDecks from '../../components/Scripts/useFetchUserDecks';
import ListGameDecks from '../../components/GameComponents/ListGameDecks';
import DragnDrop from '../../components/DragnDrop/DragnDrop';
import { useDrop } from 'react-dnd';



import './DeckSelect.css';

const DeckSelect = () => {

  const user = useSelector((store) => store.user);
  const [userDecks, userDecksStatus] = useFetchUserDecks(user.id);
  const [modalVisible, setModalVisible] = useState(true);

  // player deck
  const [playerOneDeckId, setPlayerOneDeckId] = useState(null);
  const [playerOneDeck, setPlayerOneDeck] = useState([]);

  // State variables for slots
  const [slot1, setSlot1] = useState(null);
  const [slot2, setSlot2] = useState(null);
  const [slot3, setSlot3] = useState(null);
  const [slot4, setSlot4] = useState(null);
  const [slot5, setSlot5] = useState(null);
  const [slot6, setSlot6] = useState(null);
  const [slot7, setSlot7] = useState(null);

  console.log('slot1', slot1);
  console.log('slot2', slot2);
  console.log('slot3', slot3);
  console.log('slot4', slot4);
  console.log('slot5', slot5);
  console.log('slot6', slot6);
  console.log('slot7', slot7);

  const [roundOneScore, setRoundOneScore] = useState(0);

  // function to score the round.
  function scoreRound() {
    console.log('scoring round', slot1.points, slot2.points, slot3.points, slot4.points, slot5.points, slot6.points, slot7.points);
    const totalScore = Number(slot1.points) + Number(slot2.points) + Number(slot3.points) + Number(slot4.points);
    setRoundOneScore(totalScore);
  }


  useEffect(() => {
    // if (playerOneDeckId) {
      fetchOriginalGamingCards(1);
    // }
  // }, [playerOneDeckId]);
  }, [playerOneDeckId]);


  async function fetchOriginalGamingCards(deckId) {
    console.log('fetching the gaming cards', deckId);

    const deckOne = await axios.get(`/api/dToons/deckOne/${deckId}`);
    console.log('deckOne', deckOne.data);
    setPlayerOneDeck(deckOne.data);
    // todo shuffle cards and deal X
  }


  // Drop functionality for each slot
  const [, dropSlot1] = useDrop({
    accept: 'dToon',
    drop: (item) => handleDrop(1, item.dToon),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });
  const [, dropSlot2] = useDrop({
    accept: 'dToon',
    drop: (item) => handleDrop(2, item.dToon),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });
  const [, dropSlot3] = useDrop({
    accept: 'dToon',
    drop: (item) => handleDrop(3, item.dToon),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });
  const [, dropSlot4] = useDrop({
    accept: 'dToon',
    drop: (item) => handleDrop(4, item.dToon),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });
  const [, dropSlot5] = useDrop({
    accept: 'dToon',
    drop: (item) => handleDrop(5, item.dToon),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });
  const [, dropSlot6] = useDrop({
    accept: 'dToon',
    drop: (item) => handleDrop(6, item.dToon),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });
  const [, dropSlot7] = useDrop({
    accept: 'dToon',
    drop: (item) => handleDrop(7, item.dToon),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  // Function to handle dropping a dToon into a slot
  const handleDrop = (slotNumber, dToon) => {
    console.log(`Added toon to slot ${slotNumber}`, dToon);
    switch (slotNumber) {
      case 1:
        setSlot1(dToon);
        break;
      case 2:
        setSlot2(dToon);
        break;
      case 3:
        setSlot3(dToon);
        break;
      case 4:
        setSlot4(dToon);
        break;
      case 5:
        setSlot5(dToon);
        break;
      case 6:
        setSlot6(dToon);
        break;
      case 7:
        setSlot7(dToon);
        break;
      default:
        break;
    }
    // Remove dropped card from playerOneDeck
    setPlayerOneDeck(prevDeck => prevDeck.filter(card => card.id !== dToon.id));
  };


  // Function to handle clicking on a slot to return the card to the player deck
  const returnToDeck = (slotNumber) => {
    switch (slotNumber) {
      case 1:
        if (slot1) {
          setPlayerOneDeck(prevDeck => [...prevDeck, slot1]);
          setSlot1(null);
        }
        break;
      case 2:
        if (slot2) {
          setPlayerOneDeck(prevDeck => [...prevDeck, slot2]);
          setSlot2(null);
        }
        break;
      case 3:
        if (slot3) {
          setPlayerOneDeck(prevDeck => [...prevDeck, slot3]);
          setSlot3(null);
        }
        break;
      case 4:
        if (slot4) {
          setPlayerOneDeck(prevDeck => [...prevDeck, slot4]);
          setSlot4(null);
        }
        break;
      case 5:
        if (slot5) {
          setPlayerOneDeck(prevDeck => [...prevDeck, slot5]);
          setSlot5(null);
        }
        break;
      case 6:
        if (slot6) {
          setPlayerOneDeck(prevDeck => [...prevDeck, slot6]);
          setSlot6(null);
        }
        break;
      case 7:
        if (slot7) {
          setPlayerOneDeck(prevDeck => [...prevDeck, slot7]);
          setSlot7(null);
        }
        break;
      default:
        break;
    }
  };





  return (
    <div className='theGameDisplay'>




      {/* MODAL FOR SELECTING YOUR DECK */}
      {/* {modalVisible && (
        <div className='deckSelect'>
          <div className='deckSelectContent'>
            <p>Select the Deck You'd like to Play with</p>
            <div>
              {userDecks.map((deck) => (
                <div className='deckClick' key={deck.id}>
                  <ListGameDecks deck={deck} setModalVisible={setModalVisible} setPlayerOneDeckId={setPlayerOneDeckId} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )} */}





      {/* THE SCOREBOARD (LEFT SIDE) */}

      <div className='scoreboard'>
        <button onClick={scoreRound}>SCORE ROUND</button>
        <p>Round One Score: {roundOneScore}</p>

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
          <div className='cardSlot' ref={dropSlot1} onClick={() => returnToDeck(1)}>
            {slot1 ? (
              <div>
                <img src={slot1.image} alt={slot1.cardtitle} style={{ height: '80px' }} />
                <p>{slot1.cardtitle}</p>
                <p>{slot1.points}</p>
              </div>
            ) : (
              'Empty Slot'
            )}
          </div>
          <div className='cardSlot' ref={dropSlot2} onClick={() => returnToDeck(2)}>
            {slot2 ? (
              <div>
                <img src={slot2.image} alt={slot2.cardtitle} style={{ height: '80px' }} />
                <p>{slot2.cardtitle}</p>
                <p>{slot2.points}</p>
              </div>
            ) : (
              'Empty Slot'
            )}
          </div>
          <div className='cardSlot' ref={dropSlot3} onClick={() => returnToDeck(3)}>
            {slot3 ? (
              <div>
                <img src={slot3.image} alt={slot3.cardtitle} style={{ height: '80px' }} />
                <p>{slot3.cardtitle}</p>
                <p>{slot3.points}</p>
              </div>
            ) : (
              'Empty Slot'
            )}
          </div>
          <div className='cardSlot' ref={dropSlot4} onClick={() => returnToDeck(4)}>
            {slot4 ? (
              <div>
                <img src={slot4.image} alt={slot4.cardtitle} style={{ height: '80px' }} />
                <p>{slot4.cardtitle}</p>
                <p>{slot4.points}</p>
              </div>
            ) : (
              'Empty Slot'
            )}
          </div>
          <div className='cardSlot' ref={dropSlot5} onClick={() => returnToDeck(5)}>
            {slot5 ? (
              <div>
                <img src={slot5.image} alt={slot5.cardtitle} style={{ height: '80px' }} />
                <p>{slot5.cardtitle}</p>
                <p>{slot5.points}</p>
              </div>
            ) : (
              'Empty Slot'
            )}
          </div>
          <div className='cardSlot' ref={dropSlot6} onClick={() => returnToDeck(6)}>
            {slot6 ? (
              <div>
                <img src={slot6.image} alt={slot6.cardtitle} style={{ height: '80px' }} />
                <p>{slot6.cardtitle}</p>
                <p>{slot6.points}</p>
              </div>
            ) : (
              'Empty Slot'
            )}
          </div>
          <div className='cardSlot' ref={dropSlot7} onClick={() => returnToDeck(7)}>
            {slot7 ? (
              <div>
                <img src={slot7.image} alt={slot7.cardtitle} style={{ height: '80px' }} />
                <p>{slot7.cardtitle}</p>
                <p>{slot7.points}</p>
              </div>
            ) : (
              'Empty Slot'
            )}
          </div>
        </div>


      </div>



      {/* GAME DECK SIDE (RIGHT SIDE) */}


      <div className='gameDeck'>

        <div className='gameCardDetails'>
          
        </div>

        <div className='playerDeck'>
          {playerOneDeck.map((card) => (
            <div key={card.id}>
              <DragnDrop dToon={card} />
            </div>
          ))}
        </div>

      </div>






    </div>
  )
}

export default DeckSelect
