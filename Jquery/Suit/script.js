$(document).ready(function () {
  const options = ['batu', 'gunting', 'kertas'];

  function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
  }

  function getResult(player, computer) {
    if (player === computer) return 'Seri🤨';
    if (
      (player === 'batu' && computer === 'gunting') ||
      (player === 'gunting' && computer === 'kertas') ||
      (player === 'kertas' && computer === 'batu')
    ) return 'Kamu Menang😒';
    return 'Kamu Kalah🤣';
  }

  $('.choice').click(function () {
    const playerChoice = $(this).data('choice');
    const computerChoice = getComputerChoice();
    $('#computer-choice').text(computerChoice);
    $('#result').text(getResult(playerChoice, computerChoice));
  });
});