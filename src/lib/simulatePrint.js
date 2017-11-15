import { STRIKE_SIZE } from './libconsts';

function drawStrike(ctx, radius, weight, blur) {
  let r = radius * 1;
  ctx.save();
  ctx.fillStyle=`rgba(0,0,0,${weight})`;
  if (blur) {
    r = r * .85;
  };
  ctx.beginPath();
  ctx.arc(r, r, r, 0, 2 * Math.PI);
  ctx.fill();
  ctx.restore();
}

function drawMatrixStrike(context, x, y, STRIKE_SIZE, strikeWeight) {
  const strikeRadius = STRIKE_SIZE / 2;
  const strikeCanvas = document.createElement('canvas');
  strikeCanvas.width = STRIKE_SIZE;
  strikeCanvas.height = STRIKE_SIZE;
  var strikeContext = strikeCanvas.getContext('2d');

  drawStrike(strikeContext, strikeRadius, strikeWeight);
  drawStrike(strikeContext, strikeRadius, strikeWeight, true);

  let newX = x + (STRIKE_SIZE * Math.random() * .2);
  let newY = y + (STRIKE_SIZE * Math.random() * .2);
  context.drawImage(strikeCanvas, newX, newY);
}

function getRibbonAdjust(num) {
  const values = [];
  let adj;
  let value;

  for(let i = 0; i < num; i++) {
    adj = Math.random() < .5 ? 1 : -1;
    value = .5 + (Math.random() * .5) * adj;
    value = value < .4 ? .4 : value;
    values.push(value);
  }
  return values;
}

function getPinValues(num) {
  const values = [];
  let adj;
  let value;

  for(let i = 0; i < num; i++) {
    adj = Math.random() < .5 ? 1 : -1;
    value = .5 + (Math.random() * .5) * adj;
    value = value < .4 ? .4 : value;
    values.push(value);
  }
  return values;
}

function getRibbonWear() {
  const values = [];
  for(let i = 0; i < 9; i++) {
    values.push(.4 + Math.random() * .6)
  }
  return values;
}

export default function simulatePrint(inputImg) {
  const {
    width,
    height,
    data: inputImgData
  } = inputImg;

  const canvas = document.createElement('canvas');

  canvas.width = width * STRIKE_SIZE;
  canvas.height = height * STRIKE_SIZE;

  const context = canvas.getContext('2d');

  context.save();
  context.fillStyle ='rgba(255,255,255,1)';
  context.fillRect(0, 0, width * STRIKE_SIZE, height * STRIKE_SIZE);
  context.restore();
  const imageLength = width * height;

  let i;
  let x;
  let y;

  let pin;
  let value;

  const pinValues = getPinValues(9);

  for(i = 0; i < inputImgData.length; i += 4) {
    y = parseInt(i / 4 / width, 10);
    x = i / 4 % width;
    pin = y % pinValues.length;
    value = pinValues[pin];

    if(!inputImgData[i]) {
      drawMatrixStrike(context, x * STRIKE_SIZE, y * STRIKE_SIZE, STRIKE_SIZE, value);
    }
  }

  return canvas;
}
