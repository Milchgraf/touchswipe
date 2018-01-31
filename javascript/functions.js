function cl(text){
  console.log(text);
}

var container = document.getElementById('container');
var containerJQ = $('#container');
//var innerBigContainer = document.getElementById('inner_big_container');
//var containerWidth = innerBigContainer.style.width;
var displayWidth = screen.width;
var start,
    end,
    offset,
    counter = 1,
    oldLeft = 0,
    newLeft = 0,
    countPages = $('.inner_big_container').children().length,
    oldRight;

cl(countPages);

var hammer = new Hammer(container);

//Recognize when PAN starts
hammer.on('panstart', function(evt){
  start = evt.center.x;
});

//During PAN gesture
hammer.on('pan', function(evt){

  if(counter > 1){
    offset = evt.deltaX - (containerJQ.width() * (counter - 1));
  }else{
    offset = evt.deltaX;
  }

  $('.inner_big_container').css({
    left: offset
  });

});

//Recognize when PAN ends
hammer.on('panend', function(evt){

  end = evt.center.x;

  //WENN DELTAX GRÖßER ALS SCREENWIDTH / 2
  if(evt.deltaX < -containerJQ.width() / 2 || evt.deltaX > containerJQ.width() / 2){

    //WENN NACH LINKS
    if(start > end){
      if(counter < countPages){
        cl('PAN LEFT');
        $('.inner_big_container').animate({
          left: -100 * counter + '%'
        }, 250);
        counter += 1;
        oldLeft -= 100;
      }else{
        cl('SNAPBACK LEFT PAN');
        $('.inner_big_container').animate({
          left: oldLeft + '%'
        }, 250);
      }

    }
    //WENN NACH RECHTS
    if(start < end){
      if(counter > 1 && oldLeft < 0){
        cl('PAN RIGHT');
        if(oldLeft != 0){
          newLeft = oldLeft + 100;
        }else{
          newLeft = 0;
        }

        $('.inner_big_container').animate({
          left: newLeft + '%'
        }, 250);
        counter -= 1;
        oldLeft += 100;
      }else{
        cl('SNAPBACK RIGHT PAN');
        $('.inner_big_container').animate({
          left: 0
        }, 250);
      }
    }

  //WENN DELTAX KLEINER ALS SCREENWIDTH / 2
  }else{

    if(oldLeft != 0){
      newLeft = oldLeft;
    }else{
      newLeft = 0;
    }

    //WENN NACH LINKS
    if(start > end){
      cl('SNAPBACK LEFT PAN');
      $('.inner_big_container').animate({
        left: newLeft + '%'
      }, 250);
    }
    //WENN NACH RECHTS
    if(start < end){
      cl('SNAPBACK RIGHT PAN');
      $('.inner_big_container').animate({
        left: newLeft + '%'
      }, 250);
    }

  }

  cl('COUNTER: ' + counter);
  cl('deltaX: ' + evt.deltaX);

  $('.info_p').html('COUNTER: ' + counter + '<br>OLDLEFT: ' + oldLeft);

});
