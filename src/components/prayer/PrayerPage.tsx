import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { PrayerList } from './PrayerList';
import Collapse from 'react-bootstrap/Collapse';
import { SidebarHeading, PageMainContainer } from '../styled-components/StyledComponents';
import { PrayerSettings } from './PrayerSettings';

interface PrayerPageState {
  prayerSettingsShow: boolean;
}

export class PrayerPage extends React.Component<{}, PrayerPageState> {
  constructor(props: any) {
    super(props);

    this.state = {
      prayerSettingsShow: true,
    };

    this.prayerSettingsExpand = this.prayerSettingsExpand.bind(this);
  }

  private prayerSettingsExpand() {
    this.setState((prevState) => ({
      prayerSettingsShow: !prevState.prayerSettingsShow,
    }));
  }

  render() {
    return (
      <PageMainContainer>
        <Row>
          <Col xs="2">
            <SidebarHeading clickFunction={this.prayerSettingsExpand} collapseDiv="prayer-settings-collapse" visible={this.state.prayerSettingsShow}>
              Prayer Page Settings
            </SidebarHeading>
            <Collapse in={this.state.prayerSettingsShow}>
              <div id="prayer-settings-collapse">
                <PrayerSettings />
              </div>
            </Collapse>
          </Col>
          <Col xs="10">
            <PrayerList cards={true} fullList={true} />
          </Col>
        </Row>
      </PageMainContainer>
    );
  }
}
