import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Event from "./Event";
import { EventButton } from "../../../types";

export default {
  title: "Event",
  component: Event,
} as ComponentMeta<typeof Event>;

const Template: ComponentStory<typeof Event> = (args: EventButton) => (
  <Event {...args} />
);

export const Normal = Template.bind({});
Normal.args = {
  name: "Прогулка",
  src: "images/child_care.svg",
  color: "red",
};
//
// export const Disabled = Template.bind({});
// Disabled.args = {
//   disabled: true,
//   children: 'Disabled',
// };
