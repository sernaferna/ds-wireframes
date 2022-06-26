import { Accordion, Modal } from 'react-bootstrap';
import { Section } from './Section';
import { introductionSection } from './Introduction';
import { textFormattingSection } from './TextFormatting';
import { paragraphsSection } from './Paragraphs';
import { headingsSection } from './Headings';
import { listsSection } from './Lists';
import { tableSection } from './Tables';
import { footnoteSection } from './Footnotes';
import { specialMarkdownSection } from './SpecialMarkdown';
import { lordSection } from './LORD';
import { adbcSection } from './ADBC';
import { smallcapsSection } from './SmallCaps';
import { bibleLinkSection } from './BibleLinks';

interface IMarkdownTutorial {
  show: boolean;
  handleClose(): void;
}
export const MarkdownTutorial = ({ show, handleClose }: IMarkdownTutorial) => {
  return (
    <Modal show={show} onHide={handleClose} centered size="xl" fullscreen="xl-down">
      <Modal.Header closeButton>
        <Modal.Title>Markdown Tutorial</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Section section={introductionSection} />

        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Text Formatting</Accordion.Header>
            <Accordion.Body>
              <Section section={textFormattingSection} />
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Paragraphs</Accordion.Header>
            <Accordion.Body>
              <Section section={paragraphsSection} />
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="2">
            <Accordion.Header>Headings</Accordion.Header>
            <Accordion.Body>
              <Section section={headingsSection} />
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="3">
            <Accordion.Header>Lists and Bullets</Accordion.Header>
            <Accordion.Body>
              <Section section={listsSection} />
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="4">
            <Accordion.Header>Tables</Accordion.Header>
            <Accordion.Body>
              <Section section={tableSection} />
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="5">
            <Accordion.Header>Footnotes</Accordion.Header>
            <Accordion.Body>
              <Section section={footnoteSection} />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        <h3 className="mt-3">Special Markdown</h3>
        <Section section={specialMarkdownSection} />

        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Links to the Bible Gateway</Accordion.Header>
            <Accordion.Body>
              <Section section={bibleLinkSection} />
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="1">
            <Accordion.Header>All Capitalized Words/Names</Accordion.Header>
            <Accordion.Body>
              <Section section={lordSection} />
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="2">
            <Accordion.Header>Smaller (but still capitalized) Terms</Accordion.Header>
            <Accordion.Body>
              <Section section={adbcSection} />
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="3">
            <Accordion.Header>Small Caps</Accordion.Header>
            <Accordion.Body>
              <Section section={smallcapsSection} />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Modal.Body>
    </Modal>
  );
};
