import React from 'react';
import { BasePassage } from '@devouringscripture/common';
import { getRefForOSIS } from '@devouringscripture/refparse';

const getLink = (ref: string, version: string): string => {
  return 'https://www.biblegateway.com/passage/?search=' + encodeURI(getRefForOSIS(ref)) + '&version=' + version;
};

interface PassageLinkBodyInterface {
  passage: BasePassage;
  selected: boolean;
}
export const PassageLinkBody = ({ passage, selected }: PassageLinkBodyInterface) => {
  return (
    <>
      <div>
        Launch{' '}
        <a
          className={selected ? 'link-light' : 'link-primary'}
          href={getLink(passage.reference, passage.version)}
          target="_blank"
          rel="noreferrer"
        >
          BibleGateway for {getRefForOSIS(passage.reference)}
        </a>{' '}
        in <strong>{passage.version}</strong>.
      </div>
    </>
  );
};
