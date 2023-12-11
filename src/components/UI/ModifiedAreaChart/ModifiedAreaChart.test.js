import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import ModifiedAreaChart from './ModifiedAreaChart.component';

jest.mock('echarts-for-react', () => 'div');

describe('ModifiedAreaChart', () => {
  it('renders correctly', () => {
    const height = 300;
    const option = {};

    const wrapper = shallow(
      <ModifiedAreaChart height={height} option={option} />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
