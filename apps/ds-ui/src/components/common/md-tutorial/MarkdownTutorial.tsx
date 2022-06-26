import { Modal } from 'react-bootstrap';
import { Tutorial } from '../tutorial/Tutorial';
import { SectionDocumentation } from '../tutorial/TutorialTypes';
import { mdMainSection } from './mainSection';
import { specialMarkupSection } from './specialMarkupSection';

const mdTutorialSections: SectionDocumentation[] = [mdMainSection, specialMarkupSection];

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
        <Tutorial sections={mdTutorialSections} />
      </Modal.Body>
    </Modal>
  );
};
