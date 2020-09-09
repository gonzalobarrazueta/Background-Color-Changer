
let background = document.querySelector('body');
let solid_btn = document.querySelector('.solid');
let gradient_btn = document.querySelector('.gradient');
let hex_btn = document.querySelector('.hex');

/* Cualquiera de los 2 es válido
solid_btn.addEventListener('click', setSolidColor); */
solid_btn.onclick = setSolidColor; 
gradient_btn.onclick = setGradientColor;
hex_btn.onclick = showHexCode;

function setSolidColor() {
    
  let red = Math.ceil(Math.random()*255);
  let green = Math.ceil(Math.random()*255);
  let blue = Math.ceil(Math.random()*255); 
      
  background.style.background = 'rgb(' + red + ',' + green + ',' + blue + ')';
}

function setGradientColor() {
  
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

//returns the array of the 3 RGB color values of the body html tag
function getRGBvalues() {

  let bgColor = document.querySelector('body').style.backgroundColor;

  let rgbStart = bgColor.indexOf('(') + 1;
  let rgbEnd = bgColor.indexOf(')');

  let colorValues = bgColor.slice(rgbStart, rgbEnd);

  let rgbColorValues = colorValues.split(',');

  return rgbColorValues;
}

//return an array of the RGB color values convert to base 16
function convertToHex(){
  
  let values = getRGBvalues();
  let remainders = [];
  
  let quotient;
  
  for (let i = 0; i< 3; i++){
    
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

  let code = orderHexCode().join('');
  let para = document.querySelector('#hexCode');
  para.innerHTML = '#' + code;
}
