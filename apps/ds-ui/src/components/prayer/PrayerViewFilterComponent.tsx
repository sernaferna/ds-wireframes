import React, { ChangeEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPrayerViewFilter, updatePrayerViewFilter } from '../../stores/UISlice';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

export const PrayerViewFilterComponent = () => {
  const filterString = useSelector(getPrayerViewFilter);
  const dispatch = useDispatch();

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(updatePrayerViewFilter(e.target.value));
  };

  return (
    <Form>
      <FloatingLabel controlId="floatingInput" label="Filter prayer requests..." className="mb-3">
        <Form.Control
          type="search"
          value={filterString}
          onChange={handleTextChange}
          placeholder="Filter prayer requests..."
        />
      </FloatingLabel>
    </Form>
  );
};
