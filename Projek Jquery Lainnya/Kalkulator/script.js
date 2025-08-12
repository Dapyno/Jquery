$(function () {
  let sekarang = '';
  let sebelumnya = null;
  let operator = null;
  const $layar = $('#layar');
  
  function tampilkan() {
    $layar.text(sekarang === '' ? '0' : sekarang);
  }

  function hitung(a, b, operator) {
    a = parseFloat(a);
    b = parseFloat(b);
    if (isNaN(a) || isNaN(b)) return '';
    switch (operator) {
      case '+': return (a + b).toString();
      case '-': return (a - b).toString();
      case '*': return (a * b).toString();
      case '/': return b === 0 ? 'Nguwawur' : (a / b).toString();
    }
    return '';
  }

  $('.tombol').click(function () {
    const nilai = $(this).data('nilai');

    if ($(this).hasClass('angka')) {
      if (nilai === '.' && sekarang.includes('.')) return;
      sekarang += nilai;
      tampilkan();
      return;
    }

    if (nilai === 'C') {
      sekarang = '';
      sebelumnya = null;
      operator = null;
      tampilkan();
      return;
    }

    if (nilai === '+/-') {
      sekarang = sekarang ? (-parseFloat(sekarang)).toString() : sekarang;
      tampilkan();
      return;
    }

    if (nilai === '%') {
      sekarang = sekarang ? (parseFloat(sekarang) / 100).toString() : sekarang;
      tampilkan();
      return;
    }

    if (nilai === '=') {
      if (sebelumnya !== null && operator && sekarang !== '') {
        const hasil = hitung(sebelumnya, sekarang, operator);
        sekarang = hasil;
        sebelumnya = null;
        operator = null;
        tampilkan();
      }
      return;
    }

    if (sekarang === '' && sebelumnya === null) return;

    if (sebelumnya === null) {
      sebelumnya = sekarang || '0';
      sekarang = '';
      operator = nilai;
    } else if (sekarang === '') {
      operator = nilai;
    } else {
      const hasil = hitung(sebelumnya, sekarang, operator);
      sebelumnya = hasil;
      sekarang = '';
      operator = nilai;
      tampilkan();
    }
  });
});