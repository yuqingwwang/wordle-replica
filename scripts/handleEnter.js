const enterButton = document.querySelector('.enter-button');
enterButton.addEventListener('click', () => {
  // Check if all the grid items are filled
  const gridItems = document.querySelectorAll('.grid-item');
  const isGridFilled = Array.from(gridItems).every(gridItem => gridItem.textContent.length > 0);
  if (isGridFilled) {
    // Get the text from the grid items in the last 5 grid items
    const text = Array.from(gridItems).slice(-5).map(gridItem => gridItem.textContent);
    console.log(text);
    generateRow();
  }
});
