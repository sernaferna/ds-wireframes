import { getRangesForOSIS, OSISRange, getPassagesForReference } from '../../helpers/refparse/index';

describe('Get Passages tests for OSIS strings', () => {
  it('handles a single verse', () => {
    const bounds: OSISRange[] = getRangesForOSIS('Gen.1.1');

    expect(bounds.length).toEqual(1);
    expect(bounds[0].startOsisString).toEqual('Gen.1.1');
    expect(bounds[0].endOsisString).toEqual('Gen.1.1');
  });

  it('handles a simple passage', () => {
    const bounds: OSISRange[] = getRangesForOSIS('Gen.1.1-Gen.1.2');

    expect(bounds.length).toEqual(1);
    expect(bounds[0].startOsisString).toEqual('Gen.1.1');
    expect(bounds[0].endOsisString).toEqual('Gen.1.2');
  });

  it('handles a simple but long passage', () => {
    const bounds: OSISRange[] = getRangesForOSIS('Gen.1.1-Gen.50.1');

    expect(bounds.length).toEqual(1);
    expect(bounds[0].startOsisString).toEqual('Gen.1.1');
    expect(bounds[0].endOsisString).toEqual('Gen.50.1');
  });

  it('handles a passage spanning multiple books', () => {
    const bounds: OSISRange[] = getRangesForOSIS('Gen.1.1-Exod.5.1');

    expect(bounds.length).toEqual(1);
    expect(bounds[0].startOsisString).toEqual('Gen.1.1');
    expect(bounds[0].endOsisString).toEqual('Exod.5.1');
  });

  it('handles multiple passages separated by commas', () => {
    const bounds: OSISRange[] = getRangesForOSIS('Gen.1.1-Exod.2.1,Rom.1.1-Rom.5.6');

    expect(bounds.length).toEqual(2);
    expect(bounds[0].startOsisString).toEqual('Gen.1.1');
    expect(bounds[0].endOsisString).toEqual('Exod.2.1');

    expect(bounds[1].startOsisString).toEqual('Rom.1.1');
    expect(bounds[1].endOsisString).toEqual('Rom.5.6');
  });

  it('returns nothing for an invalid ref', () => {
    const bounds: OSISRange[] = getRangesForOSIS('blah');

    expect(bounds.length).toEqual(0);
  });

  it('returns nothing for a complicated invalid ref', () => {
    const bounds: OSISRange[] = getRangesForOSIS('blah.1.1-verge.6.3');

    expect(bounds.length).toEqual(0);
  });

  it('returns a range of the entire book when just the book name is specified', () => {
    const bounds: OSISRange[] = getRangesForOSIS('Gen');

    expect(bounds.length).toEqual(1);
    expect(bounds[0].startOsisString).toEqual('Gen.1.1');
    expect(bounds[0].endOsisString).toEqual('Gen.50.26');
  });
});

describe('Get Passages tests for passage ref strings', () => {
  it('handles a single verse', () => {
    const bounds: OSISRange[] = getPassagesForReference('Genesis 1:1');

    expect(bounds.length).toEqual(1);
    expect(bounds[0].startOsisString).toEqual('Gen.1.1');
    expect(bounds[0].endOsisString).toEqual('Gen.1.1');
  });

  it('handles a simple passage', () => {
    const bounds: OSISRange[] = getPassagesForReference('Genesis 1:1-2');

    expect(bounds.length).toEqual(1);
    expect(bounds[0].startOsisString).toEqual('Gen.1.1');
    expect(bounds[0].endOsisString).toEqual('Gen.1.2');
  });

  it('handles a simple but long passage', () => {
    const bounds: OSISRange[] = getPassagesForReference('Genesis 1-50:1');

    expect(bounds.length).toEqual(1);
    expect(bounds[0].startOsisString).toEqual('Gen.1.1');
    expect(bounds[0].endOsisString).toEqual('Gen.50.1');
  });

  it('handles a passage spanning multiple books', () => {
    const bounds: OSISRange[] = getPassagesForReference('Genesis 1-Exodus 5:1');

    expect(bounds.length).toEqual(1);
    expect(bounds[0].startOsisString).toEqual('Gen.1.1');
    expect(bounds[0].endOsisString).toEqual('Exod.5.1');
  });

  it('handles multiple passages separated by commas', () => {
    const bounds: OSISRange[] = getPassagesForReference('Genesis 1-Exodus 2:1,Romans 1-5:6');

    expect(bounds.length).toEqual(2);
    expect(bounds[0].startOsisString).toEqual('Gen.1.1');
    expect(bounds[0].endOsisString).toEqual('Exod.2.1');

    expect(bounds[1].startOsisString).toEqual('Rom.1.1');
    expect(bounds[1].endOsisString).toEqual('Rom.5.6');
  });

  it('returns nothing for an invalid ref', () => {
    const bounds: OSISRange[] = getPassagesForReference('blah');

    expect(bounds.length).toEqual(0);
  });

  it('returns nothing for a complicated invalid ref', () => {
    const bounds: OSISRange[] = getPassagesForReference('blah 1:1-verge 6:3');

    expect(bounds.length).toEqual(0);
  });

  it('returns a range of the entire book when just the book name is specified', () => {
    const bounds: OSISRange[] = getPassagesForReference('Genesis');

    expect(bounds.length).toEqual(1);
    expect(bounds[0].startOsisString).toEqual('Gen.1.1');
    expect(bounds[0].endOsisString).toEqual('Gen.50.26');
  });
});
