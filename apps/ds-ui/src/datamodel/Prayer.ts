export const PrayerTypes = {
  request: 'request',
  praise: 'praise',
  confession: 'confession',
};
export interface BasePrayerListItem {
  title: string;
  text: string;
  completed: boolean;
  type?: string;
}

export interface PrayerListItem extends BasePrayerListItem {
  date: string;
  id: string;
}
