import React from 'react';
import { Form } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { useUserSettings } from '../../hooks/UserSettings';
import { DoPageSettings } from '../do/DoPageSettings';
import { HomeSettings } from '../home/HomeSettings';
import { PlanSettings } from '../plans/PlanSettings';
import { PrayerSettings } from '../prayer/PrayerSettings';
import { ReadPageSettings } from '../read/ReadPageSettings';
import { StatsSettings } from '../stats/StatsSettings';
import { ErrorLoadingDataMessage, LoadingMessage } from './loading';
import { SidebarCollapseWidget } from './SidebarCollapseWidget';

export const Settings = () => {
  const [userData, userResponseError, userIsLoading, , flipUserBoolCallback] = useUserSettings();
  const location = useLocation();

  if (userIsLoading) {
    return <LoadingMessage />;
  }
  if (userResponseError) {
    return <ErrorLoadingDataMessage errors={[userResponseError]} />;
  }

  const showHomeSettings = location.pathname === '/';
  const showPraySettings = true;
  const showReadSettings = true;
  const showDoSettings = location.pathname.startsWith('/do');
  const showPlanSettings = location.pathname.startsWith('/plans');
  const showStatsSettings = location.pathname.startsWith('/stats');

  return (
    <Form>
      <Form.Label>General Settings</Form.Label>
      <Form.Check
        type="switch"
        id="showSizeIndicatorSetting"
        label="Show Size Indicator"
        checked={userData!.settings.showSizeIndicator}
        onChange={flipUserBoolCallback('settings.showSizeIndicator')}
      />
      <Form.Check
        className="mb-3"
        type="switch"
        id="isAdmin"
        label="Admin user?"
        checked={userData!.isAdmin}
        onChange={flipUserBoolCallback('isAdmin')}
      />

      {showHomeSettings && (
        <SidebarCollapseWidget
          title="Home Settings"
          visible={userData!.settings.home.showSettings}
          clickFunction={flipUserBoolCallback('settings.home.showSettings')}
        >
          <HomeSettings />
        </SidebarCollapseWidget>
      )}

      {showPraySettings && (
        <SidebarCollapseWidget
          title="Prayer Settings"
          visible={userData!.settings.prayer.showSettings}
          clickFunction={flipUserBoolCallback('settings.prayer.showSettings')}
        >
          <PrayerSettings />
        </SidebarCollapseWidget>
      )}

      {showReadSettings && (
        <SidebarCollapseWidget
          title="Read/Write Settings"
          visible={userData!.settings.read.showSettings}
          clickFunction={flipUserBoolCallback('settings.read.showSettings')}
        >
          <ReadPageSettings />
        </SidebarCollapseWidget>
      )}

      {showDoSettings && (
        <SidebarCollapseWidget
          title="Do Settings"
          visible={userData!.settings.actions.showSettings}
          clickFunction={flipUserBoolCallback('settings.actions.showSettings')}
        >
          <DoPageSettings />
        </SidebarCollapseWidget>
      )}

      {showPlanSettings && (
        <SidebarCollapseWidget
          title="Plan Settings"
          visible={userData!.settings.plans.showSettings}
          clickFunction={flipUserBoolCallback('settings.plans.showSettings')}
        >
          <PlanSettings />
        </SidebarCollapseWidget>
      )}

      {showStatsSettings && (
        <SidebarCollapseWidget
          title="Stats Settings"
          visible={userData!.settings.stats.showSettings}
          clickFunction={flipUserBoolCallback('settings.stats.showSettings')}
        >
          <StatsSettings />
        </SidebarCollapseWidget>
      )}
    </Form>
  );
};
