var drawingSurfaceImageData;

function clearCanvas(){
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function saveDrawingSurface(ctx){
    /*console.log("saveDrawingSurface");*/
    drawingSurfaceImageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
}
function restoreDrawingSurface(ctx){
    /*console.log("restoreDrawingSurface");*/
    ctx.putImageData(drawingSurfaceImageData, 0, 0);
}

function eventToPoint(e){
    return {x: e.offsetX, y: e.offsetY};
}

function freeDraw() {
    ctx.beginPath();
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = $('#selWidth').val();
    ctx.moveTo(mouseDownPoint.x, mouseDownPoint.y);
    ctx.lineTo(currentPoint.x, currentPoint.y);
    ctx.stroke();

    mouseDownPoint = currentPoint;
}

function drawLine() {
    ctx.beginPath();
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = $('#selWidth').val();
    ctx.moveTo(mouseDownPoint.x, mouseDownPoint.y);
    ctx.lineTo(currentPoint.x, currentPoint.y);
    ctx.stroke();
}

function drawRectangle() {
    ctx.beginPath();
    if($('#selectFill').val() == 2){
        ctx.fillStyle = fillColor;
        ctx.fillRect(drawingHelperRectangle.ulhc.x, drawingHelperRectangle.ulhc.y,
            drawingHelperRectangle.width, drawingHelperRectangle.height);
    }

    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = $('#selWidth').val();
    ctx.strokeRect(drawingHelperRectangle.ulhc.x, drawingHelperRectangle.ulhc.y,
        drawingHelperRectangle.width, drawingHelperRectangle.height);
}

function drawCircle() {
    var angle = Math.atan(drawingHelperRectangle.height / drawingHelperRectangle.width);
    var radius = drawingHelperRectangle.height / Math.sin(angle);

    if(mouseDownPoint.y === currentPoint.y){
        radius = Math.abs(currentPoint.x - mouseDownPoint.x);
    }

    ctx.beginPath();
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = $('#selWidth').val();
    ctx.arc(mouseDownPoint.x, mouseDownPoint.y, radius, 0, 2 * Math.PI, false);
    if($('#selectFill').val() == 2) {
        ctx.fillStyle = fillColor;
        ctx.fill();
    }
    ctx.stroke();
}

function drawEraserFigure(){
    ctx.save();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#000";
    ctx.strokeRect(currentPoint.x - 10, currentPoint.y - 10, 20, 20);
    ctx.restore();
}

function erase(){
    restoreDrawingSurface(ctx);
    ctx.fillStyle = "white";
    ctx.fillRect(currentPoint.x - 10, currentPoint.y - 10, 20, 20);
    /*ctx.clearRect(currentPoint.x - 10, currentPoint.y - 10, 20, 20);*/
    saveDrawingSurface(ctx);
    mouseDownPoint = currentPoint;
    drawEraserFigure();
}

function text(){
    console.log("text");
}
