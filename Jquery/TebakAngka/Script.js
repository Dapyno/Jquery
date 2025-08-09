$(function(){
  let secret, tries, historyArr;
  function newGame(){
    secret = Math.floor(Math.random()*100)+1;
    tries = 10;
    historyArr = [];
    $('#status').text('Ayo tebak!');
    $('#tries').text(tries);
    $('#history').empty();
    $('#guess').val('').focus();
  }
  function addHistory(txt){ $('#history').prepend('<li>' + txt + '</li>'); }

  $('#submit').click(function(){
    const val = parseInt($('#guess').val(),10);
    if(isNaN(val) || val<1 || val>100){ alert('Masukkan angka 1-100'); return; }
    if(tries<=0){ $('#status').text('Game selesai — mulai ulang.'); return; }
    tries--;
    $('#tries').text(tries);
    if(val === secret){
      $('#status').text('🎉 KAMU BENAR! Angkanya: ' + secret);
      addHistory('Tebakan: ' + val + ' — BENAR!');
      tries = 0;
    } else if(val < secret){
      $('#status').text('Terlalu kecil ⬆️');
      addHistory('Tebakan: ' + val + ' — Terlalu kecil');
    } else {
      $('#status').text('Terlalu besar ⬇️');
      addHistory('Tebakan: ' + val + ' — Terlalu besar');
    }
    if(tries===0 && val !== secret){
      $('#status').text('Game over. Angka benar: ' + secret);
    }
    $('#guess').val('').focus();
  });

  $('#reset').click(newGame);
  $('#guess').on('keydown', function(e){ if(e.key==='Enter') $('#submit').click(); });

  newGame();
});