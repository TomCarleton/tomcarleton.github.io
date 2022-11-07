// Code adapted from https://codepen.io/tmrDevelops/pen/vOPZBv

const c = document.getElementById('canv');
const $ = c.getContext('2d');
const startVal = 50 * Math.random();

const col = function(x, y, r, g, b) {
  $.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
  $.fillRect(x, y, 1,1);
}
const R = function(x, y, t) {
  return( Math.floor(100 + 32*Math.cos( (x*x-y*y)/200 + t/2 )) );
}

const G = function(x, y, t) {
  return( Math.floor(192 + 64*Math.sin( (x*x*Math.cos(t/4)+y*y*Math.sin(t/3))/300 ) ) );
}

const B = function(x, y, t) {
  return( Math.floor(192 + 64*Math.sin( 5*Math.sin(t/9) + ((x-100)*(x-100)+(y-100)*(y-100))/1100) ));
}

let t = startVal;
let x;
let y;

const run = function() {
  for(x=0;x<=35;x++) {
    for(y=0;y<=35;y++) {
      col(x, y, R(x,y,t), G(x,y,t), B(x,y,t));
    }
  }
  t = t + 0.01;
  window.requestAnimationFrame(run);
}

run();