import { Modal } from 'react-bootstrap';
import { Tutorial } from '../../tutorial/Tutorial';
import { useGetTutorialByIdQuery } from '../../../../services/TutorialService';
import { ErrorLoadingDataMessage, LoadingMessage } from '../../loading';

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
  const { data, error, isLoading } = useGetTutorialByIdQuery('2', {
    skip: !show,
  });

  if (isLoading) {
    return (
      <Modal show={show} onHide={handleClose} centered size="xl" fullscreen="xl-down">
        <Modal.Header closeButton>
          <Modal.Title>Markdown Tutorial</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LoadingMessage />
        </Modal.Body>
      </Modal>
    );
  }
  if (error) {
    return <ErrorLoadingDataMessage theError={error} />;
  }
  if (!show) {
    return <></>;
  }

  return (
    <Modal show={show} onHide={handleClose} centered size="xl" fullscreen="xl-down">
      <Modal.Header closeButton>
        <Modal.Title>Markdown Tutorial</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Tutorial chapters={data!.chapters} />
      </Modal.Body>
    </Modal>
  );
};
