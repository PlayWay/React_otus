import React from 'react';
import {render,screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import {Events} from "./Events";
import userEvent from "@testing-library/user-event";

const events = [
  {
    name: "Кормление",
    src: "images/child_care.svg",
    color: "red",
    type: 1
  },
  {
    name: "Сон",
    src: "images/moon-fill.svg",
    color: "green",
    type: 2
  },
  {
    name: "Прогулка",
    src: "images/moon-fill.svg",
    color: "green",
    type: 3
  }
]

describe('Events', () => {
  it('markup event list', () => {
    const onEventClick = jest.fn()
    render(<Events events={events} onEventClick={onEventClick}/>)
    expect(screen.getAllByRole("button").length).toBe(3)
  });
  it('call button click func', async () => {
    const onEventClick = jest.fn()
    render(<Events events={events} onEventClick={onEventClick}/>)
    const buttons = screen.getAllByRole("button")
    await userEvent.click(buttons[1])
    expect(onEventClick).toHaveBeenCalledWith(2)
  });
});