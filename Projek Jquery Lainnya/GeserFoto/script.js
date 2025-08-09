$(function(){
  const $slides = $('.slides');
  const $imgs = $('.slides img');
  const total = $imgs.length;
  let idx = 0;
  let w = $('#slider').width();
  let auto = null;

  for(let i=0;i<total;i++){ 
    $('#dots').append('<div class="dot" data-i="'+i+'"></div>'); 
  }

  function update(){
    $slides.css('transform','translateX(' + (-idx * w) + 'px)');
    $('.dot').removeClass('aktif').eq(idx).addClass('aktif');
  }

  function next(){ idx = (idx+1)%total; update(); }

  function prev(){ idx = (idx-1+total)%total; update(); }

  $(window).on('resize', ()=>{
    w = $('#slider').width();
    update();
  });

  $('#next').on('click', ()=>{
    stopAuto(); 
    next(); 
  });

  $('#prev').on('click', ()=>{
    stopAuto(); 
    prev(); 
  });

  $('#dots').on('click', '.dot', function(){
    stopAuto();
    idx = +$(this).data('i');
    update();
  });

  function startAuto(){
    if(auto) clearInterval(auto);
    auto = setInterval(next, 3000);
    $('#pause').text('Jeda');
  }

  function stopAuto(){
    if(auto) {
      clearInterval(auto);
      auto = null;
      $('#pause').text('Lanjutkan');
    } else {
      startAuto();
    }
  }

  $('#pause').on('click', stopAuto);

  update();
  startAuto();
});