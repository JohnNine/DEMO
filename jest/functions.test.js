import functions from './functions'
const {
  add
} = functions
// toBe
test('Adds 2 + 2 to equal 4', () => {
  expect(add(2, 2)).toBe(4)
})
// not
test('Adds 2 + 2 to NOT equal 5', () => {
  expect(functions.add(2, 2)).not.toBe(5);
});