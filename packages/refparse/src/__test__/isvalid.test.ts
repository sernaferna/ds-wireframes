import { isReferenceValid } from '..';

describe('isValid test suite', () => {
  it('returns true for valid verse', () => {
    expect(isReferenceValid('Rev 1:1')).toBeTruthy();
  });

  it('returns true for valid passage', () => {
    expect(isReferenceValid('Rev 1:1-19')).toBeTruthy();
  });

  it('returns true for valid passage spanning books', () => {
    expect(isReferenceValid('Luke 24:1-John 1:1')).toBeTruthy();
  });

  it('returns false for a non-existant book', () => {
    expect(isReferenceValid('Blah 1:1')).toBeFalsy();
  });

  it('returns false for a non-existant chapter', () => {
    expect(isReferenceValid('James 6:1')).toBeFalsy();
  });

  it('returns false for a non-existant verse', () => {
    expect(isReferenceValid('Jude 30')).toBeFalsy();
  });

  it('returns true for just a book', () => {
    expect(isReferenceValid('Gen')).toBeTruthy();
  });
});
