import React from 'react';
import './Main.scss';
import Dropzone from 'react-dropzone';
import dotmatrixify from '../lib/dotmatrixify';
import { connect } from 'react-redux'
import {
  invalidFile,
  processImage
} from '../actions'
import Progress from '../components/Progress';
import { PROCESSING_STATES } from '../constants';

const {
  INIT,
  INVALID_FILE,
  PREPARING_IMAGE,
  SIMULATING_PRINT,
  GENERATING_PDF,
  DONE
} = PROCESSING_STATES;

const Main = ({
  pdfFile,
  processingState,
  dispatch,
  filename,
  previewData
}) => {
  const handleOnDrop = (files) => {
    const [ file ] = files;

    if (file) return dispatch(processImage(file));

    dispatch(invalidFile());
  }

  let display;

  switch(processingState) {
    case INIT:
      display = (
        <Dropzone
          onDrop={handleOnDrop}
          multiple={false}
          accept="image/jpeg, image/png, image/gif"
          className="jmt_dotmatrixifier_drop_zone"
        >
          <div>
            <p>Drag and Drop Image</p>
            <p>or</p>
            <p>Click to Select</p>
          </div>
        </Dropzone>
      );
      break;
    case INVALID_FILE:
      display = (
        <div
          className="jmt_dotmatrixifier_drop_zone invalid"
        >
          <div>
            <p>Invalid File Type</p>
            <p>try a</p>
            <p>JPEG, PNG, or GIF</p>
          </div>
        </div>
      );
      break;
    case PREPARING_IMAGE:
    case SIMULATING_PRINT:
    case GENERATING_PDF:
    case DONE:
      display = (
        <Progress
          processingState={processingState}
          previewData={previewData}
          pdfFile={pdfFile}
          filename={filename}
        />
      );
      break;
    default:
  }

  return (
    <div className="jmt_dotmatrixifier_main_wrapper">
      <h1 className="jmt_dotmatrixifier_main_title">dotmatrixifier</h1>
      { display }
    </div>
  );
};

const mapStateToProps = ({
  processingState,
  pdfFile,
  filename,
  previewData
}) => ({
  processingState,
  pdfFile,
  filename,
  previewData
});

export default connect(mapStateToProps)(Main);
