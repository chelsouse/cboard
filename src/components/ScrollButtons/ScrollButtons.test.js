import React from 'react';
import { shallow, mount } from 'enzyme';
import ScrollButtons from './ScrollButtons';
import { TOP_OFFSET } from './ScrollButtons';

describe('ScrollButtons', () => {
  it('renders ScrollButtons component', () => {
    const wrapper = shallow(<ScrollButtons />);
    expect(wrapper.exists()).toBeTruthy();
  });

  it('does not render scroll up button when not active', () => {
    const scrollUpMock = jest.fn();
    const boardContainerMock = {
      current: { scrollTop: 10, className: 'Grid_root' }
    };

    const wrapper = shallow(
      <ScrollButtons
        scrollUp={scrollUpMock}
        boardContainer={boardContainerMock}
        active={false}
        isNavigationButtonsOnTheSide={false}
      />
    );

    const scrollUpButton = wrapper.find('button[aria-label="scroll up"]');

    expect(scrollUpButton.exists()).toBeFalsy();
    expect(scrollUpMock).not.toHaveBeenCalled();
  });

  it('calls scrollUp function when the scroll up button is clicked at the top', async () => {
    const scrollUpMock = jest.fn();
    const boardContainerMock = {
      current: { scrollTop: 0, className: 'Grid_root' }
    };

    const wrapper = shallow(
      <ScrollButtons
        scrollUp={scrollUpMock}
        boardContainer={boardContainerMock}
        active={true}
        isNavigationButtonsOnTheSide={false}
      />
    );

    await Promise.resolve();

    setTimeout(() => {
      wrapper.find('button[aria-label="scroll up"]').simulate('click');
      expect(scrollUpMock).toHaveBeenCalled();
    }, 0);
  });
});
