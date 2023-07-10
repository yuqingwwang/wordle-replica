function addAlphabets() {
  const buttonsContainer = document.querySelector('.buttons');
  const alphabetsContainer = document.createElement("div");
  alphabetsContainer.classList.add("alphabets-container");

  buttonsContainer.after(alphabetsContainer);

  const qwerty = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
  const asdf = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
  const zxcv = ['Z', 'X', 'C', 'V', 'B', 'N', 'M'];

  const rows = [qwerty, asdf, zxcv];

  function populate(array) {
    const rowContainer = document.createElement("div");
    rowContainer.classList.add("row-container");
    alphabetsContainer.appendChild(rowContainer);

    for (let i = 0; i < array.length; i++) {
      const alphabet = document.createElement("button");
      alphabet.classList.add("alphabet");
      alphabet.textContent = array[i];
      rowContainer.appendChild(alphabet);

      alphabet.addEventListener('click', () => {
        // Target the next grid item that is empty
        const emptyGridItem = document.querySelector('.grid-item:empty');
        if (emptyGridItem) {
          emptyGridItem.textContent = alphabet.textContent;
          emptyGridItem.focus();
        }
        // Move the cursor to the right of the current grid item
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

  rows.forEach(row => {
    populate(row);
  });
}

addAlphabets();
