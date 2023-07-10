import { ANSWER } from "./constants.js";

const gridContainer = document.getElementById("gridContainer");
const answer = ANSWER;
let rowCount = document.getElementById('rowCount');

/* For Laptop */
function handleWindowResize() {
  /**
   * Disabling inbuilt keyboard for small screen users
   */

  function setKeyboardInput(enabled) {
    const gridItems = getGridItems();
    if (enabled) {
      gridItems.forEach(gridItem => {
        gridItem.contentEditable = 'true';
      });
    } else {
      gridItems.forEach(gridItem => {
        gridItem.removeAttribute('contenteditable');
      });
    }
  }

  if (window.innerWidth <= 600) {
    setKeyboardInput(false);
  } else {
    setKeyboardInput(true);
  }
}

function focusCursor(range, selection, textNode) {
  /**
   * Set the cursor at the end of the text
   */

  range.setStart(textNode, textNode.length);
  range.collapse(true);
  selection.removeAllRanges();
  selection.addRange(range);
}

function applyEventListeners() {
  /**
  * handles input, delete, and enter keys being pressed on laptop
  */

  const gridItems = getGridItems();

  gridItems.forEach((gridItem) => {

    gridItem.addEventListener('input', (event) => {
      const target = event.target;
      if (target.classList.contains('grid-item')) {
        const text = target.textContent.trim().toUpperCase();
        const alphabeticText = text.replace(/[^A-Z]/g, '');
        target.textContent = alphabeticText.slice(0, 1);

        if (target.textContent.length === 0) {
          target.focus();
        } else {
          const gridItems = getGridItems();
          const index = Array.from(gridItems).indexOf(target);

          if (index < gridItems.length - 1) {
            gridItems[index + 1].focus();
          } else {
            const range = document.createRange();
            const selection = window.getSelection();
            const textNode = target.firstChild;

            if (textNode) {
              focusCursor(range, selection, textNode)
            }
          }
        }
      }
    });

    gridItem.addEventListener('keydown', (e) => {
      const target = e.target;
      if (target.classList.contains('grid-item')) {
        console.log(e.key);
        // delete
        if (e.key === 'Backspace' && target.textContent.length === 0) {
          e.preventDefault();
          deleteLastWord();
        }
        // enter
        else if (e.key === 'Enter') {
          e.preventDefault();
          checkAnswer(target);
        }
      }
    });

    });
};





/* For Mobile */
function handleDelete() {
  const deleteButton = document.querySelector('.delete-button');
  deleteButton.addEventListener('click', () => {
    deleteLastWord()
  });
}

function handleEnter() {
  const enterButton = document.querySelector('.enter-button');

  enterButton.addEventListener('click', (e) => {
    const target = e.target;
    checkAnswer(target)
  });
}



/* Utils */
function getGridItems() {
  /**
   * Refresh the grids
   */
  return document.querySelectorAll('.grid-item');
}





function generateRow() {
  /**
   * Mark the last row as completed
   * Generate a new row of five grid items
   */

  const currentRowCount = parseInt(rowCount.textContent);

  const previousRow = document.querySelectorAll('.grid-item');

  if (previousRow) {
    // target last five items from previousRow
    previousRow.forEach((item, index) => {
      if (index >= previousRow.length - 5) {
        item.classList.add('past-rows');
      } else {
        item.classList.remove('past-rows');
      }
    });
  }

  for (let i = 0; i < 5; i++) {
    const gridItem = document.createElement("div");
    gridItem.classList.add("grid-item");
    gridContainer.appendChild(gridItem);
  }

  handleWindowResize();

  // increase row count
  rowCount.textContent = currentRowCount + 1;

  function focusOnFirstItemOfNextRow(index) {
    const gridItems = getGridItems();
    const nextRowFirstItem = gridItems[index];
      nextRowFirstItem.focus();
  }

  focusOnFirstItemOfNextRow(currentRowCount * 5);
}

function deleteLastWord() {
  const gridItems = getGridItems();

  let lastGridItemWithText;
  for (let i = gridItems.length - 1; i >= 0; i--) {
    if (gridItems[i].textContent.length > 0) {
      lastGridItemWithText = gridItems[i];
      break;
    }
  }
  if (lastGridItemWithText) {
    // only delete if it's not the first grid item of the row
    const index = Array.from(gridItems).indexOf(lastGridItemWithText);
    if ((index + 1) % 5 !== 0) {
      lastGridItemWithText.textContent = '';
      lastGridItemWithText.focus();
    }
  }
}

function checkAnswer(target) {
  const answerArray = answer.split('');
  const currentRowCount = parseInt(rowCount.textContent) - 1;
  const gridItems = getGridItems();
  const isGridFilled = Array.from(gridItems).every(gridItem => gridItem.textContent.length > 0);

  // prevent submission if the current row is not complete
  if(!isGridFilled){
    return;
  }

  const gridItemValuesArray = Array.from(gridItems).slice(-5).map(gridItem => gridItem.textContent);

  if(gridItemValuesArray.join('') === answer) {
    alert('You win!');
    location.reload();
    return;
  }

  gridItemValuesArray.forEach((letter, index) => {
    if (letter === answerArray[index]) {
      gridItems[currentRowCount*5 + index].classList.add('correct');
    } else if (answerArray.includes(letter)) {
      gridItems[currentRowCount*5 + index].classList.add('ok');
    } else {
      gridItems[currentRowCount*5 + index].classList.add('wrong');
    }
  });

  // limitation of 6 guesses
  if (gridItems.length > 29) {
    if (!target.classList.contains('game-over')) {
      target.classList.add('game-over');
      alert('Game Over');
    }
    return;
  }

  generateRow();
  applyEventListeners();

};





generateRow();
handleDelete();
handleEnter();
applyEventListeners();
window.addEventListener('resize', handleWindowResize);
handleWindowResize();
