const cardDetails = (state = {}, action) => {
    switch (action.type) {
      case 'SET_CARD_DETAILS':
        return action.payload;
      default:
        return state;
    }
  };
  
  
export default cardDetails;