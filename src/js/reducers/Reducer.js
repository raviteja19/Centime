export  function Landing(state = {}, action) {
    switch (action.type) {
      
      case 'getData':
        return {...action.data};
  
        case 'setData':
        return {...action.data}
      default:
        return state;
    }
  }