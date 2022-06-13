import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Cards } from "./index";
import { CardsContainerProps } from "./CardsContainer";
import { GameContext } from "../Main/MainContainer";
import { mockCards } from "../../mocks/cards";

export default {
  title: "Cards",
  component: Cards,
} as ComponentMeta<typeof Cards>;

const Template: ComponentStory<typeof Cards> = (args: CardsContainerProps) => (
  <GameContext.Provider
    value={{
      status: "process",
      gameInfo: {
        searchColor: "red",
        filledArray: mockCards,
        winSeries: [],
      },
      control: {
        reset: () => ({}),
        start: () => ({}),
        replay: () => ({}),
        endGame: () => ({}),
        process: () => ({}),
      },
    }}
  >
    <Cards {...args} />
  </GameContext.Provider>
);

export const Normal = Template.bind({});
