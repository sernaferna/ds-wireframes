import React from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Collapse from 'react-bootstrap/Collapse';
import { PrayerList } from '../prayer/PrayerList';
import { SidebarHeading } from '../styled-components/StyledComponents';
import { HomeSettings } from './HomeSettings';

interface HomePageState {
  homeSettingsShow: boolean;
  prayerListShow: boolean;
}

export class Home extends React.Component<{}, HomePageState> {
  constructor(props: any) {
    super(props);

    this.state = {
      homeSettingsShow: true,
      prayerListShow: true,
    };

    this.showHideHomeSettings = this.showHideHomeSettings.bind(this);
    this.showHidePrayer = this.showHidePrayer.bind(this);
  }

  private showHideHomeSettings() {
    this.setState((prevState) => ({
      homeSettingsShow: !prevState.homeSettingsShow,
    }));
  }

  private showHidePrayer() {
    this.setState((prevState) => ({
      prayerListShow: !prevState.prayerListShow,
    }));
  }

  render() {
    return (
      <Container className="m-0" fluid>
        <Row>
          <Col xs="2" className="border">
            <SidebarHeading onClick={this.showHideHomeSettings} aria-controls="home-page-settings" aria-expanded={this.state.homeSettingsShow}>
              Configuration
            </SidebarHeading>
            <Collapse in={this.state.homeSettingsShow}>
              <div id="home-page-settings">
                <HomeSettings />
              </div>
            </Collapse>

            <SidebarHeading onClick={this.showHidePrayer} aria-controls="prayer-list" aria-expanded={this.state.prayerListShow}>
              Prayer List
            </SidebarHeading>
            <Collapse in={this.state.prayerListShow}>
              <div id="prayer-list">
                <PrayerList cards={false} fullList={false} />
              </div>
            </Collapse>
          </Col>
          <Col xs="10" className="border">
            Main
          </Col>
        </Row>
      </Container>
    );
  }
}
