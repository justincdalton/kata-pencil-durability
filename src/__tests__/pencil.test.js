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

test('erasing text replaces the last instance of the value with empty spaces', () => {
  const paper = 'some text is somehow out of place';
  const pencil = createPencil({ durability: 20, length: 2 });
  const result = pencil.erase(paper, 'some');
  expect(result).toEqual('some text is     how out of place');
});

test('erasing text that is not on the paper should return the original', () => {
  const paper = 'this is good text';
  const pencil = createPencil({ durability: 20, length: 2 });
  const result = pencil.erase(paper, 'not');
  expect(result).toEqual('this is good text');
});

test('erasing text when there is no eraser durability should leave the characters', () => {
  const paper = 'we should erase some of this';
  const pencil = createPencil({ durability: 20, eraserDurability: 3, length: 2 });
  const result = pencil.erase(paper, 'some');
  expect(result).toEqual('we should erase s    of this');
});

test('editing the paper fills in extra white space with text', () => {
  const paper = 'something is         here';
  const pencil = createPencil({ durability: 20, eraserDurability: 3, length: 2 });
  const result = pencil.edit(paper, 'missing');
  expect(result).toEqual('something is missing here');
});

test('editing the paper ignores the text if there is no space', () => {
  const paper = 'something is here';
  const pencil = createPencil({ durability: 20, eraserDurability: 3, length: 2 });
  const result = pencil.edit(paper, 'missing');
  expect(result).toEqual('something is here');
});

test('editing the paper with text that is larger than the whitespace inserts @ characters', () => {
  const paper = 'something is     at this spot';
  const pencil = createPencil({ durability: 20, eraserDurability: 3, length: 2 });
  const result = pencil.edit(paper, 'missing');
  expect(result).toEqual('something is miss@@gthis spot');
});

test('editing the paper with text with white space returns the current character', () => {
  const paper = 'something is    missing';
  const pencil = createPencil({ durability: 20, eraserDurability: 3, length: 2 });
  const result = pencil.edit(paper, 'not here');
  expect(result).toEqual('something is notm@@@@ng');
});
