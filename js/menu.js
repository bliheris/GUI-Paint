var MENU = new MENU_CLASS();

function MENU_CLASS(){

    this.openFile = function(){
        document.getElementById("hiddenFileOpener").innerHTML = '';
        var a = document.createElement('input');
        a.setAttribute("id", "file_open");
        a.type = 'file';
        document.getElementById("hiddenFileOpener").appendChild(a);
        document.getElementById('file_open').addEventListener('change', MENU.handleOpenFile, false);

        document.querySelector('#file_open').click();
    };

    this.handleOpenFile = function(evt){
        if(evt.target.files.size === 0){
            return;
        }
        var file = evt.target.files[0];
        if (!file.type.match('image.*')) {
            return;
        }

        var fileReader = new FileReader();
        fileReader.onload = (function(event) {
            return function(e) {
                console.log("Loading file");
                clearCanvas();
                var loadedImage = new Image();
                loadedImage.onload = function() {
                    console.log("loadedImage Onload");
                    ctx.drawImage(loadedImage, 0, 0);
                    cPush();
                };
                loadedImage.src = e.target.result;
            };
        })(file);

        fileReader.readAsDataURL(file);
    };
}
