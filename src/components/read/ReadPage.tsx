import React from 'react';
import { BibleView } from '../bible/BibleView';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Collapse from 'react-bootstrap/Collapse';
import { SidebarHeading, PageMainContainer } from '../styled-components/StyledComponents';
import { ReadPageSettings } from './ReadPageSettings';

interface ReadPageState {
  showSettings: boolean;
}

export class ReadPage extends React.Component<{}, ReadPageState> {
  constructor(props: any) {
    super(props);

    this.state = {
      showSettings: true,
    };

    this.toggleSettings = this.toggleSettings.bind(this);
  }

  private toggleSettings() {
    this.setState((prevState) => ({
      showSettings: !prevState.showSettings,
    }));
  }

  render() {
    return (
      <PageMainContainer>
        <Row>
          <Col xs="2">
            <SidebarHeading clickFunction={this.toggleSettings} collapseDiv="readPageSettings" visible={this.state.showSettings}>
              Settings
            </SidebarHeading>
            <Collapse in={this.state.showSettings}>
              <div id="readPageSettings">
                <ReadPageSettings />
              </div>
            </Collapse>
          </Col>
          <Col xs="10">
            <BibleView />
          </Col>
        </Row>
      </PageMainContainer>
    );
  }
}
