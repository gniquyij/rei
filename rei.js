function setup() {
  createCanvas(windowWidth,windowHeight);

  logo = loadImage('logo_v2.png');

  textFont('Georgia');

  canvasColorBtn = createSelect().id('canvasColorBtn');
  canvasColorBtn.position(windowWidth/10, windowHeight/3);
  canvasColorBtn.style('width', '150');
  canvasColorBtn.option('Select Canvas Color');
  canvasColorBtn.option('White');
  canvasColorBtn.option('Blue');

  brushTypeBtn = createSelect().id('brushTypeBtn');
  brushTypeBtn.position(windowWidth/10, windowHeight/3 + 30);
  brushTypeBtn.style('width', '150');
  brushTypeBtn.option('Select Brush Type');
  brushTypeBtn.option('Circle');
  brushTypeBtn.option('Cross');
  brushTypeBtn.option('Line');
  brushTypeBtn.option('Square');
  brushTypeBtn.option('Triangle');

  brushColorBtn = createSelect().id('brushColorBtn');
  brushColorBtn.position(windowWidth/10,windowHeight/3 + 60);
  brushColorBtn.style('width', '150');
  brushColorBtn.option('Select Brush Color');
  brushColorBtn.option('Blue');
  brushColorBtn.option('White');

  resetBtn = createButton('Reset');
  resetBtn.style('width', '150');
  resetBtn.position(windowWidth/10, windowHeight/3 + 90);
  resetBtn.mousePressed(reset);

  screenshotBtn = createButton('Download');
  screenshotBtn.style('width', '150');
  screenshotBtn.position(windowWidth/10, windowHeight/3 + 120);
  screenshotBtn.mousePressed(screenshot);
  
}


function draw() {
  header();
  canvas = select('canvas');
  canvas.elt.style.backgroundColor = canvasColorBtn.value();
  selectBtnSelected('canvasColorBtn');
  selectBtnSelected('brushTypeBtn');
  selectBtnSelected('brushColorBtn');
  if (mouseIsPressed) {
    if (brushTypeBtn.value().search('Select') == -1)  {
      brush = 'brush' + brushTypeBtn.value();
      stroke(brushColorBtn.value());
      eval(brush).call();
    }
  }
}


function selectBtnSelected(id) {
  selectBtn = document.getElementById(id);
  selectBtn.addEventListener('change', () => {
    window.dispatchEvent(new Event('mouseup'));
  });
}


function brushCircle() {
  brushShape('circle');
}


function brushCross() {
  brushShape('cross');
}


function brushLine() {
  line(mouseX, mouseY, pmouseX, pmouseY);
}


function brushSquare() {
  brushShape('square');
}


function brushShape(shape, x = mouseX, y = mouseY, px = pmouseX, py = pmouseY) {
  speed = abs(x - px) + abs(y - py);
  if (shape == 'circle') {
    ellipse(x, y, speed);
  }
  if (shape == 'cross') {
    line(mouseX - speed, mouseY, mouseX + speed, mouseY);
    line(mouseX, mouseY - speed, mouseX, mouseY + speed);
  }
  if (shape == 'square') {
    square(mouseX, mouseY, speed);
  }
  if (shape == 'triangle') {
    triangle(mouseX - speed, mouseY + speed, mouseX, mouseY, mouseX + speed, mouseY + speed);
  }
}


function brushTriangle() {
  brushShape('triangle');
}


function header() {
  image(logo, windowWidth/10, windowHeight/8, logo.width/2, logo.height/2);
}


function reset() {
  clear();
  setup();
}


function screenshot() {
  t = time();
  saveCanvas('rei-' + t, 'png');
}


function time() {
  return year() + '-' + month() + '-' + day();
}
