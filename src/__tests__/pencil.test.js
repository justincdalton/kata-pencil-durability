const createPencil = require('../create-pencil');

test('the pencil writes on a blank paper', () => {
  const paper = '';
  const pencil = createPencil();
  const text = 'Here is some new text';
  const result = pencil.write(paper, text);
  expect(result).toEqual('Here is some new text');
});

test('the pencil writes additional text on paper with existing text', () => {
  const paper = 'This paper has some text on it';
  const pencil = createPencil();
  const text = 'and I want to add some more';
  const result = pencil.write(paper, text);
  expect(result).toEqual('This paper has some text on it and I want to add some more');
});

test('the pencil writes blank spaces when it runs out of durability', () => {
  const paper = '';
  const pencil = createPencil({
    durability: 10,
  });
  const text = 'How much will this write?';
  const result = pencil.write(paper, text);
  expect(result).toEqual('How much wi              ');
});
