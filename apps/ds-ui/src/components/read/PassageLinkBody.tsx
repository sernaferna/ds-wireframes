import React from 'react';
import {
  BasePassage,
  getReferenceForOSIS,
  OSISRange,
  getPassagesForReference,
  getFormattedReference,
} from '@devouringscripture/common';

const getLink = (ref: string, version: string): string => {
  return 'https://www.biblegateway.com/passage/?search=' + encodeURI(ref) + '&version=' + version;
};

interface IPassageLink {
  range: OSISRange;
  version: string;
  selected: boolean;
}
const PassageLink = ({ range, version, selected }: IPassageLink) => {
  const reference =
    range.startOsisString === range.endOsisString
      ? getReferenceForOSIS(range.startOsisString)
      : getReferenceForOSIS(range.startOsisString) + '-' + getReferenceForOSIS(range.endOsisString);
  const link = getLink(reference, version);

  return (
    <a className={selected ? 'link-light' : 'link-primary'} href={link} target="_blank" rel="noreferrer">
      {getFormattedReference(reference)}
    </a>
  );
};

interface IPassageLinkBody {
  passage: BasePassage;
  selected: boolean;
}

/**
 * Renders an appropriate view of a `BasePassage` object. Takes the
 * OSIS in the passage object, gets a list of ranges from that OSIS,
 * and, if there are more than one, renders them as a list.
 *
 * This component can be used in situations where the passage could
 * be **selected**, so this component can display itself differently
 * in that case.
 *
 * @param passage The `BasePassage` object to be rendered
 * @param selected Indicates if this passage is currently selected in the UI
 */
export const PassageLinkBody = ({ passage, selected }: IPassageLinkBody) => {
  const readablePassage = getFormattedReference(passage.osis);
  const passages: OSISRange[] = getPassagesForReference(readablePassage);

  const renderedPassages = passages.map((item, index) => (
    <li key={index}>
      <PassageLink range={item} version={passage.version} selected={selected} />
    </li>
  ));

  return (
    <>
      {passages.length > 1 ? (
        <ul>{renderedPassages}</ul>
      ) : (
        <PassageLink range={passages[0]} version={passage.version} selected={selected} />
      )}
    </>
  );
};
