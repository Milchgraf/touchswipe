var container = document.getElementById('slider_outer_container'),
    containerJQ = $('#slider_outer_container'),
    start,
    end,
    offset,
    counter = 1,
    oldLeft = 0,
    newLeft = 0,
    countPages = $('.slider_absolute_inner_container').children().length,
    oldRight;

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

  $('.slider_absolute_inner_container').css({
    left: offset
  });

});

//Recognize when PAN ends
hammer.on('panend', function(evt){

  end = evt.center.x;

  //KRASSESTER SHIT, DEN ICH JE GESCHRIEBEN HABE
  console.log('DELTA TIME: ' + evt.deltaTime);
  console.log('DELTA X: ' + evt.deltaX);
  console.log('REMAINING WAY: ' + (containerJQ.width() - Math.abs(evt.deltaX)));
  console.log('VELOCITY: ' + (Math.abs(evt.deltaX) / evt.deltaTime));
  console.log('REMAINING TIME: ' + ((containerJQ.width() - Math.abs(evt.deltaX)) / (Math.abs(evt.deltaX) / evt.deltaTime)));
  var remTime = (containerJQ.width() - Math.abs(evt.deltaX)) / (Math.abs(evt.deltaX) / evt.deltaTime);

  //WENN DELTA-X GRÖßER ALS SCREENWIDTH / 2
  if(evt.deltaX < -containerJQ.width() / 2 || evt.deltaX > containerJQ.width() / 2){

    //WENN NACH LINKS
    if(start > end){
      if(counter < countPages){
        //cl('PAN LEFT');
        $('.slider_absolute_inner_container').animate({
          left: -100 * counter + '%'
        }, remTime);
        counter += 1;
        oldLeft -= 100;
      }else{
        //cl('SNAPBACK LEFT PAN');
        $('.slider_absolute_inner_container').animate({
          left: oldLeft + '%'
        }, remTime);
      }

    }
    //WENN NACH RECHTS
    if(start < end){
      if(counter > 1 && oldLeft < 0){
        //cl('PAN RIGHT');
        if(oldLeft != 0){
          newLeft = oldLeft + 100;
        }else{
          newLeft = 0;
        }

        $('.slider_absolute_inner_container').animate({
          left: newLeft + '%'
        }, remTime);
        counter -= 1;
        oldLeft += 100;
      }else{
        //cl('SNAPBACK RIGHT PAN');
        $('.slider_absolute_inner_container').animate({
          left: 0
        }, remTime);
      }
    }

  //WENN DELTA-X KLEINER ALS SCREENWIDTH / 2
  }else{

    if(oldLeft != 0){
      newLeft = oldLeft;
    }else{
      newLeft = 0;
    }

    //WENN NACH LINKS
    if(start > end){
      //cl('SNAPBACK LEFT PAN');
      $('.slider_absolute_inner_container').animate({
        left: newLeft + '%'
      }, 250);
    }
    //WENN NACH RECHTS
    if(start < end){
      //cl('SNAPBACK RIGHT PAN');
      $('.slider_absolute_inner_container').animate({
        left: newLeft + '%'
      }, 250);
    }
  }

});
