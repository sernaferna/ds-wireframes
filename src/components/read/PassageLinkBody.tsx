import React from 'react';
import { BasePassage } from '../../datamodel/Passage';

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
          BibleGateway for {props.passage.reference} in {props.passage.version}
        </a>
        .
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
