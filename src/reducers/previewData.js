const previewData = (state = null, action) => {
  switch (action.type) {
    case 'SET_PREVIEW_DATA':
      return action.previewData;
    default:
      return state;
  }
};

export default previewData;
