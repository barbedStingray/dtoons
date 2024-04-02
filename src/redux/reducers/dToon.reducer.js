const dToons = (state = [], action) => {
    switch (action.type) {
      case 'SET_DTOONS':
        return action.payload;
      default:
        return state;
    }
  };
  
  
export default dToons;