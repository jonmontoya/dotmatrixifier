import readImageFile from '../lib/readImageFile';
import resizeImage from '../lib/resizeImage';
import dither from '../lib/dither';
import simulatePrintLib from '../lib/simulatePrint';
import genPDF from '../lib/genPDF';

import { PROCESSING_STATES } from '../constants';
const {
  INIT,
  INVALID_FILE,
  PREPARING_IMAGE,
  SIMULATING_PRINT,
  GENERATING_PDF,
  DONE
} = PROCESSING_STATES;

export const setPDFFile = (pdfFile) => ({
  type: 'SET_PDF_FILE',
  pdfFile
});

export const setProcessingState = (state) => ({
  type: 'SET_STATE',
  state
});

export const setFilename = (filename) => ({
  type: 'SET_FILENAME',
  filename
});

export const setPreviewData = (previewData) => ({
  type: 'SET_PREVIEW_DATA',
  previewData
});

export const init = () => {
  return (dispatch) => {
    dispatch(setPDFFile(null));
    dispatch(setProcessingState(INIT));
  };
};

export const invalidFile = () => {
  return (dispatch) => {
    setTimeout(() => dispatch(init()), 2000);
    dispatch(setProcessingState(INVALID_FILE));
  };
};

const wait = async (time) => {
  return new Promise(resolve => {
    setTimeout(() => resolve(), time);
  });
};

export const processImage = (file) => {
  return async (dispatch) => {
    dispatch(setProcessingState(PREPARING_IMAGE));
    dispatch(setFilename(`${/(.+)\..+$/.exec(file.name)[1]}.pdf`));
    const image = await readImageFile(file);
    const canvas = resizeImage(image);
    const context = canvas.getContext('2d');
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    dispatch(setPreviewData(imageData));
    await wait(2000);
    const ditheredImageData = dither(imageData, .5, 'floydsteinberg');
    dispatch(setPreviewData(ditheredImageData));

    dispatch(setProcessingState(SIMULATING_PRINT));
    await wait(100);
    const simulatePrintCanvas = simulatePrintLib(ditheredImageData);

    dispatch(setProcessingState(GENERATING_PDF));
    await wait(100);
    const pdfFile = genPDF(simulatePrintCanvas);
    dispatch(setPDFFile(pdfFile));
    dispatch(setProcessingState(DONE));
  };
};
