import { getRefForOSIS } from '..';

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
