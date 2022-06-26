import React from 'react';
import { SectionDocumentation, PartType } from './TutorialTypes';
import { MarkdownPreview } from '../md-helpers/MarkdownPreview';
import MDEditor from '@uiw/react-md-editor';

interface IReadOnlyMarkdownBox {
  text: string;
}
const ReadOnlyMarkdownBox = ({ text }: IReadOnlyMarkdownBox) => {
  return (
    <div className="my-3">
      <MDEditor
        value={text}
        highlightEnable={true}
        preview="edit"
        defaultTabEnable={false}
        visiableDragbar={false}
        hideToolbar={true}
        textareaProps={{ style: { fontFamily: 'Courier New, monospace' } }}
        style={{ fontFamily: 'Courier New, monospace' }}
      />
    </div>
  );
};

interface ISection {
  section: SectionDocumentation;
}
export const Section = ({ section }: ISection) => {
  const responseJSX: JSX.Element[] = [];

  for (let i = 0; i < section.parts.length; i++) {
    if (section.parts[i].type === PartType.text) {
      responseJSX.push(<MarkdownPreview content={section.parts[i].content} shaded={false} />);
    } else {
      responseJSX.push(<ReadOnlyMarkdownBox text={section.parts[i].content} />);
      responseJSX.push(<MarkdownPreview content="will render as:" shaded={false} />);
      responseJSX.push(<MarkdownPreview content={section.parts[i].content} shaded={true} />);
    }
  }

  return <>{responseJSX}</>;
};
