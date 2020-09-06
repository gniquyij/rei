function setup() {
  createCanvas(windowWidth,windowHeight);

  textFont('Georgia');
  textSize(15);

  benchmark = text('Canvas Color:', '100', '300');
  backgroundBtn = createSelect();
  backgroundBtn.position(200, 283);
  backgroundBtn.style('font-size', '14');
  backgroundBtn.option('White');
  backgroundBtn.option('Blue');
  backgroundBtn.option('Black');

  text('Brush Type:', '100', '325');
  brushBtn = createSelect();
  brushBtn.position(200,308);
  brushBtn.style('font-size', '14');
  brushBtn.option('Plain');
  brushBtn.option('Circle');
  brushBtn.option('Flower');

  text('Brush Color:', '100', '350');
  brushColorBtn = createSelect();
  brushColorBtn.position(200,333);
  brushColorBtn.style('font-size', '14');
  brushColorBtn.option('Blue');
  brushColorBtn.option('White');
  brushColorBtn.option('Black');

  resetBtn = createButton('Reset');
  resetBtn.style('font-size', '14');
  resetBtn.position(98, 363);
  resetBtn.mousePressed(reset);

  screenshotBtn = createButton('Download');
  screenshotBtn.style('font-size', '14');
  screenshotBtn.position(98, 397);
  screenshotBtn.mousePressed(screenshot);

  header();
  footer();

}

function draw() {
  selectedCanvas = select('canvas');
  selectedCanvas.elt.style.backgroundColor = backgroundBtn.value();
  if (mouseIsPressed === true) {
    brush = 'brush' + brushBtn.value();
    stroke(brushColorBtn.value());
    eval(brush).call();
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
  textSize(18);
  text('© 2018-2020 by ', '100', '520');
  home = createA("https://gniquyij.github.io/en/about", "YUQING JI", "_blank");
  home.style('font-size', '17');
  home.position(240, 503);
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
