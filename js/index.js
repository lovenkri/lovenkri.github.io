function() {
var avatarImage = new fabric.Canvas('avatar-image');
var uploader = document.querySelector("#upload");
var downloader = document.querySelector('#download');
var badge = document.querySelector('#badge-image');
var reader  = new FileReader();
var imgInstance;

avatarImage.on({
    'object:modified': function() {
        var objects = avatarImage.getObjects();
        avatarImage.setActiveObject(objects[1]);
    }
})

reader.addEventListener("load", function () {
    console.log("File loaded")
    avatarImage.remove(imgInstance)
    avatarImage.setDimensions({width: 300, height: 300})
    var imgElmt = new Image();
    imgElmt.onload = function() {
        imgInstance = new fabric.Image(imgElmt, {
              left: 0,
              top: 0,
              width: avatarImage.width * 0.6,
              height: avatarImage.height,
              zIndex: 0
        });
        badgeInstance = new fabric.Image(badge, {
            top: 0,
            left: avatarImage.width * 0.6,
            width: avatarImage.width * 0.4,
            height: avatarImage.height,
            opacity: 1,
            zIndex: 1,
            selectable: false
        })
        avatarImage.add(imgInstance)
        avatarImage.add(badgeInstance)
        badgeInstance.bringToFront()
        badge.remove()
    }
    imgElmt.src = reader.result;
}, false);

uploader.addEventListener('change', function() {
    var file    = document.querySelector('input[type=file]').files[0];
    if(file) {
        reader.readAsDataURL(file);
    }
}, false)

downloader.addEventListener('click', function(e) {
    this.href = avatarImage.toDataURL({
        format: 'png',
        quality: 0.8,
        width: 300,
        height: 300
    });
    this.download = 'lovenkri-avatar.png';
    window.open(this.href);
}, false)
}()
