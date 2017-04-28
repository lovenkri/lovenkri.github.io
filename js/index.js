(function() {
var avatarImage = new fabric.Canvas('avatar-image');
var preview = document.querySelector('#preview');
var uploader = document.querySelector("#upload");
var downloader = document.querySelector('#download');
var badge = document.querySelector('#badge-image');
var reader  = new FileReader();
var imgInstance;

function processKeys(evt) {
    evt = evt || window.event;

    var movementDelta = 1;
    var activeObject = avatarImage.getActiveObject();
    var activeGroup = avatarImage.getActiveGroup();

    if (evt.keyCode === 37) {
        evt.preventDefault(); // Prevent the default action
        if (activeObject) {
            var a = activeObject.get('left') - movementDelta;
            activeObject.set('left', a);
        } else if (activeGroup) {
            var a = activeGroup.get('left') - movementDelta;
            activeGroup.set('left', a);
        }
    } else if (evt.keyCode === 39) {
        evt.preventDefault(); // Prevent the default action
        if (activeObject) {
            var a = activeObject.get('left') + movementDelta;
            activeObject.set('left', a);
        } else if (activeGroup) {
            var a = activeGroup.get('left') + movementDelta;
            activeGroup.set('left', a);
        }
    } else if (evt.keyCode === 38) {
        evt.preventDefault(); // Prevent the default action
        if (activeObject) {
            var a = activeObject.get('top') - movementDelta;
            activeObject.set('top', a);
        } else if (activeGroup) {
            var a = activeGroup.get('top') - movementDelta;
            activeGroup.set('top', a);
        }
    } else if (evt.keyCode === 40) {
        evt.preventDefault(); // Prevent the default action
        if (activeObject) {
            var a = activeObject.get('top') + movementDelta;
            activeObject.set('top', a);
        } else if (activeGroup) {
            var a = activeGroup.get('top') + movementDelta;
            activeGroup.set('top', a);
        }
    }
    if (activeObject) {
        activeObject.setCoords();
        avatarImage.renderAll();
    } else if (activeGroup) {
        activeGroup.setCoords();
        avatarImage.renderAll();
    }
}

reader.addEventListener("load", function () {
    var imgElmt = new Image();
    imgElmt.onload = function() {
        imgInstance = new fabric.Image(imgElmt, {
              left: 0,
              top: 0,
              width: avatarImage.width * 0.6,
              height: avatarImage.height,
              zIndex: 0
        });
        avatarImage.add(imgInstance)
        imgInstance.on({
            'modified': function() {
                avatarImage.deactivateAll();
                badgeInstance.bringToFront();
            }
        })
        downloader.removeAttribute('disabled');
    }
    imgElmt.src = reader.result;
}, false);

uploader.addEventListener('change', function() {
    var file = document.querySelector('input[type=file]').files[0];
    if(file) {
        reader.readAsDataURL(file);
    }
}, false)

downloader.addEventListener('click', function(e) {
    if(imgInstance) {
        this.href = avatarImage.toDataURL({
            format: 'png',
            quality: 0.8,
            width: 320,
            height: 320
        });
        this.download = 'lovenkri-avatar.png';
        window.open(this.href);
    }
}, false)

avatarImage.setDimensions({width: 320, height: 320})
var badgeInstance = new fabric.Image(badge, {
    top: 0,
    left: avatarImage.width * 0.6,
    width: avatarImage.width * 0.4,
    height: avatarImage.height,
    opacity: 1,
    zIndex: 1,
    selectable: false
})

preview.tabIndex = 1000;
preview.addEventListener("keydown", processKeys, false);
avatarImage.add(badgeInstance);
badgeInstance.bringToFront();
}())
