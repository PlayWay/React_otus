import React from 'react';
import {render,screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import Event from "./Event";

describe("Event", () => {
  it('has expected markup', () => {
    render(<Event name="Прогулка" src="/child_care.svg" color="red"/>)
    expect(screen.getByTestId("event-img-wrap")).toBeInTheDocument()
    expect(screen.getByTestId("event-img")).toBeInTheDocument()
    expect(screen.getByTestId("event-name")).toBeInTheDocument()
  });
  it('access props values', () => {
    render(<Event name="Прогулка" src="/child_care.svg" color="green"/>)
    expect(getComputedStyle(screen.getByTestId("event-img-wrap")).backgroundColor).toBe("green")
    expect(screen.getByTestId("event-name").textContent).toBe("Прогулка")
  });
})