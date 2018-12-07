const createPencil = (input = {}) => {
  let { durability } = input;

  const reduceDurability = (amount) => {
    durability -= amount;
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

  return {
    write(paper, text) {
      const processedText = processText(text);

      return `${paper}${paper && ' '}${processedText}`;
    },
  };
};

module.exports = createPencil;
