const filename = (state = null, action) => {
  switch (action.type) {
    case 'SET_FILENAME':
      return action.filename;
    default:
      return state;
  }
};

export default filename;
