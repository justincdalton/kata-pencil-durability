const createPencil = (input = {}) => {
  let { durability, eraserDurability, length } = input;
  const initialDurability = durability;

  const reduceDurability = (amount) => {
    durability -= amount;
  };

  const reduceEraserDurability = (amount) => {
    eraserDurability -= amount;
  };

  const processText = text => text.split('').reduce((prev, char) => {
    if (durability < 1 || char === ' ') return `${prev} `;

    if (char === char.toLowerCase()) {
      reduceDurability(1);
      return `${prev}${char}`;
    }

    reduceDurability(2);
    return `${prev}${char}`;
  }, '');

  const processErasure = text => text
    .split('')
    .reverse()
    .reduce((prev, char) => {
      if (eraserDurability < 1 || char === ' ') return `${char}${prev}`;

      reduceEraserDurability(1);
      return ` ${prev}`;
    }, '');

  const processEdit = (current, text) => text.split('').reduce((prev, char, index) => {
    const currentChar = current.charAt(index);

    if (currentChar !== ' ' && char !== ' ') {
      return `${prev}@`;
    }
    if (char === ' ') {
      return `${prev}${currentChar}`;
    }

    return `${prev}${char}`;
  }, '');

  return {
    write(paper, text) {
      const processedText = processText(text);

      return `${paper}${paper && ' '}${processedText}`;
    },
    getDurability: () => durability,
    sharpen() {
      if (length) {
        durability = initialDurability;
        length -= 1;
      }
    },
    erase(paper, text) {
      const index = paper.lastIndexOf(text);

      if (index < 0) return paper;

      const firstPart = paper.substring(0, index);
      const lastPart = paper.substring(index + text.length);
      const blankPart = processErasure(text);
      return `${firstPart}${blankPart}${lastPart}`;
    },
    edit(paper, text) {
      const index = paper.indexOf('  ');

      if (index < 0) return paper;

      const shiftedIndex = index + 1;

      const firstPart = paper.substring(0, shiftedIndex);
      const middlePart = paper.substring(shiftedIndex, shiftedIndex + text.length);
      const lastPart = paper.substring(shiftedIndex + text.length);
      const processedText = processText(text);
      const editedPart = processEdit(middlePart, processedText);
      return `${firstPart}${editedPart}${lastPart}`;
    },
  };
};

module.exports = createPencil;
