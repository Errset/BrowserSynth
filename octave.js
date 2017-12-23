function Octave(octave, x, y) {
  this.octave = octave;
  this.x = x;
  this.y = y;

  this.shrinkTop = false;
  this.shrinkBottom = false;

  this.show = function() {
    textSize(75);

    fill(255);
    stroke(0);
    if (this.shrinkTop) {
      triangle(this.x, this.y + 5, this.x - 20, this.y + 20, this.x + 20, this.y + 20);
      triangle(this.x,this.y + 150,this.x - 25,this.y + 125,this.x + 25,this.y + 125);
    } else if(this.shrinkBottom){
      triangle(this.x,this.y,this.x - 25,this.y + 25,this.x + 25,this.y+25);
      triangle(this.x, this.y + 145, this.x - 20, this.y + 130, this.x + 20, this.y + 130);
    } else {
      //top triangle
      triangle(this.x,this.y,this.x - 25,this.y + 25,this.x + 25,this.y+25);
      //bottom triangle
      triangle(this.x,this.y + 150,this.x - 25,this.y + 125,this.x + 25,this.y + 125);
    }
    text("" + this.octave, this.x - 20, this.y + 30, this.x + 15, this.y + 75);
  }

}
