import { QWERTY, ASDF, ZXCV } from "./constants.js";

function addAlphabets() {
  const buttonsContainer = document.querySelector('.buttons');
  const alphabetsContainer = document.createElement("div");
  alphabetsContainer.classList.add("alphabets-container");

  buttonsContainer.after(alphabetsContainer);

  function updateLayout() {
    const isSmallScreen = window.innerWidth < 600; // Check if the screen width is smaller than 600px

    const rows = isSmallScreen ? [ASDF, ZXCV] : [QWERTY, ASDF, ZXCV]; // Use different rows depending on the screen size

    alphabetsContainer.innerHTML = ''; // Clear the previous layout

    rows.forEach(row => {
      const rowContainer = document.createElement("div");
      rowContainer.classList.add("row-container");
      alphabetsContainer.appendChild(rowContainer);

      row.forEach(alphabet => {
        const alphabetButton = document.createElement("button");
        alphabetButton.classList.add("alphabet");
        alphabetButton.textContent = alphabet;
        rowContainer.appendChild(alphabetButton);

        alphabetButton.addEventListener('click', () => {
          // Target the next grid item that is empty
          const emptyGridItem = document.querySelector('.grid-item:empty');
          if (emptyGridItem) {
            emptyGridItem.textContent = alphabetButton.textContent;
            emptyGridItem.focus();

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
          }
        });
      });
    });
  }

  updateLayout(); // Initial layout setup

  window.addEventListener('resize', updateLayout); // Update layout on window resize
}

addAlphabets();
