import React from 'react';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

interface PrayerSettingsState {
  showAllPrayerItems: boolean;
}

export class PrayerSettings extends React.Component<{}, PrayerSettingsState> {
  constructor(props: any) {
    super(props);

    this.state = {
      showAllPrayerItems: true,
    };

    this.changeFilterOption = this.changeFilterOption.bind(this);
  }

  private changeFilterOption() {
    this.setState((prevState) => ({
      showAllPrayerItems: !prevState.showAllPrayerItems,
    }));
  }

  render() {
    return (
      <Form>
        <div key="prayerFilterOptions">
          <Form.Check
            type="radio"
            id="showAllPrayerItemsRadio"
            label="Show All Prayer Items"
            name="prayerFilter"
            checked={this.state.showAllPrayerItems}
            onClick={this.changeFilterOption}
          />
          <Form.Check
            type="radio"
            id="showActivePrayerItemsRadio"
            label="Show Active Prayer Items"
            name="prayerFilter"
            checked={!this.state.showAllPrayerItems}
            onClick={this.changeFilterOption}
          />
        </div>
        <FloatingLabel controlId="sortBySelect" label="Sort By?">
          <Form.Select aria-label="Sort By?">
            <option value="dateAsc">Date Ascending</option>
            <option value="dateDesc">Date Descending</option>
          </Form.Select>
        </FloatingLabel>
      </Form>
    );
  }
}
