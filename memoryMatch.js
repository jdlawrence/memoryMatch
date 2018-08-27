
let board = [];
let numActive = 0;
let numMatches = 0;
let firstVal = null;
let firstIndex = null;

document.addEventListener("DOMContentLoaded", function() {
  // this function runs when the DOM is ready, i.e. when the document has been parsed
  const squares = resetGame();

  squares.forEach((squareEl, index) => {

    squareEl.addEventListener('click', () => {

      if (numMatches < 4) {

        // If the square is covered and there are not already two active,
        // uncover it
        if (board[index].covered && numActive === 0) {
          board[index].covered = false;
          numActive = 1;
          firstVal = board[index].val;
          firstIndex = index;
          squareEl.classList.add('mm__square--open');
          squareEl.innerHTML = squareEl.getAttribute('data-val');
        } else if (board[index].covered && numActive === 1) {
          // If they match open both and increase num of matches
          const firstSquare = document.getElementsByClassName('mm__square').item(firstIndex);

          if (board[index].val === firstVal) {
            console.log('a match!!');
            // Mark both cells with matched class
            firstSquare.classList.add('mm__square--matched');
            squareEl.classList.add('mm__square--matched');
            squareEl.innerHTML = squareEl.getAttribute('data-val');

            // Set the board state
            board[firstIndex].covered = false;
            board[firstIndex].matched = true;
            board[index].matched = true;
            board[index].covered = false;

            // Increase the amount of matches and reset numActive
            numMatches++;
            if (numMatches === 4) {
              alert('You won the game!!');
            }

          } else {
            // Instantaneously deal with the board state
            board[index].covered = true;
            board[firstIndex].covered = true;

            // Temporarily reveal the selected square
            squareEl.classList.add('mm__square--open');
            squareEl.innerHTML = squareEl.getAttribute('data-val');

            // Deactivate both squares after a delay
            setTimeout( () => {
              squareEl.classList.remove('mm__square--open');
              squareEl.innerHTML = '';
              firstSquare.classList.remove('mm__square--open');
              firstSquare.innerHTML = '';
            }, 500);

            // Turn the container border color red, and reset after 500ms
            const container = document.getElementsByClassName('mm__container').item(0);
            container.classList.add('mm__container--no-match');
            setTimeout(() => {
              container.classList.remove('mm__container--no-match');
            }, 500);
          }
          numActive = 0;
          firstIndex = null;
        }
      }
    });
  });

  const resetButton = document.getElementsByClassName('mm__reset').item(0);
  resetButton.addEventListener('click', resetGame);
});

const resetGame = () => {
  board = shuffle([ 1, 1, 2, 2, 3, 3, 4, 4, 5])
  .map((val, index) => ({
    val,
    covered: true,
    matched: false,
    index,
  }));

  let squares = Array.from(document.getElementsByClassName('mm__square'));
  squares.forEach((square, index) => {
    square.classList.remove('mm__square--open', 'mm__square--matched');
    square.innerHTML = '';

    // Set a value for each element
    square.setAttribute('data-val', board[index].val);
  });

  numActive = 0;
  numMatches = 0;
  firstVal = null;
  firstIndex = null;

  console.log('vals', board);
  return squares;
};

const shuffle = (array) => {
  let currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};
