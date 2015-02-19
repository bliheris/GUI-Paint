function download() {
    var canv = document.getElementById('canvas');
    var dt = canv.toDataURL('image/jpeg');
    this.href = dt; //this may not work in the future..
}
document.getElementById('download').addEventListener('click', download, false);
