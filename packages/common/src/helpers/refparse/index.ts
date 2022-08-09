import { Verse } from '../../dm/Verse';

const bcv_parser = require('bible-passage-reference-parser/js/en_bcv_parser').bcv_parser;
const osisToEn = require('bible-reference-formatter/es6/en');

export interface OSISRange {
  startOsisString: string;
  endOsisString: string;
}

/**
 * Validates whether a Scripture reference is valid or not. Typically
 * will be used for **reference* strings (e.g. `Matthew 1:1`) but will
 * work for OSIS references as well (e.g. `Matt.1.1`).
 *
 * Wrapper over the `bible-passage-reference-parser` library, to make
 * it a simple Boolean instead of parsing OSIS strings.
 *
 * @param ref The reference to be checked
 * @returns Boolean indicator that the reference is valid
 */
export const isReferenceValid = (ref: string): boolean => {
  const bcv = new bcv_parser();
  bcv.set_options({
    osis_compaction_strategy: 'b',
    book_sequence_strategy: 'include',
    book_alone_strategy: 'full',
    book_range_strategy: 'include',
  });
  const osisString: string = bcv.parse(ref).osis();

  if (osisString.length > 0) {
    return true;
  }

  return false;
};

/**
 * Takes a reference (e.g. `Matthew 1:1`) and converts it to a machine-
 * friendly OSIS string (e.g. `Matt.1.1`). Although the intent is to
 * accept **references** instead of OSIS strings, OSIS strings will
 * still work; it won't do any harm.
 *
 * Wrapper over the `bible-passage-reference-parser` library, with a
 * couple of standard options supplied.
 *
 * @param ref The **reference** string
 * @returns The OSIS version of that passage reference
 */
export const getOSISForReference = (ref: string): string => {
  const bcv = new bcv_parser();
  bcv.set_options({
    osis_compaction_strategy: 'bcv',
    book_sequence_strategy: 'include',
    book_alone_strategy: 'full',
    book_range_strategy: 'include',
  });
  const osisString: string = bcv.parse(ref).osis();
  return osisString;
};

/**
 * Takes a machine-friendly OSIS string and converts it to a human-
 * readable string. The `includeVerses` parameter controls how to
 * handle an OSIS range that happens to cover an entire chapter,
 * such as the range `Gen.1.1-Gen.1.31` which covers Genesis Chapter
 * 1:
 *
 * * includeVerses true: result is `Genesis 1:1–31`
 * * includeVerses false: result is `Genesis 1`
 *
 * Simple wrapper over the `bible-reference-formatter` library.
 *
 * @param osisString String in OSIS format
 * @param includeVerses Indicates whether extra verses should be supplied (true) or not (false)
 * @returns String in human-readable reference format
 */
export const getReferenceForOSIS = (osisString: string, includeVerses: boolean = true): string => {
  if (includeVerses) {
    return osisToEn('esv-long', osisString);
  }

  const bcv = new bcv_parser();
  bcv.set_options({
    osis_compaction_strategy: 'bc',
    book_sequence_strategy: 'include',
    book_alone_strategy: 'full',
    book_range_strategy: 'include',
  });
  const newOsis = bcv.parse(osisString).osis();
  return osisToEn('esv-long', newOsis);
};

/**
 * Takes an array of `Verse` objects, pulls together all of their
 * OSIS strings, and generates a human-readable reference covering
 * that list. The list of verses may not be contiguous, so this
 * function doesn't assume they are; a comma-separated list may
 * very well be the result.
 *
 * @param verses Verses to check
 * @returns Human-readable reference covering the span of verses
 */
export const getRefForVerses = (verses: Verse[] | undefined): string => {
  if (verses === undefined || verses.length < 1) {
    return '';
  }

  let osis = '';
  for (let i = 0; i < verses.length; i++) {
    osis += verses[i].osis + ',';
  }

  return getReferenceForOSIS(getOSISForReference(osis));
};

/**
 * Takes an OSIS string, parses it out into ranges (based on commas
 * and dashes in the string), and generates a set of `OSISRange` objects
 * that can easily be used by other code.
 *
 * A range might consist of a single verse, in which case the start and
 * end OSIS will be the same.
 *
 * @param rawOsisString The initial string
 * @returns List of one or more `OSISRange` objects
 */
export const getRangesForOSIS = (rawOsisString: string): OSISRange[] => {
  if (!isReferenceValid(rawOsisString)) {
    return [];
  }

  const properlyFormattedOSIS = getOSISForReference(rawOsisString);

  const returnArray: OSISRange[] = [];
  const passageArray = properlyFormattedOSIS.split(',');

  for (let i = 0; i < passageArray.length; i++) {
    const rawRange = passageArray[i].split('-');

    const range: OSISRange = {
      startOsisString: rawRange[0],
      endOsisString: rawRange[rawRange.length - 1],
    };

    returnArray.push(range);
  }

  return returnArray;
};

/**
 * Wrapper over the `getRangesForOSIS` function, taking a reference
 * instead of an OSIS string.
 *
 * @param reference The initial reference string
 * @returns List of one or more `OSISRange` objects
 */
export const getPassagesForReference = (reference: string): OSISRange[] => {
  const osis = getOSISForReference(reference);

  return getRangesForOSIS(osis);
};

/**
 * Takes a reference or OSIS string and formats it into a human-readable
 * format.
 *
 * The `includeVerses` param works the same as for `getReferenceForOSIS`.
 *
 * @param osisOrRef Initial string; either a reference or an OSIS string will work
 * @param includeVerses Indicates whether extra verses should be supplied
 * @returns Human-reable formatted string
 */
export const getFormattedReference = (osisOrRef: string, includeVerses: boolean = true): string => {
  if (!isReferenceValid(osisOrRef)) {
    return '';
  }

  return getReferenceForOSIS(getOSISForReference(osisOrRef), includeVerses);
};
