function cl(text){
  console.log(text);
}

var container = document.getElementById('container');
var innerBigContainer = document.getElementById('inner_big_container');
var containerWidth = innerBigContainer.style.width;
var displayWidth = screen.width;
var startX;
var offset = 0;

cl('Container: ' + container + '\nContainer width:\t' + containerWidth + '\nDisplay width:\t\t' + displayWidth);

function touchStart(evt){
  startX = evt.touches[0].clientX;
}
function touchMove(evt){
  var change = startX - evt.touches[0].clientX;

  if(change < 0){
    return;
  }

  innerBigContainer.style.left = '-' + (change + offset) + 'px';
  cl('-' + change + offset + 'px');

  evt.preventDefault();

}
function touchEnd(evt){
  var change = (startX - evt.changedTouches[0].clientX);
  var threshold = screen.width;

  cl('CHANGE: ' + change + ' THRESHOLD: ' + threshold);

  if(change < threshold){
    innerBigContainer.style.transition = 'all .3s';
    innerBigContainer.style.left = 0;
  }else{
    innerBigContainer.style.transition = 'all .3s';
    innerBigContainer.style.left = '-100%';
    offset += screen.width;
  }
}
