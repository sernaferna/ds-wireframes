import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Collapse from 'react-bootstrap/Collapse';
import { PrayerList } from '../prayer/PrayerList';
import { SidebarHeading, PageMainContainer } from '../styled-components/StyledComponents';
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
      <PageMainContainer>
        <Row>
          <Col xs="2" className="border">
            <SidebarHeading clickFunction={this.showHideHomeSettings} collapseDiv="home-page-settings" visible={this.state.homeSettingsShow}>
              Configuration
            </SidebarHeading>
            <Collapse in={this.state.homeSettingsShow}>
              <div id="home-page-settings">
                <HomeSettings />
              </div>
            </Collapse>

            <SidebarHeading clickFunction={this.showHidePrayer} collapseDiv="prayer-list" visible={this.state.prayerListShow}>
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
      </PageMainContainer>
    );
  }
}
