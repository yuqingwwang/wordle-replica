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

addAlphabets();
