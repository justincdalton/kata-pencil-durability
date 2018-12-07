const createPencil = () => ({
  write(paper, text) {
    return `${paper}${paper && ' '}${text}`;
  },
});

module.exports = createPencil;
