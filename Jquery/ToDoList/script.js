$(function(){
  const LS_KEY = 'todo_warna';
  const $list = $('#list'), $task = $('#task');

  function renderFromStore(){
    $list.empty();
    const html = localStorage.getItem(LS_KEY);
    if(html) $list.html(html);
  }

  function saveStore(){ localStorage.setItem(LS_KEY, $list.html()); }

  renderFromStore();

  $('#add').on('click', ()=>{
    const val = $task.val().trim();
    if(!val) return;
    const $li = $(`<li class="item"><span class="text"></span><div><button class="delete">Hapus</button></div></li>`);
    $li.find('.text').text(val);
    $list.prepend($li.hide().fadeIn(200));
    $task.val('').focus();
    saveStore();
  });

  $list.on('click', '.text', function(){
    $(this).closest('.item').toggleClass('done');
    saveStore();
  });

  $list.on('click', '.delete', function(){
    $(this).closest('.item').fadeOut(180, function(){ $(this).remove(); saveStore(); });
  });

  $('#clearDone').click(function(){
    $list.find('.done').fadeOut(200, function(){ $(this).remove(); saveStore(); });
  });

  $('#clearAll').click(function(){
    if(confirm('Hapus semua tugas?')){ $list.empty(); saveStore(); }
  });

  $task.on('keydown', function(e){ if(e.key === 'Enter') $('#add').click(); });
});
