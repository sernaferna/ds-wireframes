import React from 'react';
import { BasePassage } from '@devouringscripture/common';

interface PassageLinkBodyInterface {
  passage: BasePassage;
}
export const PassageLinkBody = (props: PassageLinkBodyInterface) => {
  const urlForBG =
    'https://www.biblegateway.com/passage/?search=' +
    encodeURI(props.passage.reference) +
    '&version=' +
    props.passage.version;

  return (
    <>
      <div>
        Launch{' '}
        <a href={urlForBG} target="_blank" rel="noreferrer">
          BibleGateway for {props.passage.reference}
        </a>{' '}
        in <strong>{props.passage.version}</strong>.
      </div>
      <div>
        {' '}
        <img
          className="float-end"
          height={28.5}
          width={150}
          src="bg/BibleGateway-Logo-black-350p.png"
          alt="Bible Gateway logo"
        />
      </div>
    </>
  );
};
