import { getAllRefsFromString, RefFromStringResult } from '../../helpers/refparse';

describe('Test Suite for getting all strings from OSIS', () => {
  it('handles a simple string with a ref', async () => {
    const result: RefFromStringResult[] = getAllRefsFromString('Mark 1:1');

    expect(result).toHaveLength(1);
    expect(result[0].osis).toEqual('Mark.1.1');
    expect(result[0].indices[0]).toEqual(0);
    expect(result[0].indices[1]).toEqual(7);
  });

  it('handles a string with context', async () => {
    const result: RefFromStringResult[] = getAllRefsFromString('verse 1', 'Mark 1');

    expect(result).toHaveLength(1);
    expect(result[0].osis).toEqual('Mark.1.1');
    expect(result[0].indices[0]).toEqual(0);
    expect(result[0].indices[1]).toEqual(6);
  });

  it('handles multiple verses', async () => {
    const result: RefFromStringResult[] = getAllRefsFromString('Mark 1:1 and John 5:6');

    expect(result).toHaveLength(2);
    expect(result[0].osis).toEqual('Mark.1.1');
    expect(result[0].indices[0]).toEqual(0);
    expect(result[0].indices[1]).toEqual(7);

    expect(result[1].osis).toEqual('John.5.6');
    expect(result[1].indices[0]).toEqual(13);
    expect(result[1].indices[1]).toEqual(20);
  });

  it('handles multiple verses with context', async () => {
    const result: RefFromStringResult[] = getAllRefsFromString('verses 1 and 5', 'Mark 1');

    expect(result).toHaveLength(2);
    expect(result[0].osis).toEqual('Mark.1.1');
    expect(result[0].indices[0]).toEqual(0);
    expect(result[0].indices[1]).toEqual(7);

    expect(result[1].osis).toEqual('Mark.1.5');
    expect(result[1].indices[0]).toEqual(13);
    expect(result[1].indices[1]).toEqual(13);
  });

  it('handles ampersands', async () => {
    const result: RefFromStringResult[] = getAllRefsFromString('v. 1 &  v.5', 'Mark 1');

    expect(result).toHaveLength(2);
    expect(result[0].osis).toEqual('Mark.1.1');
    expect(result[0].indices[0]).toEqual(0);
    expect(result[0].indices[1]).toEqual(3);

    expect(result[1].osis).toEqual('Mark.1.5');
    expect(result[1].indices[0]).toEqual(8);
    expect(result[1].indices[1]).toEqual(10);
  });
});
