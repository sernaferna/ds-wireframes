export enum PrayerTypes {
  request,
  praise,
  confession,
}

export interface BasePrayerListItem {
  title: string;
  text: string;
  completed: boolean;
  type?: PrayerTypes;
}

export interface PrayerListItem extends BasePrayerListItem {
  id: string;
  date: string;
}

export interface PrayerListItems {
  [key: number]: PrayerListItem;
}
