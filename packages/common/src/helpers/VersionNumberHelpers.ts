const gt = require('semver/functions/gt');
const valid = require('semver/functions/valid');

export const isVersionValid = (versionNumber: string) => {
  return valid(versionNumber);
};

export const v2GTV1 = (version2String: string, version1String: string): boolean => {
  return gt(version2String, version1String);
};
