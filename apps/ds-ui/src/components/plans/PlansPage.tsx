import React, { useState, useMemo } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
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
          <Row className="mb-3">
            <Col>
              <NavLink className="btn btn-primary" key="/plans/edit" to="/plans/edit">
                New Plan
              </NavLink>
            </Col>
          </Row>
          <Row>
            <Col xs="12" lg="7">
              {paginatedItems}
              {paginationElement}
            </Col>
            <Col xs="12" lg="5">
              <CurrentReadingPlan />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
