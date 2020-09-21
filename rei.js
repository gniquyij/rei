function setup() {
    createCanvas(windowWidth,windowHeight);

    logo = loadImage('logo_v2.png');

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

    brushEffectBtn = createSelect().id('brushEffectBtn');
    brushEffectBtn.position(windowWidth/10, windowHeight/3 + 60);
    brushEffectBtn.style('width', '150');
    brushEffectBtn.option('Select Brush Effect');
    brushEffectBtn.option('Dash');
    brushEffectBtn.option('Speed');

    brushColorBtn = createSelect().id('brushColorBtn');
    brushColorBtn.position(windowWidth/10,windowHeight/3 + 90);
    brushColorBtn.style('width', '150');
    brushColorBtn.option('Select Brush Color');
    brushColorBtn.option('Blue');
    brushColorBtn.option('White');

    resetBtn = createButton('Reset');
    resetBtn.style('width', '150');
    resetBtn.position(windowWidth/10, windowHeight/3 + 120);
    resetBtn.mousePressed(reset);

    screenshotBtn = createButton('Download');
    screenshotBtn.style('width', '150');
    screenshotBtn.position(windowWidth/10, windowHeight/3 + 150);
    screenshotBtn.mousePressed(screenshot);
}


function draw() {
    header();
    canvas = select('canvas');
    canvas.elt.style.backgroundColor = canvasColorBtn.value();

    selectBtnSelected('canvasColorBtn');
    selectBtnSelected('brushTypeBtn');
    selectBtnSelected('brushEffectBtn');
    selectBtnSelected('brushColorBtn');

    if (mouseIsPressed) {
        if (brushTypeBtn.value().search('Select') == -1 && brushEffectBtn.value().search('Select') == -1)  {
            stroke(brushColorBtn.value());
            let b = new brush(brushTypeBtn.value(), brushEffectBtn.value());
            b.effect();
        }
    }
}


class brush {
    constructor(type, filter) {
        this.type = type;
        this.filter = filter;
    }

    effect() {
        if (this.filter == 'Dash') {
            drawingContext.setLineDash([10, 10]);
            this.plain();
        }

        if (this.filter == 'Speed') {
            let speed = abs(mouseX - pmouseX) + abs(mouseY - pmouseY);
            this.plain(mouseX, mouseY, pmouseX, pmouseY, speed);
        }
    }

    plain(x=mouseX, y=mouseY, px=pmouseX, py=pmouseY, speed=100) {
        if (this.type == 'Circle') {
            ellipse(x, y, speed);
        }

        if (this.type == 'Cross') {
            line(mouseX - speed, mouseY, mouseX + speed, mouseY);
            line(mouseX, mouseY - speed, mouseX, mouseY + speed);
        }

        if (this.type == 'Line') {
            line(mouseX, mouseY, pmouseX, pmouseY);
        }

        if (this.type == 'Square') {
            square(mouseX, mouseY, speed);
        }

        if (this.type == 'Triangle') {
            triangle(mouseX - speed, mouseY + speed, mouseX, mouseY, mouseX + speed, mouseY + speed);
        }
    }
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


function selectBtnSelected(id) {
    selectBtn = document.getElementById(id);
    selectBtn.addEventListener('change', () => {
        window.dispatchEvent(new Event('mouseup'));
    });
}


function time() {
    return year() + '-' + month() + '-' + day();
}
