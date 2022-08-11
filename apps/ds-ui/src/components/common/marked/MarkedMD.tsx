import React, { useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { renderedOutputFromMarkdown } from '../../../helpers/markdown/markdown-utils';

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

export const MarkedMD = () => {
  const [md, setMD] = useState(sampleMD);

  return (
    <Container fluid>
      <Row>
        <Col>
          <Form.Control
            className="ds-md-editor"
            as="textarea"
            rows={50}
            value={md}
            onChange={(e) => setMD(e.currentTarget.value)}
          />
        </Col>
        <Col>
          <div className="ds-md-viewer" dangerouslySetInnerHTML={{ __html: renderedOutputFromMarkdown(md) }} />
        </Col>
      </Row>
    </Container>
  );
};
