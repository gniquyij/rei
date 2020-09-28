function setup() {
    createCanvas(windowWidth,windowHeight);
    
    document.documentElement.style.overflow='hidden';

    logo = loadImage('logo_v4.png');

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
    brushEffectBtn.option('Plain');
    brushEffectBtn.option('Speed');

    brushColorBtn = createSelect().id('brushColorBtn');
    brushColorBtn.position(windowWidth/10, windowHeight/3 + 90);
    brushColorBtn.style('width', '150');
    brushColorBtn.option('Select Brush Color');
    brushColorBtn.option('Blue');
    brushColorBtn.option('White');

    filterBtn = createSelect().id('filterBtn');
    filterBtn.position(windowWidth/10, windowHeight/3 + 120);
    filterBtn.style('width', '150');
    filterBtn.option('Select Filter');
    filterBtn.option('Blur');
    filterBtn.option('Dilate');
    filterBtn.option('Erode');
    filterBtn.option('Grey');
    filterBtn.option('Invert');
    filterBtn.option('Opaque');
    filterBtn.option('Posterize');
    filterBtn.option('Threshold');

    resetBtn = createButton('Reset');
    resetBtn.style('width', '150');
    resetBtn.position(windowWidth/10, windowHeight/3 + 150);
    resetBtn.mousePressed(reset);

    screenshotBtn = createButton('Download');
    screenshotBtn.style('width', '150');
    screenshotBtn.position(windowWidth/10, windowHeight/3 + 180);
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
    selectBtnSelected('filterBtn');

    if (mouseIsPressed) {
        if (brushTypeBtn.value().search('Select') == -1 && brushEffectBtn.value().search('Select') == -1 && filterBtn.value().search('Select') == -1)  {
            stroke(brushColorBtn.value());
            let b = new reiBrush(brushTypeBtn.value(), brushEffectBtn.value());
            b.add_effect();
            let f = new reiFilter(filterBtn.value());
            f.add_filter(filterBtn.value());
        }
    }
}


class reiBrush {
    constructor(type, effect) {
        this.type = type;
        this.effect = effect;
    }

    add_effect() {
        if (this.effect == 'Dash') {
            drawingContext.setLineDash([10, 10]);
            this.plain();
        }

        if (this.effect == 'Plain') {
            this.plain();
        }

        if (this.effect == 'Speed') {
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


class reiFilter {
    constructor(name) {
        this.name = name;
    }

    add_filter() {
        if (this.name == 'Blur') {
            filter(BLUR);
        }
        if (this.name == 'Dilate') {
            filter(DILATE);
        }
        if (this.name == 'Erode') {
            filter(ERODE);
        }
        if (this.name == 'Grey') {
            filter(GRAY);
        }
        if (this.name == 'Invert') {
            filter(INVERT);
        }
        if (this.name == 'Opaque') {
            filter(OPAQUE);
        }
        if (this.name == 'Posterize') {
            filter(POSTERIZE);
        }
        if (this.name == 'Threshold') {
            filter(THRESHOLD);
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
