import React from 'react';
import { PartType, SectionDocumentation, SectionPart } from './TutorialTypes';
import { MarkdownPreview } from '../md-helpers/MarkdownPreview';
import MDEditor from '@uiw/react-md-editor';
import { Accordion } from 'react-bootstrap';

interface IReadOnlyMarkdownBox {
  text: string;
}

/**
 * Wrapper component for MDEditor, which has some styling applied and is
 * read-only.
 *
 * @param text The text to be rendered
 */
const ReadOnlyMarkdownBox = ({ text }: IReadOnlyMarkdownBox) => {
  return (
    <MDEditor
      value={text}
      highlightEnable={true}
      preview="edit"
      defaultTabEnable={false}
      visiableDragbar={false}
      hideToolbar={true}
      textareaProps={{ style: { fontFamily: 'Courier Prime, monospace' } }}
      style={{ fontFamily: 'Courier Prime, monospace' }}
    />
  );
};

interface IRenderedParts {
  parts: SectionPart[];
}

/**
 * Renders a set of SectionPart objects with a combination of MarkdownPreview
 * and ReadOnlyMarkdownBox components, differentiating 'text' from 'example'
 * parts.
 *
 * @param parts List of parts to be rendered
 */
const RenderedParts = ({ parts }: IRenderedParts): JSX.Element => {
  const response: JSX.Element[] = [];

  for (let i = 0; i < parts.length; i++) {
    if (parts[i].type === PartType.text) {
      response.push(
        <div className="mb-3" key={`text-part-${i}`}>
          <MarkdownPreview content={parts[i].content} shaded={false} />
        </div>
      );
    } else if (parts[i].type === PartType.heading) {
      response.push(
        <h6 className="mt-4" key={`heading-part-${i}`}>
          {parts[i].content}
        </h6>
      );
    } else {
      response.push(
        <div className="mb-3" key={`example-md-${i}`}>
          <ReadOnlyMarkdownBox text={parts[i].content} />
        </div>
      );
      response.push(
        <div className="mb-3" key={`example-divider-${i}`}>
          <MarkdownPreview content="will render as:" shaded={false} />
        </div>
      );
      response.push(
        <div className="mb-3" key={`example-view-${i}`}>
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
/**
 * Renders a SectionDocumentation object to the screen, by creating the
 * appropriate Accordion item for it.
 *
 * @param section The section to be rendered
 */
export const RenderedSection = ({ section }: IRenderedSection) => {
  const subSections =
    section.subSections.length < 1 ? (
      <></>
    ) : (
      <Accordion>
        {section.subSections.map((ss, index) => (
          <Accordion.Item key={`rendered-subsection-${index}`} eventKey={`${index}`}>
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
      <h3 className="mt-4">{section.mainSection.title}</h3>
      <RenderedParts parts={section.mainSection.parts} />
      {subSections}
    </>
  );
};
