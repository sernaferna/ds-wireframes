import { getOSISForRef } from '../index';

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
