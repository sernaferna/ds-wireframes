import React from 'react';
import { PageMainContainer, PageMainRow, PageSidebarContainerCol, PageMainContentCol } from '../styled-components/StyledComponents';
import { PrayerSettings } from './PrayerSettings';
import { SidebarCollapseWidget } from '../common/SidebarCollapseWidget';
import { PrayerCards } from './PrayerCards';

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
        <PageMainRow>
          <PageSidebarContainerCol>
            <SidebarCollapseWidget title="Prayer Page Settings" visible={this.state.prayerSettingsShow} clickFunction={this.prayerSettingsExpand}>
              <PrayerSettings />
            </SidebarCollapseWidget>
          </PageSidebarContainerCol>
          <PageMainContentCol>
            <PrayerCards />
          </PageMainContentCol>
        </PageMainRow>
      </PageMainContainer>
    );
  }
}
