import readImageFile from './readImageFile';
import resizeImage from './resizeImage';
import dither from './dither';
import simulatePrint from './simulatePrint';
import genPDF from './genPDF';
import {
  setProcessingState,
  setPDFFile
} from '../actions';
import { PROCESSING_STATES } from '../constants';
const {
  PREPARING_IMAGE,
  SIMULATING_PRINT,
  GENERATING_PDF
} = PROCESSING_STATES;

export default async function dotmatrixify(file, dispatch) {
  dispatch(setProcessingState(PREPARING_IMAGE));
  const image = await readImageFile(file);
  const canvas = resizeImage(image);

  const context = canvas.getContext('2d');
  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  const ditheredImageData = dither(imageData, .5, 'floydsteinberg');

  dispatch(setProcessingState(SIMULATING_PRINT));
  const startTime = new Date();
  const outputCanvas = simulatePrint(ditheredImageData);
  const endTime = new Date();
  console.log(`Total time for Dot Matrix Print: ${endTime.getTime() - startTime.getTime()}`);

  dispatch(setProcessingState(GENERATING_PDF));
  const pdfFile = genPDF(outputCanvas);
  dispatch(setPDFFile(pdfFile));
}
