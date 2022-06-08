import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import User from "./User";
import { UsersResponseType } from "../helper";

export default {
  title: "User",
  component: User,
} as ComponentMeta<typeof User>;

const Template: ComponentStory<typeof User> = (args: UsersResponseType) => (
  <User {...args} />
);

export const Normal = Template.bind({});
Normal.args = {
  name: "Иван",
  username: "Ivan",
  email: "test@mail.ru",
  website: "ya.ru",
  phone: "555-3-555",
};
