import React from 'react';
import { PrayerListItem } from '../../datamodel/PrayerListItem';
import { PrayerListAPI } from '../../mocks/apis/PrayerListAPI';
import { PrayerCards } from './PrayerCards';
import { PrayerSnapshot } from './PrayerSnapshot';

interface PrayerListState {
  items: PrayerListItem[];
}

interface PrayerListProperties {
  fullList: boolean;
  cards: boolean;
}

export class PrayerList extends React.Component<PrayerListProperties, PrayerListState> {
  public static defaultProps = {
    fullList: false,
    cards: true,
  };

  constructor(props: PrayerListProperties) {
    super(props);

    this.state = {
      items: [],
    };
  }

  async componentDidMount() {
    const items: PrayerListItem[] = PrayerListAPI.getPrayerItems();

    this.setState({ items });
  }

  render() {
    const items = this.state.items.filter((item) => {
      return this.props.fullList || !item.completed;
    });

    if (this.props.cards) {
      return <PrayerCards items={items} />;
    } else {
      return <PrayerSnapshot />;
    }
  }
}
