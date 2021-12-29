import { isPassageRefValid } from '..';

describe('isValid test suite', () => {
  it('returns true for valid verse', () => {
    expect(isPassageRefValid('Rev 1:1')).toBeTruthy();
  });

  it('returns true for valid passage', () => {
    expect(isPassageRefValid('Rev 1:1-19')).toBeTruthy();
  });

  it('returns true for valid passage spanning books', () => {
    expect(isPassageRefValid('Luke 24:1-John 1:1')).toBeTruthy();
  });

  it('returns false for a non-existant book', () => {
    expect(isPassageRefValid('Blah 1:1')).toBeFalsy();
  });

  it('returns false for a non-existant chapter', () => {
    expect(isPassageRefValid('James 6:1')).toBeFalsy();
  });

  it('returns false for a non-existant verse', () => {
    expect(isPassageRefValid('Jude 30')).toBeFalsy();
  });
});
