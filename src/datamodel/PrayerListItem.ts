export interface BasePrayerListItem {
  title: string;
  text: string;
  completed: boolean;
}

export interface PrayerListItem extends BasePrayerListItem {
  date: string;
  id: string;
}
