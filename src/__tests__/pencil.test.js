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
  const pencil = createPencil({ durability: 10 });
  const text = 'How much will this write?';
  const result = pencil.write(paper, text);
  expect(result).toEqual('How much wi              ');
});

test('sharpening the pencil resets the durability to the initial value', () => {
  const paper = '';
  const pencil = createPencil({ durability: 20, length: 3 });
  pencil.write(paper, 'I want to write a lot to use up the graphite');
  expect(pencil.getDurability()).toEqual(0);
  pencil.sharpen();
  expect(pencil.getDurability()).toEqual(20);
});

test('sharpening the pencil when the length is 0 no longer restores durability', () => {
  const paper = '';
  const pencil = createPencil({ durability: 20, length: 2 });
  pencil.sharpen();
  pencil.sharpen();
  pencil.write(paper, 'Writing a little');
  pencil.sharpen();
  expect(pencil.getDurability()).toEqual(5);
});
