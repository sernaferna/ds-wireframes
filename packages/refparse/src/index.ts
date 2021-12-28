const bcv_parser = require('bible-passage-reference-parser/js/en_bcv_parser').bcv_parser;
const osisToEn = require('bible-reference-formatter/es6/en');

export const isPassageRefValid = (ref: string): boolean => {
  const osisString: string = getOSISForRef(ref);
  if (osisString.length > 0) {
    return true;
  }

  return false;
};

export const getOSISForRef = (ref: string): string => {
  const bcv = new bcv_parser();
  const osisString: string = bcv.parse(ref).osis();
  return osisString;
};

export const getRefForOSIS = (osisString: string): string => {
  return osisToEn('esv-long', osisString);
};

// export const isRefInRef = (containingRef: string, containedRef: string): boolean => {
//   return true;
// };

// export const isOSISInOSIS = (containingOSIS: string, containedOSIS: string): boolean => {
//   return true;
// };
