const gridContainer = document.getElementById("gridContainer");

for (let i = 0; i < 15; i++) {
  const gridItem = document.createElement("div");
  gridItem.setAttribute("contenteditable", "true");
  gridItem.classList.add("grid-item");
  gridContainer.appendChild(gridItem);
}

const gridItems = document.querySelectorAll('.grid-item');

gridItems.forEach((gridItem, index) => {
  const fontSize = parseInt(window.getComputedStyle(gridItem).height) + 'px';
  let newSize = fontSize.split('px')[0] * 0.8;
  gridItem.style.fontSize = newSize + 'px';

  gridItem.addEventListener('input', (event) => {
    const text = gridItem.textContent.trim().toUpperCase();
    gridItem.textContent = text.slice(0, 1);

    if (index < gridItems.length - 1) {
      gridItems[index + 1].focus();
    } else {
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


// placing cursor at the first tile when the page loads
gridItems[0].focus();

