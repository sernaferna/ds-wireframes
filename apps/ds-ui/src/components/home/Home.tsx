import React, { useState } from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import { CurrentReadingPlan } from '../plans/read/CurrentReadingPlan';
import { PrayerSnapshot } from '../prayer/PrayerSnapshot';
import { ActionsWidget } from '../do/ActionsWidget';
import { CreatePrayerItem } from '../prayer/CreatePrayerItem';
import { useErrorsAndWarnings } from '../../hooks/ErrorsAndWarning';
import { MarkedMD } from '../common/marked/MarkedMD';

const sampleMD = `# This is some markdown

It "contains" some **bold** and *italics* and ==highlighting== but "contains" didn't need quotes. There's also some ^-^Small Caps^-^ just for fun, and the year ^^A.D.^^2020 is included too.

| Column A | Column B |
| -------- | -------- |
| value    | value    |
| value 2  | value 2  |

There is also a link to [Google](https://www.google.ca) and [|Rev 1:1 (verse 1)|NIV;s], and a reference to the ^^^LORD^^^.

|> ((Rev 1:1)) This isn't *actually* Rev 1:1
|> |> but it's a quote regardless

And this is some text that *should* be outside the Scripture quote`;

/**
 * Main page/component for the **Home** section of teh application. Sets
 * up the `AlertUI` widget, and passes on `setErrorMessage()` function
 * to some child components.
 */
export const Home = () => {
  const [AlertUI, setErrorMessage] = useErrorsAndWarnings();
  const [md, setMD] = useState(sampleMD);

  return (
    <Container fluid={true} className="page-main-container">
      <AlertUI />

      <Row>
        <Col xs="12">
          <MarkedMD showSidePreview={true} content={md} changeCallback={(newValue) => setMD(newValue)} />
        </Col>
      </Row>
      <Row>
        <Col xs="12" sm="6" lg="4" xxl="3">
          <CurrentReadingPlan showTitle={true} />
        </Col>
        <Col xs="12" sm="6" lg="4" xxl="3">
          <ActionsWidget showTitle={true} setErrorMessage={setErrorMessage} />
        </Col>
        <Col xs="12" sm="4" lg="4" xxl="3">
          <PrayerSnapshot showTitle={true} />
        </Col>
        <Col xs="12" sm="8" lg="12" xxl="3">
          <CreatePrayerItem />
        </Col>
      </Row>
    </Container>
  );
};
