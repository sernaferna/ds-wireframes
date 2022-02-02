import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { PlanSidebar } from './PlanSidebar';
import { PlanAttributes } from '@devouringscripture/common';
import { paginateItems } from '../../helpers/pagination';
import { PlanSummaryView } from './PlanSummaryView';

const hcPlanList: PlanAttributes[] = [
  {
    name: 'New Testament in a Year',
    description: 'The entire New Testament ',
    length: 52,
    admin: true,
    percentageComplete: 0.5,
    includesApocrypha: false,
    version: '1.0',
  },
  {
    name: 'New Testament in Chronological Order',
    description:
      'All of the books in the New Testemant, but in the order they were written, not the order in which they appear',
    length: 156,
    admin: false,
    includesApocrypha: true,
    version: '1.1',
  },
  {
    name: 'Psalms in a year',
    description: 'All 150 Psalms in one year',
    length: 52,
    admin: true,
    includesApocrypha: false,
    version: '1.0',
  },
  {
    name: "David's life",
    description: 'Selected readings about the life of David',
    length: 2,
    admin: true,
    percentageComplete: 0.71,
    includesApocrypha: false,
    version: '12.9',
  },
  {
    name: 'Proverbs',
    description: 'The book of Proverbs in a year',
    length: 52,
    admin: false,
    percentageComplete: 0.25,
    includesApocrypha: false,
    version: '0.9',
  },
];

export const PlansPage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const itemList = hcPlanList.map((item, index) => <PlanSummaryView key={`plan-item-${index}`} plan={item} />);

  const [paginatedItems, paginationElement] = paginateItems(itemList, 6, currentPage, setCurrentPage);

  return (
    <Container fluid={true} className="page-main-container">
      <Row>
        <Col className="page-sidebar-container-col">
          <PlanSidebar />
        </Col>
        <Col className="page-main-content-col">
          <Row>
            <Col className="plan-list-col">
              {paginatedItems}
              {paginationElement}
            </Col>
            <Col className="edit-plan-col">
              <p>Edit Reading Plan</p>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
