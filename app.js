
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

//returns the array of the 3 RGB color values of the body html tag
function getSolidRGBvalues(bgColor){

  let start = bgColor.indexOf('(') + 1;
  let end = bgColor.lastIndexOf(')');

  bgColor = bgColor.slice(start,end);

  bgColor = bgColor.split(',');

  return bgColor;
} 

/*  returns an (multidimensional) array of 2 arrays (each array has the 3 rgb values of its color  */
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

//conniverte los valores a hexadecimal para los gradientes
function convertGradients(values){

  let remainders = [];
  let quotient;

  for (let i = 0; i < values.length; i++){
    
    for (let j = 0; j < values[i].length; j++){
      
      quotient = Number(values[i][j]);

      while(quotient !== 0){

        remainders.push(quotient%16);
        quotient = Math.floor(quotient/16);

        // cuando un valor rgb es de 1 cifra, se le agrega un 0 al final
        if (values[i][j] < 16) { 
          remainders.push(0);
        }
      }
    }
  }

  remainders = convertToLetterValues(remainders);

  //devuelve un array de 6 números (3 valores por cada color) en base 16
  return remainders;
}

function convertSolidColors(values){

  let remainders = [];
  let quotient;
  
  for (let i = 0; i < values.length; i++){
    
    quotient = Number(values[i]);

    while(quotient !== 0){

      remainders.push(quotient%16);
      quotient = Math.floor(quotient / 16);   

      // cuando un valor rgb es de 1 cifra, se le agrega un 0 al final
      if (values[i] < 16) { 
        remainders.push(0);
      }
    }
  }

  remainders = convertToLetterValues(remainders);

  return remainders;
}

//return an array of the RGB color values convert to base 16
function convertToHex(){
  
  let values = getRGBvalues();

  if  (solidBtnSelected)  {
    return convertSolidColors(values);
  } 
  else  {
    return convertGradients(values);
  }
}

//checks the number values and converts to letters if necessary
function convertToLetterValues(values){

  for (let i = 0; i < values.length; i++){

    if (values[i] >= 10){
      values[i] = checkHexLetterValues(values[i]);
    }
  }
  return values;
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

  for (let index = 0; index <= code.length - 2; index +=2){

    temp = code[index];
    code[index] = code[index+1];
    code[index+1] = temp;
  }
  return code;
}

function showHexCode(){

  let para = document.querySelector('#hexCode');
  let code = orderHexCode();
  
  if(solidBtnSelected){
  
    code = code.join('');
    para.innerHTML = '#' + code;
  } else {

    //code.splice(0,6) returns an array of the deleted elements (the first 6 values) and modifies the original array
    let firstColor = code.splice(0,6).join('');
    let secondColor = code.join(''); //array modified
    
    para.textContent = 'FROM #' + firstColor + '\tTO\t#'+ secondColor;
  }
}
