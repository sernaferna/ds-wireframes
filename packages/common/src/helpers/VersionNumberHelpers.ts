const gt = require('semver/functions/gt');
const valid = require('semver/functions/valid');

/**
 * Helper function to do a semantic check that a version number is
 * valid (according to `X.X.X` format: `Major.Minor.Patch`).
 *
 * Leverages `semver` under the covers; this is just a simple wrapper.
 *
 * @param versionNumber The string (Maj.Min.Patch) number to be checked
 * @returns Boolean validity indicator
 */
export const isVersionValid = (versionNumber: string) => {
  return valid(versionNumber);
};

/**
 * Helper function to determine whether one ** version number** is
 * larger than another; typically used when incrementing a version
 * number, to verify that the new number is actually larger than the
 * old one.
 *
 * Leverages `semver` under the covers; this is just a simple wrapper.
 *
 * @param version2String The new version number
 * @param version1String The previous version number
 * @returns `True` if the new number is greater, `false` otherwise
 */
export const v2GTV1 = (version2String: string, version1String: string): boolean => {
  return gt(version2String, version1String);
};
