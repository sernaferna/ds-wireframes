import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { PlanSidebar } from './PlanSidebar';
import { UserPlan } from '@devouringscripture/common';
import { paginateItems } from '../../helpers/pagination';
import { PlanSummaryView } from './PlanSummaryView';

const hcPlanList: UserPlan[] = [
  {
    plan: {
      name: 'New Testament in a Year',
      description: 'The entire New Testament ',
      length: 52,
      includesApocrypha: false,
      version: '1.0.0',
      isAdmin: true,
      includeWeekends: true,
      osis: 'Matt.1.1-Rev.22.21',
      id: '749d8a51-4804-4701-b8bc-12717749e8e0',
      weeks: [],
    },
  },
  {
    plan: {
      name: 'New Testament in Chronological Order',
      description:
        'All of the books in the New Testemant, but in the order they were written, not the order in which they appear',
      length: 156,
      includesApocrypha: true,
      version: '1.1.9',
      isAdmin: false,
      includeWeekends: true,
      osis: 'Matt.1.1-Matt.2.1',
      id: '857bef33-9ab9-43d7-9710-c641bf463621',
      weeks: [],
    },
  },
  {
    plan: {
      name: 'Psalms in a year',
      description: 'All 150 Psalms in one year',
      length: 52,
      includesApocrypha: false,
      version: '1.0.0',
      isAdmin: true,
      includeWeekends: false,
      osis: 'Ps.1.1-Ps.150.6',
      id: 'ac57d201-658c-4e3a-af92-780c04e3acc2',
      weeks: [],
    },
  },
  {
    plan: {
      name: "David's life",
      description: 'Selected readings about the life of David',
      length: 2,
      includesApocrypha: false,
      version: '12.9.26',
      isAdmin: false,
      includeWeekends: false,
      osis: '',
      id: '',
      weeks: [
        {
          days: [{ verses: [] }, { verses: [] }, { verses: [] }, { verses: [] }, { verses: [] }],
        },
        {
          days: [{ verses: [] }, { verses: [] }, { verses: [] }, { verses: [] }, { verses: [] }],
        },
      ],
    },
    percentageComplete: 0.71,
  },
  {
    plan: {
      name: 'Proverbs',
      description: 'The book of Proverbs in a year',
      length: 52,
      includesApocrypha: false,
      version: '0.9.0',
      isAdmin: true,
      includeWeekends: false,
      osis: 'Pr.1.1-Pr.31.31',
      id: '',
      weeks: [],
    },
    percentageComplete: 0.25,
  },
];

export const PlansPage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const itemList = hcPlanList.map((item, index) => <PlanSummaryView key={`plan-item-${index}`} userPlan={item} />);

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
