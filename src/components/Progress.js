import React from 'react';
import PreviewImage from './PreviewImage';
import classnames from 'classnames';
import { PROCESSING_STATES } from '../constants';
const {
  PREPARING_IMAGE,
  SIMULATING_PRINT,
  GENERATING_PDF,
  DONE
} = PROCESSING_STATES;


const Progress = ({ previewData, processingState, pdfFile, filename }) => {
  const clickHandler =() => pdfFile ? pdfFile.download(filename) : null;
  const isDone = processingState === DONE;
  const processClasses = classnames('jmt_dotmatrixifier_process', { done: isDone })

  let title;
  let subtitle;

  if (isDone) {
    title = `Click to Download`;
    subtitle = `(${filename})`;
  } else {
    title = processingState.replace('_', ' ');

    switch (processingState) {
      case PREPARING_IMAGE:
        subtitle = 'This will take a while...';
        break;
      case SIMULATING_PRINT:
        subtitle = 'No, really, you may want to find something else to do...';
        break;
      case GENERATING_PDF:
        subtitle = 'I Hope you have a fast computer...';
        break;
      default:
    }
  }

  return (
    <div
      className={processClasses}
      onClick={clickHandler}
    >
      <PreviewImage previewData={previewData} />
      <div className="jmt_dotmatrixifier_process_title">{title}</div>
      <div className="jmt_dotmatrixifier_process_sub_title">{subtitle}</div>
    </div>
  );
}

export default Progress;
