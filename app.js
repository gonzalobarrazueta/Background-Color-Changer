
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
      
  background.style.backgroundColor = 'rgb(' + red + ',' + green + ',' + blue + ')';
}

function setGradientColor() {

}
