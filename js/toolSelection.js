$("#toolSelection").on("click", "li", function(){
    $(this).siblings().removeClass("selectedTool");
    $(this).addClass("selectedTool");
});

$("#freeDrawTool").click(function(){
    drawFunc = freeDraw;
    drawInstantly = true;
});

$("#drawLine").click(function(){
    drawFunc = drawLine;
    drawInstantly = false;
});

$("#drawCirlce").click(function(){
    drawFunc = drawCircle;
    drawInstantly = false;
});

$("#drawRectangle").click(function(){
    drawFunc = drawRectangle;
    drawInstantly = false;
});

$("#eraser").click(function(){
    drawFunc = erase;
    drawInstantly = false;
    saveDrawingSurface(ctx);
});

$("#text").click(function(){
    drawFunc = text;
    drawInstantly = false;
});

$("#freeDrawTool").click();