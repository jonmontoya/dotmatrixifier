import { PROCESSING_STATES } from '../constants';

const processingState = (state = PROCESSING_STATES.INIT, action) => {
  switch (action.type) {
    case 'SET_STATE':
      return action.state;
    default:
      return state;
  }
};

export default processingState;
