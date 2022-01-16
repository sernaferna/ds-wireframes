import { getOSISForReference } from '../index';

describe('get OSIS test suite', () => {
  it('handles regular verse', () => {
    expect(getOSISForReference('Rev 1:1')).toEqual('Rev.1.1');
  });

  it('handles passage', () => {
    expect(getOSISForReference('Rev 1:1-19')).toEqual('Rev.1.1-Rev.1.19');
  });

  it('handles passage spanning books', () => {
    expect(getOSISForReference('Luke 24:1-John 1:1')).toEqual('Luke.24.1-John.1.1');
  });

  it('returns nothing for non-existant book', () => {
    expect(getOSISForReference('Blah 1:1')).toEqual('');
  });

  it('returns nothing for non-existant chapter', () => {
    expect(getOSISForReference('James 6:1')).toEqual('');
  });

  it('returns nothing for non-existant verse', () => {
    expect(getOSISForReference('Jude 30')).toEqual('');
  });
});
