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
  date: string;
  id: string;
}
