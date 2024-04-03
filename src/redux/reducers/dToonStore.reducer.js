const dToons = (state = [], action) => {
    switch (action.type) {
      case 'SET_DTOONS_STORE':
        return action.payload;
      default:
        return state;
    }
  };
  
  
export default dToons;