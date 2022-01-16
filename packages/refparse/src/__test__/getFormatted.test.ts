import { getFormattedReference } from '../index';

describe('get formatted test suite', () => {
  it('handles OSIS', () => {
    const formatted = getFormattedReference('Gen.1.1');

    expect(formatted).toEqual('Genesis 1:1');
  });

  it('handles readable', () => {
    const formatted = getFormattedReference('Genesis 1:1');

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
});
