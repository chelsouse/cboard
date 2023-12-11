import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import TableCard from './TableCard.component';

describe('TableCard', () => {
  it('renders correctly with required props', () => {
    const title = 'Sample Title';
    const data = [{ id: 1, name: 'John' }, { id: 2, name: 'Doe' }];
    const tableHead = ['ID', 'Name'];

    const wrapper = shallow(
      <TableCard title={title} data={data} tableHead={tableHead} />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders with minimal data', () => {
    const title = 'Minimal Title';
    const data = [];
    const tableHead = [];

    const wrapper = shallow(
      <TableCard title={title} data={data} tableHead={tableHead} />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
