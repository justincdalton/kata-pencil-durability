const createPencil = require('../create-pencil');

test('the pencil can write on a blank paper', () => {
  const paper = '';
  const pencil = createPencil();
  const text = 'Here is some new text';
  const result = pencil.write(paper, text);
  expect(result).toEqual('Here is some new text');
});

test('the pencil can write additional text on paper with existing text', () => {
  const paper = 'This paper has some text on it';
  const pencil = createPencil();
  const text = 'and I want to add some more';
  const result = pencil.write(paper, text);
  expect(result).toEqual('This paper has some text on it and I want to add some more');
});
