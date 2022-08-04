import React from 'react';
import { BasePassage } from '@devouringscripture/common';
import { MarkdownBox } from '../common/markdown/MarkdownBox';

/**
 * Helper function to generate the appropriate markdown for a link to
 * Bible Gateway.
 *
 * @param osis The OSIS to be included for the reference
 * @param version The version of the Bible to be used in the link
 * @returns Markdown for a Devouring Scripture link to Scripture on the Bible Gateway
 */
const getMDLink = (osis: string, version: string) => {
  return `[|${osis}|${version}]`;
};

interface IPassageLinkBody {
  passage: BasePassage;
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
 */
export const PassageLinkBody = ({ passage }: IPassageLinkBody) => {
  const markdownToRender = getMDLink(passage.osis, passage.version);

  return <MarkdownBox.Preview shaded={false} content={markdownToRender} />;
};
