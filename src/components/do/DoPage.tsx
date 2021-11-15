import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Collapse from 'react-bootstrap/Collapse';
import { PageMainContainer, SidebarHeading } from '../styled-components/StyledComponents';
import { DoPageSettings } from './DoPageSettings';

interface DoPageState {
  showSettings: boolean;
}

export class DoPage extends React.Component<{}, DoPageState> {
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
            <SidebarHeading onClick={this.toggleSettings} aria-controls="do-page-settings" aria-expanded={this.state.showSettings}>
              Settings
            </SidebarHeading>
            <Collapse in={this.state.showSettings}>
              <div id="do-page-settings">
                <DoPageSettings />
              </div>
            </Collapse>
          </Col>
          <Col xs="10"></Col>
        </Row>
      </PageMainContainer>
    );
  }
}
