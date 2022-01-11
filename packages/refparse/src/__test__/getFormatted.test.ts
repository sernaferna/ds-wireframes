import { getFormattedPassageRef } from '../index';

describe('get formatted test suite', () => {
  it('handles OSIS', () => {
    const formatted = getFormattedPassageRef('Gen.1.1');

    expect(formatted).toEqual('Genesis 1:1');
  });

  it('handles readable', () => {
    const formatted = getFormattedPassageRef('Genesis 1:1');

    expect(formatted).toEqual('Genesis 1:1');
  });

  it('handles OSIS multipassage', () => {
    const formatted = getFormattedPassageRef('Gen.1.1-Gen.1.2');

    expect(formatted).toEqual('Genesis 1:1–2');
  });

  it('handles readable multipassage', () => {
    let formatted = getFormattedPassageRef('Genesis 1:1-2');
    expect(formatted).toEqual('Genesis 1:1–2');

    formatted = getFormattedPassageRef('Genesis 1:1-1:2');
    expect(formatted).toEqual('Genesis 1:1–2');
  });
});
