var bottomKeys = [], topKeys = [];
var notes = ['C', 'C#', 'D', 'D#', 'E', ' ', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

var colors = [[148, 0, 211], [112, 0, 211], [75, 0, 130], [38, 0, 193], [0, 0, 255], [0, 255, 0], [128, 255, 0], [255, 255, 0], [255, 191, 0], [255, 127, 0], [255, 64, 0], [255, 0, 0]];

var topKeysBtn = ['W', '3', 'E', '4', 'R', ' ', 'T', '6', 'Y', '7', 'U', '8', 'I'];
var bottomKeysBtn = ['Z', 'S', 'X', 'D', 'C', ' ', 'V', 'G', 'B', 'H', 'N', 'J', 'M'];

var frequencies = [[16.35, 17.32, 18.35, ],[],[],[],[],[],[],[],[],[]]

var octaves = [];

var amp;

function setup() {
  createCanvas(1000, 500);
  colors.splice(5, 0, []);
  for (var i = 0; i < 13; i++) {
    if( i % 2 == 0) {
      topKeys.push(new Key((i * 50) + 150, 50, notes[i], play(), colors[i], 'whole', topKeysBtn[i]));
    } else {
      topKeys.push(new Key((i * 50) + 175, 50, notes[i], play(), colors[i], 'half', topKeysBtn[i]));
    }
  }
  colors.splice(5, 1);
  var colorsRev = colors.reverse();
  colorsRev.splice(5, 0, []);
  for(var i = 0; i < 13; i++) {
    if( i % 2 == 0) {

      bottomKeys.push(new Key((i * 50) + 150, 300, notes[i], play(), colorsRev[i], 'whole', bottomKeysBtn[i]));
    } else {
      bottomKeys.push(new Key((i * 50) + 175, 300, notes[i], play(), colorsRev[i], 'half', bottomKeysBtn[i]));
    }
  }

    octaves.push(new Octave(4, topKeys[topKeys.length - 1].x + 150, topKeys[topKeys.length - 1].y + 25));
    octaves.push(new Octave(3, bottomKeys[bottomKeys.length - 1].x + 150, bottomKeys[bottomKeys.length - 1].y + 25));
}


var t = 0;

var cur = {
  x:0,
  y:240
}

var next = {
  x:0,
  y:240
}

var music = [];


function draw() {
  background(0);
  var vol = 1;

  t = t + .1;

  next.x += 1;
  next.y = sound(10, t);


  for(var i = 0; i < bottomKeys.length; i+=2) {

      bottomKeys[i].show();
      topKeys[i].show();
      topKeys[i].showText();
      bottomKeys[i].showText();
      topKeys[i].showKey();
      bottomKeys[i].showKey();
  }

  for(var i = 0; i < bottomKeys.length; i++) {
    if(i == 5) {
      bottomKeys[i].highlight = 'null';
      topKeys[i].highlight = 'null';
    }
    else if( i % 2 == 1) {
      bottomKeys[i].show();
      topKeys[i].show();
      topKeys[i].showText();
      bottomKeys[i].showText();
      topKeys[i].showKey();
      bottomKeys[i].showKey();
    }
  }

  for(i = 0; i < octaves.length; i++) {
    octaves[i].show();
  }
}

function keyPressed() {
  for(i = 0; i < topKeys.length; i++) {
    if (topKeys[i].key == key) {
      topKeys[i].highlight = true;
      topKeys[i].synth.triggerAttack(topKeys[i].note + octaves[0].octave, .5, .5);
    }
  }

  for(i = 0; i < bottomKeys.length; i++) {
    if(bottomKeys[i].key == key) {
      bottomKeys[i].highlight = true;
      bottomKeys[i].synth.triggerAttack(bottomKeys[i].note + octaves[1].octave, .5, .5);
    }
  }
  
}


function keyReleased() {
  for(i = 0; i < topKeys.length; i++) {
    if (topKeys[i].key == key) {
      topKeys[i].highlight = false;
      topKeys[i].synth.triggerRelease();
    }
  }
  for(i = 0; i < bottomKeys.length; i++) {
    if (bottomKeys[i].key == key) {
      bottomKeys[i].highlight = false;
      bottomKeys[i].synth.triggerRelease();
    }
  } 
}

function sign(p1, p2, p3) {
  return (p1[0] - p3[0]) * (p2[1] - p3[1]) - (p2[0] - p3[0]) * (p1[1] - p3[1]);
}

function inTriangle(pt, v1, v2, v3) {
  b1 = sign(pt, v1, v2) < 0.0;
  b2 = sign(pt, v2, v3) < 0.0;
  b3 = sign(pt, v3, v1) < 0.0;
  return((b1 == b2) && (b2 == b3));
}

function mousePressed() {
  for(var i = 0; i < octaves.length; i++) {
    var v1 = [octaves[i].x, octaves[i].y];
    var v2 = [octaves[i].x - 25, octaves[i].y + 25];
    var v3 = [octaves[i].x + 25, octaves[i].y + 25];

    var v4 = [octaves[i].x, octaves[i].y + 150];
    var v5 = [octaves[i].x - 25, octaves[i].y + 125];
    var v6 = [octaves[i].x + 25, octaves[i].y + 125];

    if(inTriangle([mouseX, mouseY], v1, v2, v3)) {
      octaves[i].shrinkTop = true;
      if (octaves[i].octave < 10) { 
        octaves[i].octave++;
      }
    } else if(inTriangle([mouseX, mouseY], v4, v5, v6)) {
      octaves[i].shrinkBottom = true;
      if(octaves[i].octave > 0) {
        octaves[i].octave--;
      }
    }
  }
}

function mouseReleased() {
  for(var i = 0; i < octaves.length; i++) {
    octaves[i].shrinkTop = false;
    octaves[i].shrinkBottom = false;
  }
}

function sound(A, t) {
  return A*2*Math.PI*sin(t);
}



