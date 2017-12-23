function Key(x, y, note, synth, color, type, key) {
    this.type = type;
    this.key = key;

    if(this.type == 'whole') {
      this.w = 100;
      this.h = 200;
    } else if(this.type == 'half') {
      this.w = 50;
      this.h = 100;
    }

    this.x = x;
    this.y = y;
    
    this.note = note;
    this.color = color;


    this.synth = synth;

    

    this.show = function() {
      if(this.type == 'whole') {
        fill(255);
        stroke(0);

      } else if (this.type == 'half') {
        fill(0);
        stroke(0);
      }

      if(this.highlight) {
        fill(this.color);
      }
      rect(this.x, this.y, this.w, this.h);
    }

    this.showText = function() {
      if(this.type == 'whole') {
        fill(0);
        stroke(0);
        textSize(75);
        this.textX = this.x + 23;
        this.textY = this.y + 120;
        text(this.note, this.textX, this.textY, this.textX + 60, this.textY + 60);
      } else if (this.type == 'half') {
        fill(255);
        stroke(0);
        textSize(30);
        this.textX = this.x + 8;
        this.textY = this.y + 60;
        text(this.note, this.textX, this.textY, this.textX + 80, this.textY + 50);
      }
    }

    this.showKey = function() {
      if(this.type == 'whole') {
        fill(0);
        stroke(0);
        textSize(20);
        this.keyX = this.x + 40;
        this.keyY = this.y + 10;
        text(this.key, this.keyX, this.keyY, this.keyX + 50, this.keyY + 20);
      } else if(this.type == 'half') {
        fill(255);
        stroke(0);
        textSize(20);
        this.keyX = this.x + 20;
        this.keyY = this.y + 10;
        text(this.key, this.keyX, this.keyY, this.keyX + 50, this.keyY + 20);
      }
    }
}
