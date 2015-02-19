$("#drawingColors").on("click", "li", function(){
    $(this).siblings().removeClass("selected");
    $(this).addClass("selected");
});


$("#colorSelection").on("click", "li", function(){
/*    $(this).siblings().removeClass("selectedColor");
    $(this).addClass("selectedColor");*/
    if($("#strokeC").hasClass("selected")){
        strokeColor = $(this).css("background-color");
        ctx.strokeStyle = strokeColor;
        $(".strokeColor").css("background-color", strokeColor);
    }else{
        fillColor = $(this).css("background-color");
        ctx.fillStyle = fillColor;
        $(".fillColor").css("background-color", fillColor);
    }
});


