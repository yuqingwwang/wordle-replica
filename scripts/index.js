const gridContainer = document.getElementById("gridContainer");

// for (let i = 0; i < 5; i++) {
//   const gridItem = document.createElement("div");
//   gridItem.setAttribute("contenteditable", "true");
//   gridItem.classList.add("grid-item");
//   gridContainer.appendChild(gridItem);
// }

function getGridItems () {
  return document.querySelectorAll('.grid-item');
}

function generateRow () {
  for (let i = 0; i < 5; i++) {
    const gridItem = document.createElement("div");
    gridItem.setAttribute("contenteditable", "true");
    gridItem.classList.add("grid-item");
    gridContainer.appendChild(gridItem);
  }
  // refresh the grid items
  let gridItems = getGridItems();
  console.log(gridItems.length)
  gridItems[gridItems.length - 5].focus();

}

generateRow();


function applyEventListeners() {
  gridContainer.addEventListener('input', (event) => {
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

  gridContainer.addEventListener('keydown', (e) => {
    const target = e.target;
    if (target.classList.contains('grid-item')) {
      if (e.key === 'Backspace' && target.textContent.length === 0) {
        e.preventDefault();

        const gridItems = getGridItems();
        const index = Array.from(gridItems).indexOf(target);
        if (index > 0) {
          const prevGridItem = gridItems[index - 1];
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
      })
    };

applyEventListeners();

function addAlphabets() {
  const alphabetsContainer = document.createElement("div");
  alphabetsContainer.classList.add("alphabets-container");

  gridContainer.after(alphabetsContainer);

  const alphabets = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

  for (let i = 0; i < alphabets.length; i++) {
    const alphabet = document.createElement("button");
    alphabet.classList.add("alphabet");
    alphabet.textContent = alphabets[i];
    alphabetsContainer.appendChild(alphabet);

    alphabet.addEventListener('click', () => {
      console.log("clicked");
      // target the next grid item that is empty
      const emptyGridItem = document.querySelector('.grid-item:empty');
      if (emptyGridItem) {
        emptyGridItem.textContent = alphabet.textContent;
        emptyGridItem.focus();
      }
      // move the cursor to the right of the current grid item
      const range = document.createRange();
      const selection = window.getSelection();
      const textNode = emptyGridItem.firstChild;
      if (textNode) {
        range.setStart(textNode, textNode.length); // Set the cursor at the end of the text
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    });
  }
}

addAlphabets();
