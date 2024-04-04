const userDecks = (state = [], action) => {
    switch (action.type) {
      case 'SET_USER_DECKS':
        return action.payload;
      default:
        return state;
    }
  };
  
  
export default userDecks;