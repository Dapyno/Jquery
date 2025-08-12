$(function () {
  const $semuaSlide = $('.semuaSlide');
  const $gambar = $('.semuaSlide img');
  const jumlahSlide = $gambar.length;
  let indeks = 0;
  let lebar = $('.penggeser').width();
  let otomatis = null;

  for (let i = 0; i < jumlahSlide; i++) {
    $('#titikNavigasi').append('<div class="titik" data-i="' + i + '"></div>');
  }

  function perbaruiSlide() {
    $semuaSlide.css('transform', 'translateX(' + (-indeks * lebar) + 'px)');
    $('.titik').removeClass('aktif').eq(indeks).addClass('aktif');
  }

  function berikutnya() {
    indeks = (indeks + 1) % jumlahSlide;
    perbaruiSlide();
  }

  function sebelumnya() {
    indeks = (indeks - 1 + jumlahSlide) % jumlahSlide;
    perbaruiSlide();
  }

  $(window).on('resize', () => {
    lebar = $('.penggeser').width();
    perbaruiSlide();
  });

  $('#berikutnya').on('click', () => {
    hentikanOtomatis();
    berikutnya();
  });

  $('#sebelumnya').on('click', () => {
    hentikanOtomatis();
    sebelumnya();
  });

  $('#titikNavigasi').on('click', '.titik', function () {
    hentikanOtomatis();
    indeks = +$(this).data('i');
    perbaruiSlide();
  });

  function mulaiOtomatis() {
    if (otomatis) clearInterval(otomatis);
    otomatis = setInterval(berikutnya, 3000);
    $('#jeda').text('Jeda');
  }

  function hentikanOtomatis() {
    if (otomatis) {
      clearInterval(otomatis);
      otomatis = null;
      $('#jeda').text('Lanjutkan');
    } else {
      mulaiOtomatis();
    }
  }

  $('#jeda').on('click', hentikanOtomatis);

  perbaruiSlide();
  mulaiOtomatis();
});