const gridContainer = document.getElementById("gridContainer");
const alphabetsContainer = document.createElement("div");
alphabetsContainer.classList.add("alphabets-container");

const alphabets = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

for (let i = 0; i < 5; i++) {
  const gridItem = document.createElement("div");
  gridItem.setAttribute("contenteditable", "true");
  gridItem.classList.add("grid-item");
  gridContainer.appendChild(gridItem);
}

gridContainer.after(alphabetsContainer);

const gridItems = document.querySelectorAll('.grid-item');

gridItems.forEach((gridItem, index) => {

  gridItem.addEventListener('input', (event) => {
    const text = gridItem.textContent.trim().toUpperCase();
    const alphabeticText = text.replace(/[^A-Z]/g, '');
    gridItem.textContent = alphabeticText.slice(0, 1);

    if (gridItem.textContent.length === 0) {
      gridItem.focus();
    }
    else if (index < gridItems.length - 1) {
      gridItems[index + 1].focus();
    }
    else {
      const range = document.createRange();
      const selection = window.getSelection();
      const textNode = gridItem.firstChild;
      if (textNode) {
        range.setStart(textNode, textNode.length); // Set the cursor at the end of the text
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  });

  gridItem.addEventListener('keydown', (e) => {
    if (e.key === 'Backspace' && gridItem.textContent.length === 0) {
      e.preventDefault();

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
    }
  });
});

// Placing cursor at the first tile when the page loads
gridItems[0].focus();

for (let i = 0; i < alphabets.length; i++) {
  const alphabet = document.createElement("button");
  alphabet.classList.add("alphabet");
  alphabet.textContent = alphabets[i];
  alphabetsContainer.appendChild(alphabet);

  alphabet.addEventListener('click', () => {
    console.log("clicked")
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
})};
