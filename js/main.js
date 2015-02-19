var $canvas = $("canvas");
var ctx = $canvas[0].getContext("2d");

var strokeColor = $(".strokeColor").css("background-color");
ctx.strokeStyle = strokeColor;
var fillColor = $(".fillColor").css("background-color");
ctx.fillStyle = fillColor;

var drawFunc;
var drawInstantly;
var drawing;

var ulhcPoint = {};
var drawingHelperRectangle = {ulhc: ulhcPoint};

var mouseDownFlag = false;
var mouseDownPoint = {};
var currentPoint = {};

function updateDrawingHelperRectangle(point){
    drawingHelperRectangle.width = Math.abs(point.x - mouseDownPoint.x);
    drawingHelperRectangle.height = Math.abs(point.y - mouseDownPoint.y);

    if(point.x > mouseDownPoint.x){
        drawingHelperRectangle.ulhc.x = mouseDownPoint.x;
    }else{
        drawingHelperRectangle.ulhc.x = point.x;
    }
    if(point.y > mouseDownPoint.y){
        drawingHelperRectangle.ulhc.y = mouseDownPoint.y;
    }else{
        drawingHelperRectangle.ulhc.y = point.y;
    }
}

$canvas.mousedown(function(e){
    mouseDownPoint = eventToPoint(e);
    mouseDownFlag = true;

    if(drawFunc === erase){
        drawFunc();
    }else{
        saveDrawingSurface(ctx);
    }
});

$canvas.mousemove(function(e){
    currentPoint = eventToPoint(e);

    if(drawFunc === erase){
        if(mouseDownFlag){
            drawFunc();
        }else{
            restoreDrawingSurface(ctx);
            drawEraserFigure();
        }
    }else{
        if(!mouseDownFlag){
            return;
        }

        drawing = true;
        if(drawInstantly){
            drawFunc();
        }else{
            restoreDrawingSurface(ctx);
            updateDrawingHelperRectangle(currentPoint);
            drawFunc();
        }
    }
});

$canvas.mouseup(function(e) {
    if(drawFunc === erase){
        restoreDrawingSurface(ctx);
        if(mouseDownFlag) cPush();
        saveDrawingSurface(ctx);
    }else{
        currentPoint = eventToPoint(e);
        if(drawInstantly){
            if(mouseDownFlag) cPush();
        }
        else if(!drawInstantly && drawing){
            drawFunc();
            cPush();
        }
        drawing = false;
    }
    mouseDownFlag = false;
});

$canvas.mouseleave(function(){
    $canvas.mouseup();
});

$(window).keypress(function (e) {
    if (drawFunc === text) {
        console.log("Drawing text");
        var font = $('#fontSizeSelect').val() + "pt " + $('#fontSelect').val();
        console.log(font);
        ctx.font = font;
        ctx.textBaseline = "bottom";
        ctx.textAlign = "left";
        ctx.fillStyle = strokeColor;
        ctx.fillText(String.fromCharCode(e.which), mouseDownPoint.x, mouseDownPoint.y);
        var textMTX = ctx.measureText(String.fromCharCode(e.which));
        mouseDownPoint.x += textMTX.width + 1;
        cPush();
    }
});


