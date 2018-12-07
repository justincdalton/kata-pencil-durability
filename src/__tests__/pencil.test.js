const createPencil = require('../create-pencil');

test('the pencil can write on a blank paper', () => {
  const paper = '';
  const pencil = createPencil();
  const text = 'Here is some new text';
  const result = pencil.write(paper, text);
  expect(result).toEqual(text);
});
