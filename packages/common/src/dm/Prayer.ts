export interface BasePrayerListItem {
  title?: string;
  text: string;
  completed: boolean;
  type?: string;
}

export interface PrayerListItem extends BasePrayerListItem {
  date: string;
  id: string;
}

export interface PrayerListItems {
  [key: number]: PrayerListItem;
}
