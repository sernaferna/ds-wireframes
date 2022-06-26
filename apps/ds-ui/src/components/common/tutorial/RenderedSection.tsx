import React from 'react';
import { PartType, SectionDocumentation, SectionPart } from './TutorialTypes';
import { MarkdownPreview } from '../md-helpers/MarkdownPreview';
import MDEditor from '@uiw/react-md-editor';
import { Accordion } from 'react-bootstrap';

interface IReadOnlyMarkdownBox {
  text: string;
}
const ReadOnlyMarkdownBox = ({ text }: IReadOnlyMarkdownBox) => {
  return (
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
  );
};

interface IRenderedParts {
  parts: SectionPart[];
}
const RenderedParts = ({ parts }: IRenderedParts): JSX.Element => {
  const response: JSX.Element[] = [];

  for (let i = 0; i < parts.length; i++) {
    if (parts[i].type === PartType.text) {
      response.push(
        <div className="mb-3">
          <MarkdownPreview content={parts[i].content} shaded={false} />
        </div>
      );
    } else {
      response.push(
        <div className="mb-3">
          <ReadOnlyMarkdownBox text={parts[i].content} />
        </div>
      );
      response.push(
        <div className="mb-3">
          <MarkdownPreview content="will render as:" shaded={false} />
        </div>
      );
      response.push(
        <div className="mb-3">
          <MarkdownPreview content={parts[i].content} shaded={true} />
        </div>
      );
    }
  }

  return <>{response}</>;
};

interface IRenderedSection {
  section: SectionDocumentation;
}
export const RenderedSection = ({ section }: IRenderedSection) => {
  const subSections =
    section.subSections.length < 1 ? (
      <></>
    ) : (
      <Accordion>
        {section.subSections.map((ss, index) => (
          <Accordion.Item eventKey={`${index}`}>
            <Accordion.Header>{ss.title}</Accordion.Header>
            <Accordion.Body>
              <RenderedParts parts={ss.parts} />
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    );

  return (
    <>
      <h3>{section.mainSection.title}</h3>
      <RenderedParts parts={section.mainSection.parts} />
      {subSections}
    </>
  );
};
