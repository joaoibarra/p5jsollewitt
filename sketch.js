var song;
let timer = 201;
var px = 0;
var py = 0;
var stripes = [];
var colors = [];
var regularRed;
var regularGreen;
var yellow;
var regularBlue;
var lightBlue;
var lightGreen;
var countStripes = 0;
var countColor = 0;
var position = 0;
var circleX = 0
var circleY = 0;
var radius = 18;
var scaleFactor = 50;
var speed = 120;
var fft;
var filter, filterFreq, filterRes;

function preload() {
  song = loadSound('assets/computadores.mp3');
}

function setup() {
  createCanvas(450, 450);
  regularRed = color(255, 82, 82);
  regularGreen = color(76, 175, 80);
  yellow = color(255, 193, 7);
  regularBlue = color(33, 150, 243);
  lightBlue = color(3, 169, 244);
  lightGreen = color(139, 195, 74);
  orange = color(255, 152, 0);
  colors = [regularBlue, orange, regularGreen, yellow, regularRed, lightBlue, lightGreen];
  song.play();
  fft = new p5.FFT();
}

function draw() {

  if (frameCount % 60 == 0 && timer > 0) {
    timer--;
  }

  if (frameCount % speed == 0 && timer > 0) {

    if (position == 0) {
      stripe = new Stripe(px, py, width, 25);
      stripe.plot();
      py = py + 25;

      if (py > height) {
        position++;
        py = 0;
      }

    } else if (position == 1) {
      stripe = new Stripe(px, py, 25, height);
      stripe.plot();
      px = px + 25;
      if (px > width) {
        position++;
        px = 0;
      }
    } else if (position == 2 || position == 3) {
      fill(colors[countColor]);
      ellipse(0, 450, scaleFactor * radius, scaleFactor * radius);
      radius--;
      if (radius == 2 || radius == -30) {
        position++;
      }
    } else if(position == 4){
      push();
      px = random(0, width);
      py = random(0, height);
      translate(px, py);
      fill(colors[countColor]);
      rotate(random(-2, 2));
      triangle(30, 75, 58, 20, 86, 75);
      pop();
    }


    countStripes++;
    countColor++
    if (countColor >= colors.length) {
      countColor = 0;
    }
  }
  if (timer == 194) {
    speed = 300;
  } else if (timer == 193) {
    speed = 20;
  } else if (timer == 187) {
    speed = 500;
  } else if (timer == 186) {
    speed = 120;
  } else if (timer == 157) {
    speed = 20;
  } else if (timer == 151) {
    speed = 120;
  } else if (timer == 124) {
    speed = 20;
  } else if (timer == 109) {
    speed = 500;
  } else if (timer == 108) {
    speed = 5;
  } else if (timer == 97) {
    speed = 500;
  } else if (timer == 96) {
    speed = 30;
  } else if (timer == 87) {
    speed = 1;    
    background(200);
  } else if (timer == 80) {
    speed = 60;
  } else if (timer == 56) {
    speed = 10;
  } else if (timer == 50) {
    speed = 1;
  } else if (timer == 49) {
    speed = 500;
  } else if (timer == 48) {
    speed = 1;
  }

  if (timer < 87) {
    position++;
    var spectrum = fft.analyze();
    noStroke();
    fill(colors[countColor]);
    /*for (var i = 0; i< spectrum.length; i++){
      var x = map(i, 0, spectrum.length, 0, width);
      var h = -height + map(spectrum[i], 0, 255, height/10, 0);
      rect(x, height/10, width/spectrum.length, h) ;
    } */
   
    beginShape();
    for (i = 0; i < spectrum.length; i++) {
      vertex(i, map(spectrum[i], 0, 255, height, 0));
    }
    endShape();
  }
  console.log(timer);
}

function mousePressed() {
  if (song.isPlaying()) {
    song.stop();
  } else {
    song.play();
  }
}

function Stripe(px, py, w, h) {
  this.x = px;
  this.y = py;
  this.w = w;
  this.h = h;

  this.plot = function() {
    noStroke();
    fill(colors[countColor]);
    push();
    rect(this.x, this.y, w, h);
    pop();
  };
}