
document.addEventListener("DOMContentLoaded", function() {
  // this function runs when the DOM is ready, i.e. when the document has been parsed
  let squares = Array.from(document.getElementsByClassName('mm__square'));

  let shuffled = shuffle(squareVals);
  console.log('shf', shuffled);
  squares.forEach((squareEl, index) => {

    // Get a random number
    // Set a value for each element
    squareEl.setAttribute('data-val', shuffled[index]);

    squareEl.addEventListener('click', () => {
      console.log('here', squareEl, squareEl.getAttribute('data-val'));
      squareEl.classList.add('mm__square--open');
      squareEl.innerHTML = squareEl.getAttribute('data-val');
    });
  });
});

const squareVals = [ 1, 1, 2, 2, 3, 3, 4, 4, 5];

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


