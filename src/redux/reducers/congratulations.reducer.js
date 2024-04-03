// reducer shows newly bought dToons

const congratsNewdToons = (state = [], action) => {
    switch (action.type) {
      case 'CONGRATS_NEW_DTOONS':
        return action.payload;
      default:
        return state;
    }
  };
  
  
export default congratsNewdToons;