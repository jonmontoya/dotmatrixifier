import { combineReducers } from 'redux';
import processingState from './processingState';
import pdfFile from './pdfFile';
import filename from './filename';
import previewData from './previewData';

const reducer = combineReducers({
  processingState,
  pdfFile,
  filename,
  previewData
});

export default reducer;
