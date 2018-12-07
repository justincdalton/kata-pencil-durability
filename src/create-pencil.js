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

    if (char === char.toUpperCase()) {
      reduceDurability(2);
      return `${prev}${char}`;
    }

    return prev;
  }, '');

  const processErasure = text => text
    .split('')
    .reverse()
    .reduce((prev, char) => {
      if (eraserDurability < 1 || char === ' ') return `${char}${prev}`;

      reduceEraserDurability(1);
      return ` ${prev}`;
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

      const firstPart = paper.substring(0, index);
      const lastPart = paper.substring(index).trim();
      const processedText = processText(text);
      return `${firstPart} ${processedText} ${lastPart}`;
    },
  };
};

module.exports = createPencil;
