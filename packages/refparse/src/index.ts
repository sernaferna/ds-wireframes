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

export interface PassageBounds {
  startOsisString: string;
  endOsisString: string;
}
export const getPassagesForOSIS = (rawOsisString: string): PassageBounds[] => {
  if (!isPassageRefValid(rawOsisString)) {
    return [];
  }

  const returnArray: PassageBounds[] = [];
  const passageArray = rawOsisString.split(',');
  for (let i = 0; i < passageArray.length; i++) {
    const rawBounds = passageArray[i].split('-');
    const bounds: PassageBounds = {
      startOsisString: rawBounds[0],
      endOsisString: rawBounds[rawBounds.length - 1],
    };
    returnArray.push(bounds);
  }

  return returnArray;
};

export const getPassagesForPassageRef = (passageRef: string): PassageBounds[] => {
  const osis = getOSISForRef(passageRef);

  return getPassagesForOSIS(osis);
};
