const pdfFile = (state = null, action) => {
  switch (action.type) {
    case 'SET_PDF_FILE':
      return action.pdfFile;
    default:
      return state;
  }
};

export default pdfFile;
