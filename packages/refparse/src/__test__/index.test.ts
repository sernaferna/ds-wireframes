import { isPassageRefValid, getOSISForRef, getRefForOSIS } from '..';

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

describe('get OSIS test suite', () => {
  it('handles regular verse', () => {
    expect(getOSISForRef('Rev 1:1')).toEqual('Rev.1.1');
  });

  it('handles passage', () => {
    expect(getOSISForRef('Rev 1:1-19')).toEqual('Rev.1.1-Rev.1.19');
  });

  it('handles passage spanning books', () => {
    expect(getOSISForRef('Luke 24:1-John 1:1')).toEqual('Luke.24.1-John.1.1');
  });

  it('returns nothing for non-existant book', () => {
    expect(getOSISForRef('Blah 1:1')).toEqual('');
  });

  it('returns nothing for non-existant chapter', () => {
    expect(getOSISForRef('James 6:1')).toEqual('');
  });

  it('returns nothing for non-existant verse', () => {
    expect(getOSISForRef('Jude 30')).toEqual('');
  });
});

describe('get ref from OSIS test suite', () => {
  it('handles regular verse', () => {
    expect(getRefForOSIS('Rev.1.1')).toEqual('Revelation 1:1');
  });

  it('handles passage', () => {
    expect(getRefForOSIS('Rev.1.1-Rev.1.19')).toEqual('Revelation 1:1–19');
  });

  it('handles passage spanning books', () => {
    expect(getRefForOSIS('Luke.24.1-John.1.1')).toEqual('Luke 24:1—John 1:1');
  });

  it('throws error for non-existant book', () => {
    expect(() => {
      getRefForOSIS('blah.1.1');
    }).toThrowError();
  });

  it('throws error for non-existant chapter', () => {
    expect(() => {
      getRefForOSIS('Jam.6.1');
    }).toThrowError();
  });

  it('throws error for non-existant verse', () => {
    expect(() => {
      getRefForOSIS('jude.30');
    }).toThrowError();
  });
});
