import { getReferenceForOSIS } from '../../helpers/refparse/index';

describe('get ref from OSIS test suite', () => {
  it('handles regular verse', () => {
    expect(getReferenceForOSIS('Rev.1.1')).toEqual('Revelation 1:1');
  });

  it('handles passage', () => {
    expect(getReferenceForOSIS('Rev.1.1-Rev.1.19')).toEqual('Revelation 1:1–19');
  });

  it('handles passage spanning books', () => {
    expect(getReferenceForOSIS('Luke.24.1-John.1.1')).toEqual('Luke 24:1—John 1:1');
  });

  it('simplifies down to the chapter level when indicated', () => {
    expect(getReferenceForOSIS('Gen.1.1-Gen.1.31', false)).toEqual('Genesis 1');
  });

  it('does not simplify down to the chapter level when not indicated', () => {
    expect(getReferenceForOSIS('Gen.1.1-Gen.1.31', true)).toEqual('Genesis 1:1–31');
  });

  it('throws error for non-existant book', () => {
    expect(() => {
      getReferenceForOSIS('blah.1.1');
    }).toThrowError();
  });

  it('throws error for non-existant chapter', () => {
    expect(() => {
      getReferenceForOSIS('Jam.6.1');
    }).toThrowError();
  });

  it('throws error for non-existant verse', () => {
    expect(() => {
      getReferenceForOSIS('jude.30');
    }).toThrowError();
  });
});
