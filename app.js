
let background = document.querySelector('body');
let solid_btn = document.querySelector('.solid');
let gradient_btn = document.querySelector('.gradient');

/* Cualquiera de los 2 es válido
solid_btn.addEventListener('click', setSolidColor); */
solid_btn.onclick = setSolidColor; 
gradient_btn.onclick = setGradientColor;

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
