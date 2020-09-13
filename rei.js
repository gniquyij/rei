function setup() {
  createCanvas(windowWidth,windowHeight);

  logo = loadImage('logo_v2.png');

  textFont('Georgia');

  canvasColor = createSelect();
  canvasColor.position(100, 275);
  canvasColor.style('width', '150');
  canvasColor.option('Select Canvas Color');
  canvasColor.option('Blue');
  canvasColor.option('White');

  brushBtn = createSelect();
  brushBtn.position(100, 305);
  brushBtn.style('width', '150');
  brushBtn.option('Select Brush Type');
  brushBtn.option('Circle');
  brushBtn.option('Cross');
  brushBtn.option('Line');
  brushBtn.option('Square');
  brushBtn.option('Triangle');

  brushColorBtn = createSelect();
  brushColorBtn.position(100,335);
  brushColorBtn.style('width', '150');
  brushColorBtn.option('Select Brush Color');
  brushColorBtn.option('Blue');
  brushColorBtn.option('White');

  resetBtn = createButton('Reset');
  resetBtn.style('width', '150');
  resetBtn.position(100, 365);
  resetBtn.mousePressed(reset);

  screenshotBtn = createButton('Download');
  screenshotBtn.style('width', '150');
  screenshotBtn.position(100, 395);
  screenshotBtn.mousePressed(screenshot);

  footer();
}

function draw() {
  header();
  canvas = select('canvas');
  canvas.elt.style.backgroundColor = canvasColor.value();
  if (mouseIsPressed == true) {
    if (brushBtn.value().search('Select') == -1 )  {
      brush = 'brush' + brushBtn.value();
      stroke(brushColorBtn.value());
      eval(brush).call();
    }
  }
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

function footer() {
  copyright = createA("https://gniquyij.github.io/en/about", "© 2018-2020 by YUQING JI", "_blank");
  copyright.style('font-size', '17');
  copyright.position(100, 485);
}

function header() {
  image(logo, 100, 120, logo.width/2, logo.height/2);
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
