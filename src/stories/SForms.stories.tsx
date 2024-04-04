import React, { useEffect, useRef, useState } from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";
import SForms from "../components/SForms";

import form1 from "./assets/form/aircraftForm.json"; // form with wizard steps
import form2 from "./assets/form/form2.json"; // form without wizard steps (proudly assembled in Semantic Form Web Editor)
import touristDestinationForm1 from "./assets/form/touristDestinationForm1.json";
import touristDestinationForm2 from "./assets/form/touristDestinationForm2.json";
import occurrenceReportingForm from "./assets/form/occurrenceReportingForm.json";

import queryString from "query-string";
import Constants from "../constants/Constants";
import possibleValues from "./assets/possibleValues.json";

const getP = (queryParameterName: string, defaultValue: string) => {
  return {
    [queryParameterName]: getQueryParameter(queryParameterName, defaultValue),
  };
};

const getQueryParameter = (parameterName: string, defaultValue: string) => {
  const value = queryString.parse(window.location.search)[parameterName];
  if (value) {
    return value;
  }
  return defaultValue;
};

const modalProps = {
  show: true,
  title: "Title",
};

export default {
  title: "Stories/Forms",
  component: SForms,
} as ComponentMeta<typeof SForms>;

const Template: ComponentStory<typeof SForms> = (
  args,
  {
    globals: {
      iconBehavior,
      locale,
      debugMode,
      horizontalNavBar,
      timeOut,
      printFormSpecification,
    },
  }
) => {
  const options = {
    i18n: {
      "wizard.next": "Next",
      "wizard.previous": "Previous",
      "section.expand": "Expand",
      "section.collapse": "Collapse",
    },
    intl: {
      locale: locale,
    },
    modalView: false,
    modalProps,
    horizontalWizardNav: horizontalNavBar,
    wizardStepButtons: true,
    enableForwardSkip: true,
    ...getP("startingQuestionId", "layout-options-65"),
    startingStep: 1,
    debugMode: debugMode,
    users: [
      { id: "http://fel.cvut.cz/people/max-chopart", label: "Max Chopart" },
      {
        id: "http://fel.cvut.cz/people/miroslav-blasko",
        label: "Miroslav Blasko",
      },
    ],
    currentUser: "http://fel.cvut.cz/people/max-chopart",
    icons: [
      {
        id: Constants.ICONS.QUESTION_HELP,
        behavior: iconBehavior,
      },
      {
        id: Constants.ICONS.QUESTION_LINK,
        behavior: iconBehavior,
      },
      {
        id: Constants.ICONS.QUESTION_COMMENTS,
        behavior: iconBehavior,
      },
    ],
  };

  const fetchTypeAheadValues = () => {
    return new Promise((resolve) =>
      setTimeout(() => resolve(possibleValues), timeOut)
    );
  };

  const [formSpecifications, setFormSpecifications] = useState<any>();
  const formRef = useRef();

  useEffect(() => {
    if (formRef.current) {
      const formRefCurrent: any = formRef.current;
      setFormSpecifications(formRefCurrent.printFormSpecification());
    }
  }, [printFormSpecification]);

  useEffect(() => {
    console.log(formSpecifications);
  }, [formSpecifications]);

  return (
    <SForms
      {...args}
      ref={formRef}
      options={options}
      fetchTypeAheadValues={fetchTypeAheadValues}
    />
  );
};

export const Form1 = Template.bind({});
Form1.args = {
  form: form1,
};

export const Form2 = Template.bind({});
Form2.args = {
  form: form2,
};

export const TouristDestinationForm1 = Template.bind({});
TouristDestinationForm1.args = {
  form: touristDestinationForm1,
};

export const TouristDestinationForm2 = Template.bind({});
TouristDestinationForm2.args = {
  form: touristDestinationForm2,
};

export const OccurenceReportingForm = Template.bind({});
OccurenceReportingForm.args = {
  form: occurrenceReportingForm,
};
