import React from "react";
import QuestionCommentIcon from "../components/comment/QuestionCommentIcon";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import IntlContextProvider from "../contexts/IntlContextProvider";
import { ConfigurationContextProvider } from "../contexts/ConfigurationContext";
import { userEvent, within } from "@storybook/testing-library";
import { expect } from '@storybook/jest';

import question from "./assets/question/question.json";
import questionWithComment from "./assets/question/questionWithComment.json";

export default {
  title: "Components/QuestionCommentIcon",
  component: QuestionCommentIcon,
} as ComponentMeta<typeof QuestionCommentIcon>;

const Template: ComponentStory<typeof QuestionCommentIcon> = (
  args,
  { globals: { locale } }
) => {
  const options = {
    intl: {
      locale: locale,
    },
    users: [
      { id: "http://fel.cvut.cz/people/max-chopart", label: "Max Chopart" },
      {
        id: "http://fel.cvut.cz/people/miroslav-blasko",
        label: "Miroslav Blasko",
      },
    ],
    currentUser: "http://fel.cvut.cz/people/max-chopart",
  };
  return (
    <ConfigurationContextProvider options={options}>
      <IntlContextProvider locale={locale}>
        <QuestionCommentIcon {...args} />
      </IntlContextProvider>
    </ConfigurationContextProvider>
  );
};

export const Default = Template.bind({});
Default.args = {
  question: question,
};

export const TooltipOpen = Template.bind({});
TooltipOpen.args = {
  question: question,
};
TooltipOpen.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await userEvent.click(canvas.getByTestId("comment-bubble"));
};

export const WithComment = Template.bind({});
WithComment.args = {
  question: questionWithComment,
};

export const TooltipOpenWithComment = Template.bind({});
TooltipOpenWithComment.args = {
  question: questionWithComment,
};

TooltipOpenWithComment.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await userEvent.click(canvas.getByTestId("comment-bubble"));
  await expect(canvas.getByRole('tooltip')).toBeInTheDocument();
  await expect(canvas.getByText("Hello, my name is Max Chopart")).toBeInTheDocument();
};

