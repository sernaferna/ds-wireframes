import React, { useState, useMemo } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { NavLink } from 'react-router-dom';
import { PlanSidebar } from './PlanSidebar';
import { paginateItems } from '../../helpers/pagination';
import { PlanSummaryView } from './PlanSummaryView';
import { useGetAllInstantiatedPlanItemsQuery } from '../../services/InstantiatedPlanService';
import { LoadingMessage, ErrorLoadingDataMessage } from '../common/loading';
import { CurrentReadingPlan } from './read/CurrentReadingPlan';
import { BaseInstantiatedPlan } from '@devouringscripture/common';

const getItemList = (data: BaseInstantiatedPlan[] | undefined) => {
  if (data === undefined) {
    return [];
  }

  return data.map((item, index) => (
    <PlanSummaryView
      key={`plan-item-${index}`}
      planId={item.planInstanceId}
      percentageComplete={item.percentageComplete}
    />
  ));
};

export const PlansPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, error, isLoading } = useGetAllInstantiatedPlanItemsQuery();

  const itemList = useMemo(() => getItemList(data), [data]);

  if (isLoading) {
    return <LoadingMessage />;
  }
  if (error) {
    return <ErrorLoadingDataMessage />;
  }

  const [paginatedItems, paginationElement] = paginateItems(itemList, 6, currentPage, setCurrentPage);

  return (
    <Container fluid={true} className="page-main-container">
      <Row>
        <Col className="page-sidebar-container-col">
          <PlanSidebar />
        </Col>
        <Col className="page-main-content-col">
          <Row className="plan-page-new-plan-row">
            <Col>
              <NavLink key="/plans/edit" to="/plans/edit">
                New Plan
              </NavLink>
            </Col>
          </Row>
          <Row>
            <Col className="plan-list-col">
              {paginatedItems}
              {paginationElement}
            </Col>
            <Col className="edit-plan-col">
              <CurrentReadingPlan />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
