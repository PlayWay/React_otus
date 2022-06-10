import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import Card, { CardProps } from "./index";

export default {
  title: "Card",
  component: Card,
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args: CardProps) => (
  <Card {...args} />
);

export const Normal = Template.bind({});
Normal.args = {
  color: "red",
  active: false,
};
