import React from 'react';
import { PrayerSnapshot } from '../prayer/PrayerSnapshot';
import { PageMainContainer, PageMainRow, PageMainContentCol, PageSidebarContainerCol } from '../styled-components/StyledComponents';
import { HomeSettings } from './HomeSettings';
import { SidebarCollapseWidget } from '../common/SidebarCollapseWidget';
import { DoSidebar } from '../do/DoSidebar';

interface HomePageState {
  homeSettingsShow: boolean;
  prayerListShow: boolean;
  actionsShow: boolean;
}

export class Home extends React.Component<{}, HomePageState> {
  constructor(props: any) {
    super(props);

    this.state = {
      homeSettingsShow: true,
      prayerListShow: true,
      actionsShow: true,
    };

    this.showHideHomeSettings = this.showHideHomeSettings.bind(this);
    this.showHidePrayer = this.showHidePrayer.bind(this);
    this.showHideActions = this.showHideActions.bind(this);
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

  private showHideActions() {
    this.setState((prevState) => ({ actionsShow: !prevState.actionsShow }));
  }

  render() {
    return (
      <PageMainContainer>
        <PageMainRow>
          <PageSidebarContainerCol>
            <SidebarCollapseWidget title="Configuration" visible={this.state.homeSettingsShow} clickFunction={this.showHideHomeSettings}>
              <HomeSettings />
            </SidebarCollapseWidget>

            <SidebarCollapseWidget title="Actions" visible={this.state.actionsShow} clickFunction={this.showHideActions}>
              <DoSidebar />
            </SidebarCollapseWidget>

            <SidebarCollapseWidget title="Prayer List" visible={this.state.prayerListShow} clickFunction={this.showHidePrayer}>
              <PrayerSnapshot />
            </SidebarCollapseWidget>
          </PageSidebarContainerCol>
          <PageMainContentCol>
            <h1>Main Page</h1>
            <p>To Do</p>
          </PageMainContentCol>
        </PageMainRow>
      </PageMainContainer>
    );
  }
}
