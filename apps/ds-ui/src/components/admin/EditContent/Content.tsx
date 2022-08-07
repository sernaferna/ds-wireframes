import React, { useState, useMemo } from 'react';
import { Alert, Button, Container, Table } from 'react-bootstrap';
import { useGetAllTutorialsQuery } from '../../../services/TutorialService';
import { LoadingMessage, ErrorLoadingDataMessage } from '../../common/loading';
import { EditTutorial } from './EditTutorial';

export const Content = () => {
  const { data: fullList, error: fullListError, isLoading: fullListIsLoading } = useGetAllTutorialsQuery();
  const [selectedTutId, setSelectedTutId] = useState<string>('');

  const renderedFullList = useMemo(() => {
    if (!fullList) {
      return [];
    }

    return fullList.map((item, index) => (
      <tr key={`tutorial-row-${index}`}>
        <td>{item.name}</td>
        <td>
          <Button
            variant="outline-secondary"
            onClick={() => {
              if (selectedTutId === item.id) {
                setSelectedTutId('');
              } else {
                setSelectedTutId(item.id);
              }
            }}
          >
            Edit
          </Button>
        </td>
      </tr>
    ));
  }, [fullList, selectedTutId]);

  if (fullListIsLoading) {
    return <LoadingMessage />;
  }
  if (fullListError) {
    return <ErrorLoadingDataMessage theError={fullListError} />;
  }

  return (
    <>
      <Container>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Tutorial</th>
              <td>Edit</td>
            </tr>
          </thead>
          <tbody>{renderedFullList}</tbody>
        </Table>
      </Container>

      <Container fluid>
        {selectedTutId.length > 0 ? (
          <EditTutorial tutId={selectedTutId} />
        ) : (
          <Alert variant="dark">Please select a Tutorial</Alert>
        )}
      </Container>
    </>
  );
};
