import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Cards } from "./index";
import { CardsContainerProps } from "./CardsContainer";

export default {
  title: "Cards",
  component: Cards,
} as ComponentMeta<typeof Cards>;

const Template: ComponentStory<typeof Cards> = (args: CardsContainerProps) => (
  <Cards {...args} />
);

export const Normal = Template.bind({});
Normal.args = {
  value: 3,
};
