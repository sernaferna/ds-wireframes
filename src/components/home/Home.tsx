import React from 'react';
import { PrayerList } from '../prayer/PrayerList';
import { PageMainContainer, PageMainRow, PageMainContentCol, PageSidebarContainerCol } from '../styled-components/StyledComponents';
import { HomeSettings } from './HomeSettings';
import { SidebarCollapseWidget } from '../common/SidebarCollapseWidget';

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
        <PageMainRow>
          <PageSidebarContainerCol>
            <SidebarCollapseWidget title="Configuration" visible={this.state.homeSettingsShow} clickFunction={this.showHideHomeSettings}>
              <HomeSettings />
            </SidebarCollapseWidget>

            <SidebarCollapseWidget title="Prayer List" visible={this.state.prayerListShow} clickFunction={this.showHidePrayer}>
              <PrayerList cards={false} fullList={false} />
            </SidebarCollapseWidget>
          </PageSidebarContainerCol>
          <PageMainContentCol>Main</PageMainContentCol>
        </PageMainRow>
      </PageMainContainer>
    );
  }
}
