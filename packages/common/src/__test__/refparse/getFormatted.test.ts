import { getFormattedReference } from '../../helpers/refparse/index';

describe('get formatted test suite', () => {
  it('handles OSIS', () => {
    const formatted = getFormattedReference('Gen.1.1');

    expect(formatted).toEqual('Genesis 1:1');
  });

  it('handles readable', () => {
    const formatted = getFormattedReference('Genesis 1:1');

    expect(formatted).toEqual('Genesis 1:1');
  });

  it('handles readable with context', () => {
    const formatted = getFormattedReference('verse 1', true, 'Genesis 1');

    expect(formatted).toEqual('Genesis 1:1');
  });

  it('handles OSIS multipassage', () => {
    const formatted = getFormattedReference('Gen.1.1-Gen.1.2');

    expect(formatted).toEqual('Genesis 1:1–2');
  });

  it('handles readable multipassage', () => {
    let formatted = getFormattedReference('Genesis 1:1-2');
    expect(formatted).toEqual('Genesis 1:1–2');

    formatted = getFormattedReference('Genesis 1:1-1:2');
    expect(formatted).toEqual('Genesis 1:1–2');
  });

  it('handles readable multipassage with context', () => {
    let formatted = getFormattedReference('verses 1-2', true, 'Genesis 1');
    expect(formatted).toEqual('Genesis 1:1–2');

    formatted = getFormattedReference('1:1-1:2', true, 'Genesis 1');
    expect(formatted).toEqual('Genesis 1:1–2');
  });

  it('converts multiple comma-separated into single ref', () => {
    const formatted = getFormattedReference('Gen.1.1,Gen.1.2');

    expect(formatted).toEqual('Genesis 1:1–2');
  });

  it('handles a complex set of ranges and commas', () => {
    const formatted = getFormattedReference('Gen.1.1, Gen.1.2–Gen.1.3, Gen.1.4-5');

    expect(formatted).toEqual('Genesis 1:1–5');
  });

  it('keeps non-contiguous commas', () => {
    const formatted = getFormattedReference('Gen.1.1-Gen.1.3,Gen.2.4-Gen.2.5');

    expect(formatted).toEqual('Genesis 1:1–3; 2:4–5');
  });

  it('properly handles invalid references', () => {
    const formatted = getFormattedReference('blah blah blah');

    expect(formatted).toEqual('');
  });

  it('properly handles invalid OSIS strings', () => {
    const formatted = getFormattedReference('Blah.1.1');

    expect(formatted).toEqual('');
  });

  it('returns verse range when ref is to the chapter level', () => {
    const formatted = getFormattedReference('Rom 1');

    expect(formatted).toEqual('Romans 1:1–32');
  });

  it('returns verse range when ref is to the chapter level with context', () => {
    const formatted = getFormattedReference('Chapter 1', true, 'Romans');

    expect(formatted).toEqual('Romans 1:1–32');
  });

  it('does not return verse range when ref is to the chapter level but false is passed to verse param', () => {
    const formatted = getFormattedReference('Rom 1', false);

    expect(formatted).toEqual('Romans 1');
  });

  it('does not return verse range when ref is to the chapter level but false is passed to verse param with context', () => {
    const formatted = getFormattedReference('chapter 1', false, 'Rom');

    expect(formatted).toEqual('Romans 1');
  });

  it('does not return chapters for a range of chapters in a book', () => {
    const formatted = getFormattedReference('Gen', false);

    expect(formatted).toEqual('Genesis 1—50');
  });

  it('still includes verses when a ref includes only part of a chapter', () => {
    const formatted = getFormattedReference('Rom 1:1-5', false);

    expect(formatted).toEqual('Romans 1:1–5');
  });

  it('still includes verses when a ref includes only part of a chapter with context', () => {
    const formatted = getFormattedReference('verses 1-5', false, 'rom 1');

    expect(formatted).toEqual('Romans 1:1–5');
  });
});
