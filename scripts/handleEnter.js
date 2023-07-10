const enterButton = document.querySelector('.enter-button');

enterButton.addEventListener('click', (e) => {
  const target = e.target;
  const gridItems = getGridItems();
  const answerArray = answer.split('');

  const rowCount = document.getElementById('rowCount');
  const currentRowCount = parseInt(rowCount.textContent) - 1;
  // Check if all the grid items are filled
  const isGridFilled = Array.from(gridItems).every(gridItem => gridItem.textContent.length > 0);
  if (isGridFilled) {
    // Get the text from the grid items in the last 5 grid items
    const gridItemValuesArray = Array.from(gridItems).slice(-5).map(gridItem => gridItem.textContent);

    const gridItemValues = [];
    gridItems.forEach((gridItem) => {
      gridItemValues.push(gridItem.textContent);
    });

    // checking gridItemValues against the answer, letter by letter
    // if letter and position match, add a class of correct
    // if letter matches but position doesn't, add a class of ok
    // if letter doesn't match, add a class of wrong

    // if it's a perfect match, alert success and end game
    if(gridItemValuesArray.join('') === answer) {
      alert('You win!');
      // refresh the page
      location.reload();
      return;
    }

    gridItemValuesArray.forEach((letter, index) => {
      console.log(letter, answerArray[index], gridItems[currentRowCount * 5 + index])
      if (letter === answerArray[index]) {
        gridItems[currentRowCount * 5 + index].classList.add('correct');
      } else if (answerArray.includes(letter)) {
        gridItems[currentRowCount * 5 + index].classList.add('ok');
      } else {
        gridItems[currentRowCount * 5 + index].classList.add('wrong');
      }
    });
      // if there is less than 9 grid items, add a new row
      if (gridItems.length > 29) {
        if (!target.classList.contains('game-over')) {
          target.classList.add('game-over');
          alert('Game Over');
        }
        return;
      }
      generateRow();
    }
});
