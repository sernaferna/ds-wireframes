import { getOSISForReference } from './refparse';

/**
 * Helper function that takes a start ref and an end ref and returns
 * a string representing them as a range. Just inserts a dash between
 * but used often enough to warrant a helper.
 *
 * @param startRef Beginning of the reference
 * @param endRef End of the reference
 * @returns String with a range for the context
 */
export const getContextForPassage = (startRef: string, endRef: string): string => {
  return getOSISForReference(startRef) + '-' + getOSISForReference(endRef);
};
