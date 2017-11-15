import {
  PRINT_WIDTH,
  PRINT_HEIGHT,
  PRINT_MARGIN,
  MATRIX_DPI
} from './libconsts';

export default function resizeImage(image) {
  const imageAspectRatio = image.width / image.height;
  const orientation = imageAspectRatio < 1 ? 'portrait' : 'landscape';
  const canvas = document.createElement('canvas');

  const context = canvas.getContext('2d');

  canvas.width = parseInt(MATRIX_DPI * (PRINT_WIDTH - (PRINT_MARGIN * 2)), 10);
  canvas.height = parseInt(MATRIX_DPI * (PRINT_HEIGHT - (PRINT_MARGIN * 2)), 10);

  if (orientation === 'portrait') {
    const scale = canvas.width / image.width;
    const centerAdjust = parseInt((canvas.height / scale - image.height) / 2, 10);
    console.log(centerAdjust);
    context.scale(scale, scale);
    context.drawImage(image, 0, centerAdjust);
    return canvas;
  }

  const scale = canvas.width / image.height;

  context.scale(scale, scale);

  context.translate(image.height / 2, image.width / 2);
  context.rotate(90 * Math.PI / 180);
  const centerAdjust = parseInt((canvas.height / scale - image.width) / 2, 10);
  context.drawImage(image, (-image.width / 2) + centerAdjust, -image.height / 2);

  return canvas;
}
