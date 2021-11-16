import React from 'react';
import { BibleView } from '../bible/BibleView';
import { PageMainContainer, PageMainRow, PageSidebarContainerCol, PageMainContentCol } from '../styled-components/StyledComponents';
import { ReadPageSettings } from './ReadPageSettings';
import { SidebarCollapseWidget } from '../common/SidebarCollapseWidget';

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
        <PageMainRow>
          <PageSidebarContainerCol>
            <SidebarCollapseWidget title="Settings" visible={this.state.showSettings} clickFunction={this.toggleSettings}>
              <ReadPageSettings />
            </SidebarCollapseWidget>
          </PageSidebarContainerCol>
          <PageMainContentCol>
            <BibleView />
          </PageMainContentCol>
        </PageMainRow>
      </PageMainContainer>
    );
  }
}
