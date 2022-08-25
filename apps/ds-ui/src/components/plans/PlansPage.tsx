import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { paginateItems } from '../../hooks/pagination';
import { PlanSummaryView } from './PlanSummaryView';
import { useGetAllInstantiatedPlanItemsQuery } from '../../services/InstantiatedPlanService';
import { getDateForActions } from '../../stores/UISlice';
import { LoadingMessage, ErrorLoadingDataMessage } from '../common/loading';
import { BaseInstantiatedPlan } from '@devouringscripture/common';
import { PlanCalendarView } from './PlanCalendarView';
import { DateTime } from 'luxon';
import { CurrentReadingPlan } from './read/CurrentReadingPlan';

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

/**
 * Main page/component for the **Plans** section of the site
 */
export const PlansPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, error, isLoading } = useGetAllInstantiatedPlanItemsQuery();
  const dateToShow = DateTime.fromISO(useSelector(getDateForActions));

  const itemList = useMemo(() => getItemList(data), [data]);

  if (isLoading) {
    return <LoadingMessage />;
  }
  if (error) {
    return <ErrorLoadingDataMessage errors={[error]} />;
  }

  const [paginatedItems, paginationElement] = paginateItems(itemList, 6, currentPage, setCurrentPage);

  return (
    <Container fluid={true} className="page-main-container">
      <Row className="mb-3">
        <Col>
          <NavLink className="btn btn-primary" key="/plans/edit" to="/plans/edit">
            New Plan
          </NavLink>
        </Col>
      </Row>
      <Row>
        <Col xs="12" xl="7">
          {paginatedItems}
          {paginationElement}
        </Col>
        <Col xs="12" xl="5">
          <Row>
            <Col>
              <CurrentReadingPlan />
            </Col>
          </Row>
          <Row className="mt-3">
            <Col className="d-flex justify-content-center">
              <PlanCalendarView dateToShow={dateToShow} />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
