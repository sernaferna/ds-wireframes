import { Verse } from '@devouringscripture/common';

const bcv_parser = require('bible-passage-reference-parser/js/en_bcv_parser').bcv_parser;
const osisToEn = require('bible-reference-formatter/es6/en');

export interface OSISRange {
  startOsisString: string;
  endOsisString: string;
}

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

export const getReferenceForOSIS = (osisString: string): string => {
  return osisToEn('esv-long', osisString);
};

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

export const getPassagesForReference = (reference: string): OSISRange[] => {
  const osis = getOSISForReference(reference);

  return getRangesForOSIS(osis);
};

export const getFormattedReference = (osisOrRef: string): string => {
  return getReferenceForOSIS(getOSISForReference(osisOrRef));
};
