
document.addEventListener("DOMContentLoaded", function() {
  // this function runs when the DOM is ready, i.e. when the document has been parsed
  const what = document.getElementsByClassName('mm__square');
  let squares = Array.from(document.getElementsByClassName('mm__square'));

  let numActive = 0;
  let numMatches = 0;
  let firstVal = null;
  let firstIndex = null;

  squares.forEach((squareEl, index) => {

    // Get a random number
    // Set a value for each element
    squareEl.setAttribute('data-val', board[index].val);

    squareEl.addEventListener('click', () => {
      // console.log('here', squareEl, squareEl.getAttribute('data-val'));

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
        //
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
          board[index].covered = true;


          // Increase the amount of matches and reset numActive
          numMatches++;

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

        // Either way, reset numActive to 0
        if (numMatches === 4) {
          alert('You the game!!');
        }
        firstIndex = null;
        numActive = 0;
      }
    });
  });
});


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

let board = shuffle([ 1, 1, 2, 2, 3, 3, 4, 4, 5])
  .map((val, index) => ({
    val,
    covered: true,
    matched: false,
    index,
  }));

console.log('vals', board);


