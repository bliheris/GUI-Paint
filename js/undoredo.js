var cPushArray = new Array();
var cStep = -1;

function cPush() {
    console.log("cpush");
    cStep++;
    if (cStep < cPushArray.length) { cPushArray.length = cStep; }
    cPushArray.push(document.getElementById('canvas').toDataURL());
    document.title = cStep + ":" + cPushArray.length;
}
function cUndo() {
    if (cStep > 0) {
        cStep--;
        var canvasPic = new Image();
        canvasPic.src = cPushArray[cStep];
        canvasPic.onload = function () {
            ctx.drawImage(canvasPic, 0, 0);
        }
        document.title = cStep + ":" + cPushArray.length;
    }
}
function cRedo() {
    if (cStep < cPushArray.length-1) {
        cStep++;
        var canvasPic = new Image();
        canvasPic.src = cPushArray[cStep];
        canvasPic.onload = function () {
            ctx.drawImage(canvasPic, 0, 0);
        }

        document.title = cStep + ":" + cPushArray.length;
    }
}

function drawImage() {
    var image = new Image();
    image.src = 'background.png';
    $(image).load(function () {
        ctx.drawImage(image, 0, 0, ctx.canvas.width, ctx.canvas.height);
        cPush();
    });
}

drawImage();