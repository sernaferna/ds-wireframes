import { getRefForVerses } from '../../helpers/refparse/index';
import { Verse } from '../../dm/Verse';

describe('getOSISForVerses tests', () => {
  it('handles undefined', () => {
    const osis = getRefForVerses(undefined);

    expect(osis).toEqual('');
  });

  it('handles 0 verses', () => {
    const verses: Verse[] = [];
    const ref = getRefForVerses(verses);

    expect(ref).toEqual('');
  });

  it('handles 1 verse', () => {
    const verses: Verse[] = [{ versenum: 1, osis: 'Gen.1.1', apocrypha: false, newTestament: false }];
    const ref = getRefForVerses(verses);

    expect(ref).toEqual('Genesis 1:1');
  });

  it('handles contiguous verses', () => {
    const verses: Verse[] = [
      { versenum: 1, osis: 'Gen.1.1', apocrypha: false, newTestament: false },
      { versenum: 2, osis: 'Gen.1.2', apocrypha: false, newTestament: false },
    ];
    const ref = getRefForVerses(verses);

    expect(ref).toEqual('Genesis 1:1–2');
  });

  it('handles non-contiguous verses', () => {
    const verses: Verse[] = [
      { versenum: 1, osis: 'Gen.1.1', apocrypha: false, newTestament: false },
      { versenum: 10, osis: 'Gen.1.10', apocrypha: false, newTestament: false },
    ];
    const ref = getRefForVerses(verses);

    expect(ref).toEqual('Genesis 1:1, 10');
  });
});
