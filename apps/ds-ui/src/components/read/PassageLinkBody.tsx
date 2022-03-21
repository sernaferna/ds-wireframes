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

interface PassageLinkInterface {
  range: OSISRange;
  version: string;
  selected: boolean;
}
const PassageLink = ({ range, version, selected }: PassageLinkInterface) => {
  const reference =
    range.startOsisString === range.endOsisString
      ? getReferenceForOSIS(range.startOsisString)
      : getReferenceForOSIS(range.startOsisString) + '-' + getReferenceForOSIS(range.endOsisString);
  const link = getLink(reference, version);

  return (
    <a
      className={selected ? 'passage-link-selected' : 'passage-link-unselected'}
      href={link}
      target="_blank"
      rel="noreferrer"
    >
      {getFormattedReference(reference)}
    </a>
  );
};

interface PassageLinkBodyInterface {
  passage: BasePassage;
  selected: boolean;
}
export const PassageLinkBody = ({ passage, selected }: PassageLinkBodyInterface) => {
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
