import React from 'react';
import { BasePassage } from '@devouringscripture/common';
import {
  getReferenceForOSIS,
  OSISRange,
  getPassagesForReference,
  getFormattedReference,
} from '@devouringscripture/refparse';

const getLink = (ref: string, version: string): string => {
  return 'https://www.biblegateway.com/passage/?search=' + encodeURI(ref) + '&version=' + version;
};

interface PassageLinkInterface {
  bounds: OSISRange;
  version: string;
  selected: boolean;
}
const PassageLink = ({ bounds, version, selected }: PassageLinkInterface) => {
  const passage =
    bounds.startOsisString === bounds.endOsisString
      ? getReferenceForOSIS(bounds.startOsisString)
      : getReferenceForOSIS(bounds.startOsisString) + '-' + getReferenceForOSIS(bounds.endOsisString);
  const link = getLink(passage, version);

  return (
    <a
      className={selected ? 'passage-link-selected' : 'passage-link-unselected'}
      href={link}
      target="_blank"
      rel="noreferrer"
    >
      {getFormattedReference(passage)}
    </a>
  );
};

interface PassageLinkBodyInterface {
  passage: BasePassage;
  selected: boolean;
}
export const PassageLinkBody = ({ passage, selected }: PassageLinkBodyInterface) => {
  const readablePassage = getFormattedReference(passage.reference);
  const passages: OSISRange[] = getPassagesForReference(readablePassage);

  const renderedPassages = passages.map((item, index) => (
    <li key={index}>
      <PassageLink bounds={item} version={passage.version} selected={selected} />
    </li>
  ));

  return (
    <>
      {passages.length > 1 ? (
        <ul>{renderedPassages}</ul>
      ) : (
        <PassageLink bounds={passages[0]} version={passage.version} selected={selected} />
      )}
    </>
  );
};
