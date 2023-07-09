const gridContainer = document.getElementById("gridContainer");

function getGridItems() {
  return document.querySelectorAll('.grid-item');
}

function generateRow() {

  // change the background color of the current row
  const rowCount = document.getElementById('rowCount');
  const currentRowCount = parseInt(rowCount.textContent);
  const previousRow = document.querySelectorAll('.grid-item');

  if(previousRow) {
    // target last five items from previousRow
    console.log(previousRow)
    // loop through only the last five items in previousRow
    // add a class of past-rows
    previousRow.forEach((item, index) => {
      if (index >= previousRow.length - 5) {
        item.classList.add('past-rows');
      }
    }
    )
  }

  for (let i = 0; i < 5; i++) {
    const gridItem = document.createElement("div");
    gridItem.classList.add("grid-item");
    gridContainer.appendChild(gridItem);
  }
  handleWindowResize();

  // increase row count
  // const rowCount = document.getElementById('rowCount');
  // const currentRowCount = parseInt(rowCount.textContent);
  rowCount.textContent = currentRowCount + 1;
  focusOnFirstItemOfNextRow(currentRowCount*5);
}

function focusOnFirstItemOfNextRow(index) {
  const gridItems = getGridItems();
  const nextRowFirstItem = gridItems[index];
    nextRowFirstItem.focus();
}

generateRow();

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

function handleWindowResize() {
  if (window.innerWidth <= 600) {
    setKeyboardInput(false);
  } else {
    setKeyboardInput(true);
  }
}

window.addEventListener('resize', handleWindowResize);
handleWindowResize();

function applyEventListeners() {
  const gridItems = getGridItems();
  gridItems.forEach((gridItem, index) => {
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
              range.setStart(textNode, textNode.length); // Set the cursor at the end of the text
              range.collapse(true);
              selection.removeAllRanges();
              selection.addRange(range);
            }
          }
        }
      }
    });

    gridItem.addEventListener('keydown', (e) => {
      const target = e.target;
      if (target.classList.contains('grid-item')) {
        if (e.key === 'Backspace' && target.textContent.length === 0) {
          e.preventDefault();

          const gridItems = getGridItems();
          const index = Array.from(gridItems).indexOf(target);
          if (index > 0 && (index)%5 !== 0) {
            const prevGridItem = gridItems[index - 1];
            console.log('back to last letter')
            prevGridItem.focus();

            const range = document.createRange();
            const selection = window.getSelection();
            const textNode = prevGridItem.firstChild;
            if (textNode) {
              range.setStart(textNode, textNode.length); // Set the cursor at the end of the text
              range.collapse(true);
              selection.removeAllRanges();
              selection.addRange(range);
            }

            prevGridItem.textContent = '';
          }
        } else if (e.key === 'Enter') {
          e.preventDefault();
          const gridItemValues = [];
          const gridItems = getGridItems();
          console.log('enter pressed on keyboard');
          const index = Array.from(gridItems).indexOf(target);
          gridItems.forEach((gridItem) => {
            gridItemValues.push(gridItem.textContent);
          });
          console.log(gridItemValues);

          if (gridItems.length > 29) {
            if (!target.classList.contains('game-over')) {
              target.classList.add('game-over');
              alert('Game Over');
            }
            return;
          }
          if (index === gridItems.length - 1) {
            generateRow();
            applyEventListeners();
          }
        }
      }
    });
  });
}

applyEventListeners();

function handleDelete(){
  const deletButton = document.querySelector('.delete-button');
  deletButton.addEventListener('click', (e) => {
    console.log('delete button clicked');
    const gridItems = getGridItems();
    // don't allow delete if it's the first grid item of the row
    // find the last grid item with text
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
        console.log(index)
        lastGridItemWithText.textContent = '';
        lastGridItemWithText.focus();
      }
    }

  });
}

handleDelete();
