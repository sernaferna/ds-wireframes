import React from 'react';
import { PageMainContainer, PageMainRow, PageSidebarContainerCol, PageMainContentCol } from '../styled-components/StyledComponents';
import { DoPageSettings } from './DoPageSettings';
import { SidebarCollapseWidget } from '../common/SidebarCollapseWidget';
import { ActionsWidget } from './ActionsWidget';
import Calendar from 'react-calendar';
import './Calendar.css';

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
        <PageMainRow>
          <PageSidebarContainerCol>
            <SidebarCollapseWidget title="Settings" visible={this.state.showSettings} clickFunction={this.toggleSettings}>
              <DoPageSettings />
            </SidebarCollapseWidget>
          </PageSidebarContainerCol>
          <PageMainContentCol>
            <Calendar />
            <ActionsWidget />
          </PageMainContentCol>
        </PageMainRow>
      </PageMainContainer>
    );
  }
}
