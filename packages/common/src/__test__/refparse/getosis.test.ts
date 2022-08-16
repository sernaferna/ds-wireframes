import { getOSISForReference } from '../../helpers/refparse/index';

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

  it('collapses commas', () => {
    expect(getOSISForReference('Matthew 1:1, Matthew 1:2')).toEqual('Matt.1.1-Matt.1.2');
  });

  it('handles more complex input', () => {
    expect(getOSISForReference('Gen 1:1, Genesis 1:2–3, Gen 1:4-Gen 1:5')).toEqual('Gen.1.1-Gen.1.5');
  });

  it('keeps non-contiguous commas', () => {
    expect(getOSISForReference('Gen 1:1, Genesis 1:2–3, Gen 2:4-Gen 2:5')).toEqual('Gen.1.1-Gen.1.3,Gen.2.4-Gen.2.5');
  });

  it('handles OSIS', () => {
    expect(getOSISForReference('Matt.1.1')).toEqual('Matt.1.1');
  });

  it('handles a verse with context', () => {
    expect(getOSISForReference('verse 16', 'John 3')).toEqual('John.3.16');
  });

  it('handles a chapter with context', () => {
    expect(getOSISForReference('chapter 3', 'John')).toEqual('John.3.1-John.3.36');
  });

  it('handles a verse outside a context chapter', () => {
    expect(getOSISForReference('verse 100', 'John 3')).toEqual('');
  });

  it('handles a chapter outside a context book', () => {
    expect(getOSISForReference('Chapter 100', 'John')).toEqual('');
  });
});
