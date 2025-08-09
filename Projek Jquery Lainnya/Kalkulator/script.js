$(function(){
  let current = '';
  let prev = null;
  let op = null;
  const $display = $('#display');

  function render(){
    $display.text(current === '' ? '0' : current);
  }

  function calc(a,b,operator){
    a = parseFloat(a); 
    b = parseFloat(b);
    if(isNaN(a) || isNaN(b)) return '';
    switch(operator){
      case '+': return (a+b).toString();
      case '-': return (a-b).toString();
      case '*': return (a*b).toString();
      case '/': return b===0 ? 'Err' : (a/b).toString();
    }
    return '';
  }

  $('.key').click(function(){
    const v = $(this).data('val');
    if($(this).hasClass('num')){
      if(v === '.' && current.includes('.')) return;
      current += v;
      render();
      return;
    }
    if(v === 'C'){ current=''; prev=null; op=null; render(); return; }
    if(v === '+/-'){ current = current ? (-parseFloat(current)).toString() : current; render(); return; }
    if(v === '%'){ current = current ? (parseFloat(current)/100).toString() : current; render(); return; }
    if(v === '='){
      if(prev !== null && op && current !== ''){
        const res = calc(prev, current, op);
        current = res;
        prev = null; 
        op = null;
        render();
      }
      return;
    }
    if(current === '' && prev === null) return;
    if(prev === null){
      prev = current || '0';
      current = '';
      op = v;
    } else if(current === ''){
      op = v; 
    } else {
      const res = calc(prev, current, op);
      prev = res;
      current = '';
      op = v;
      render();
    }
  });
});