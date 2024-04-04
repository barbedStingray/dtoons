const deckCards = (state = [], action) => {
    switch (action.type) {
      case 'SET_CARDS_FOR_DECK':
        return action.payload;
      default:
        return state;
    }
  };
  
  
export default deckCards;