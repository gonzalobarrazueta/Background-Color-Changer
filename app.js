
let background = document.querySelector('body');
let solid_btn = document.querySelector('.solid');
let gradient_btn = document.querySelector('.gradient');
let hex_btn = document.querySelector('.hex');

/* Cualquiera de los 2 es válido
solid_btn.addEventListener('click', setSolidColor); */
solid_btn.onclick = setSolidColor; 
gradient_btn.onclick = setGradientColor;
hex_btn.onclick = showHexCode;

// checks which btn was selected 
let solidBtnSelected = false;
let gradientBtnSelected = false;

function setSolidColor() {

  solidBtnSelected = true;
  gradientBtnSelected = false;
    
  let red = Math.ceil(Math.random()*255);
  let green = Math.ceil(Math.random()*255);
  let blue = Math.ceil(Math.random()*255); 
      
  background.style.background = 'rgb(' + red + ',' + green + ',' + blue + ')';
}

function setGradientColor() {
  
  gradientBtnSelected = true;
  solidBtnSelected = false;

  let red = Math.ceil(Math.random()*255);
  let green = Math.ceil(Math.random()*255);
  let blue = Math.ceil(Math.random()*255); 
  
  let red2 = Math.ceil(Math.random()*255);
  let green2 = Math.ceil(Math.random()*255);
  let blue2 = Math.ceil(Math.random()*255); 

  let angle = Math.ceil(Math.random()*360);

  background.style.background = 
  
  'linear-gradient(' + angle + 'deg,' +
  'rgb(' + red + ',' + green + ',' + blue + '),' +
  'rgb(' + red2 + ',' + green2 + ',' + blue2 + ')';
}

//checks which btn was selected (solid or gradient) and calls the respective function
function getRGBvalues() {

  // selects the inline background-color attribute from the html
  let backgroundColor = background.style.background;

  if (solidBtnSelected) {
    return getSolidRGBvalues(backgroundColor);
  }
  else {
    return getGradientRGBvalues(backgroundColor);
  }
}
 
//returns the array of the 3 RGB color values of the body html tag
function getSolidRGBvalues(bgColor){

  let start = bgColor.indexOf('(') + 1;
  let end = bgColor.lastIndexOf(')');

  bgColor = bgColor.slice(start,end);

  bgColor = bgColor.split(',');

  return bgColor;
} 

/*  returns an array of 2 arrays (each array has the 3 rgb values of its color  */
function getGradientRGBvalues(bgColor){

  let start = bgColor.indexOf('rgb');
  let end = bgColor.lastIndexOf(')');

  bgColor = bgColor.slice(start,end);

  let colorsArray = [];
  
  start = bgColor.lastIndexOf('rgb');
  colorsArray.unshift( bgColor.slice(start));
  colorsArray.unshift(bgColor.slice(0, start-2));

  for (let i = 0; i < 2; i++){
    colorsArray[i] = getSolidRGBvalues(colorsArray[i]);
  }

  return colorsArray;
}

//return an array of the RGB color values convert to base 16
function convertToHex(){
  
  let values = getRGBvalues();
  let remainders = [];
  
  let quotient;
  
  for (let i = 0; i < values.length; i++){
    
    quotient = Number(values[i]);

    while(quotient != 0){

      remainders.push(quotient%16);
      quotient = Math.floor(quotient / 16);   
    }
  }

  //converts the numbers to letters where necessary
  for (let i = 0; i < remainders.length; i++){

    if (remainders[i] >= 10){
      remainders[i] = checkHexLetterValues(remainders[i]);
    }
  }

  return remainders;
}

function checkHexLetterValues(value){

  switch (value){
    case 10:
      return 'A'; 
      break;
    case 11:
      return 'B';
      break;
    case 12:
      return 'C';
      break;
    case 13:
      return 'D';
      break;
    case 14:
      return 'E';
      break;
    case 15:
      return 'F';
      break;
  }
}

function orderHexCode(){

  let code = convertToHex();
  let temp;

  for (let index = 0; index <= 4; index +=2){

    temp = code[index];
    code[index] = code[index+1];
    code[index+1] = temp;
  }
  return code;
}

function showHexCode(){

  let para = document.querySelector('#hexCode');

  if(solidBtnSelected){
    let code = orderHexCode().join('');
    para.innerHTML = '#' + code;
  } else {

  }
}
