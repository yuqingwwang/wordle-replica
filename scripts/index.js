const gridContainer = document.getElementById("gridContainer");

function getGridItems() {
  return document.querySelectorAll('.grid-item');
}

function generateRow() {

  for (let i = 0; i < 5; i++) {
    const gridItem = document.createElement("div");
    gridItem.classList.add("grid-item");
    gridContainer.appendChild(gridItem);
  }
  handleWindowResize();

  // increase row count
  const rowCount = document.getElementById('rowCount');
  const currentRowCount = parseInt(rowCount.textContent);
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
          if (index > 0) {
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

          if (gridItems.length > 9) {
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
