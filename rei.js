function setup() {
  createCanvas(windowWidth,windowHeight);

  textFont('Georgia');

  backgroundBtn = createSelect();
  backgroundBtn.position(100, 275);
  backgroundBtn.style('width', '150');
  backgroundBtn.option('Select Canvas Color');
  backgroundBtn.option('White');
  backgroundBtn.option('Blue');
  backgroundBtn.option('Black');

  brushBtn = createSelect();
  brushBtn.position(100, 305);
  brushBtn.style('width', '150');
  brushBtn.option('Select Brush Type');
  brushBtn.option('Plain');
  brushBtn.option('Circle');
  brushBtn.option('Flower');

  brushColorBtn = createSelect();
  brushColorBtn.position(100,335);
  brushColorBtn.style('width', '150');
  brushColorBtn.option('Select Brush Color');
  brushColorBtn.option('Blue');
  brushColorBtn.option('White');
  brushColorBtn.option('Black');

  resetBtn = createButton('Reset');
  resetBtn.style('width', '150');
  resetBtn.position(100, 365);
  resetBtn.mousePressed(reset);

  screenshotBtn = createButton('Download');
  screenshotBtn.style('width', '150');
  screenshotBtn.position(100, 395);
  screenshotBtn.mousePressed(screenshot);

  header();
  footer();

}

function draw() {
  selectedCanvas = select('canvas');
  selectedCanvas.elt.style.backgroundColor = backgroundBtn.value();
  if (mouseIsPressed === true) {
    if (brushBtn.value().search('Select') == -1 ) {
        brush = 'brush' + brushBtn.value();
        stroke(brushColorBtn.value());
        eval(brush).call();
    }
  }
}

function brushCircle() {
  variableEllipse(mouseX, mouseY, pmouseX, pmouseY);
  function variableEllipse(x, y, px, py) {
    let speed = abs(x - px) + abs(y - py);
    stroke(0, 0, 255);
    ellipse(x, y, speed, speed);
  }
}

let angle = 0;
function brushFlower() {
  angle += 255;
  let val = cos(radians(angle)) * 12.0;
  for (let a = 0; a < 360; a += 75) {
    let xoff = cos(radians(a)) * val;
    let yoff = sin(radians(a)) * val;
    fill(0, 0, 255);
    ellipse(mouseX + xoff, mouseY + yoff, val, val);
  }
  fill(0, 0, 255);
  ellipse(mouseX, mouseY, 2, 2);
}

function brushPlain() {
  line(mouseX, mouseY, pmouseX, pmouseY);
}

function footer() {
  copyright = createA("https://gniquyij.github.io/en/about", "© 2018-2020 by YUQING JI", "_blank");
  copyright.style('font-size', '17');
  copyright.position(100, 485);
}

function header() {
  textSize(50);
  text('rei', 100, 200);
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
