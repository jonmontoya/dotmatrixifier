import {
  PRINT_WIDTH,
  PRINT_HEIGHT,
  PRINT_MARGIN,
  PDF_DPI
} from './libconsts';

export default function genPDF(canvas) {
  const documentDefinition = {
    pageSize: 'LETTER',
    pageMargins: PRINT_MARGIN * PDF_DPI,
    content: [
       {
         // you'll most often use dataURI images on the browser side
         // if no width/height/fit is provided, the original size will be used
         image: canvas.toDataURL(),
         fit: [
           (PRINT_WIDTH - (PRINT_MARGIN * 2)) * PDF_DPI,
           (PRINT_HEIGHT - (PRINT_MARGIN * 2)) * PDF_DPI
         ]
       },
     ],

  };

  return pdfMake.createPdf(documentDefinition);
}
