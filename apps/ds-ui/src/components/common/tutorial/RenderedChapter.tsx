import React from 'react';
import { PartType, Chapter, SectionPart } from '@devouringscripture/common';
import { Accordion } from 'react-bootstrap';
import { MarkdownBox } from '@devouringscripture/mde';

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
    <MarkdownBox
      content={text}
      hideAllControls={true}
      changeCallback={(newText) => {
        // do nothing
      }}
      readOnly={true}
      height={10}
    />
  );
};

interface IRenderedPart {
  part: SectionPart;
}

export const RenderedPart = ({ part }: IRenderedPart) => {
  if (part.type === PartType.text) {
    return (
      <div className="mb-3">
        <MarkdownBox.Preview content={part.content} shaded={false} />
      </div>
    );
  }

  if (part.type === PartType.heading) {
    return <h6 className="mt-4">{part.content}</h6>;
  }

  return (
    <>
      <div className="mb-3">
        <ReadOnlyMarkdownBox text={part.content} />
      </div>
      <div className="mb-3">
        <MarkdownBox.Preview content="will render as:" shaded={false} />
      </div>
      <div className="mb-3">
        <MarkdownBox.Preview content={part.content} shaded={true} />
      </div>
    </>
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
  return (
    <>
      {parts.map((part, index) => (
        <RenderedPart key={`rendered-part-${index}`} part={part} />
      ))}
    </>
  );
};

interface IRenderedChapter {
  chapter: Chapter;
}
/**
 * Renders a Chapter object to the screen, by creating the
 * appropriate Accordion item for it.
 *
 * @param Chapter The Chapter to be rendered
 */
export const RenderedChapter = ({ chapter }: IRenderedChapter) => {
  const subSections =
    chapter.subSections.length < 1 ? (
      <></>
    ) : (
      <Accordion>
        {chapter.subSections.map((chapter, index) => (
          <Accordion.Item key={`rendered-subsection-${index}`} eventKey={`${index}`}>
            <Accordion.Header>{chapter.title}</Accordion.Header>
            <Accordion.Body>
              <RenderedParts parts={chapter.parts} />
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    );

  return (
    <>
      <h3 className="mt-4">{chapter.mainSection.title}</h3>
      <RenderedParts parts={chapter.mainSection.parts} />
      {subSections}
    </>
  );
};
