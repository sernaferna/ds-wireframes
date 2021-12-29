import React from 'react';
import { BasePassage } from '@devouringscripture/common';
import { getRefForOSIS } from '@devouringscripture/refparse';

const getLink = (ref: string, version: string): string => {
  return 'https://www.biblegateway.com/passage/?search=' + encodeURI(getRefForOSIS(ref)) + '&version=' + version;
};

interface PassageLinkBodyInterface {
  passage: BasePassage;
}
export const PassageLinkBody = (props: PassageLinkBodyInterface) => {
  return (
    <>
      <div>
        Launch{' '}
        <a href={getLink(props.passage.reference, props.passage.version)} target="_blank" rel="noreferrer">
          BibleGateway for {getRefForOSIS(props.passage.reference)}
        </a>{' '}
        in <strong>{props.passage.version}</strong>.
      </div>
    </>
  );
};
