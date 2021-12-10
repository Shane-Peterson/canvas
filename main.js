let canvas = document.getElementById("canvas"),
    colorPicker = document.querySelector('#colorPicker'),
    navHeight = document.querySelector('nav').clientHeight,
    clear = document.querySelector("button"),
    isTouchDevice = 'ontouchstart' in document.documentElement,
    painting = false,
    last;

canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight - navHeight;
let ctx = canvas.getContext("2d");

ctx.strokeStyle = colorPicker.value;
colorPicker.addEventListener("input", lineColorPicker, false);
clear.addEventListener("click", clearCanvas, false);


if (isTouchDevice) {
    canvas.ontouchstart = (e) => {
        e.preventDefault();
        let x = e.touches[0].clientX;
        let y = e.touches[0].clientY - navHeight;
        last = [x, y];
    }
    
    canvas.ontouchmove = (e) => {
        e.preventDefault();
        let x = e.touches[0].clientX;
        let y = e.touches[0].clientY - navHeight;
        drawLine(last[0], last[1], x, y);
        last = [x, y];
    }

} else {
    canvas.onmousedown = (e) => {
      painting = true;
      last = [e.offsetX, e.offsetY]
    };
    
    canvas.onmousemove = (e) => {
        if (painting) {
            drawLine(last[0], last[1], e.offsetX, e.offsetY);
        }
        last = [e.offsetX, e.offsetY];
    };
    
    canvas.onmouseup = (e) => {
      painting = false;
    };
}

function drawLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.lineWidth = 10;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.lineCap = "round"
}

function lineColorPicker(e) {
    ctx.strokeStyle = e.target.value;
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}
