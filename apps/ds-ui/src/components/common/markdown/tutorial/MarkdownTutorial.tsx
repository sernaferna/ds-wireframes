import { Modal } from 'react-bootstrap';
import { Tutorial } from '../../tutorial/Tutorial';
import { SectionDocumentation } from '../../../../dm/tutorials/TutorialTypes';
import { mdMainSection } from '../../../../tutorials/markdown/mainSection';
import { specialMarkupSection } from '../../../../tutorials/markdown/specialMarkupSection';
import { mdCheatsheetSection } from '../../../../tutorials/markdown/cheatsheetSection';
import { mdIntroSection } from '../../../../tutorials/markdown/introSection';

const mdTutorialSections: SectionDocumentation[] = [
  mdIntroSection,
  mdCheatsheetSection,
  mdMainSection,
  specialMarkupSection,
];

interface IMarkdownTutorial {
  show: boolean;
  handleClose(): void;
}

/**
 * Component to display the Markdown Tutorial as a Modal dialog.
 *
 * @param show Indicates whether the modal should be shown
 * @param handleClose Callback function to call when the modal is closed
 * @returns
 */
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
