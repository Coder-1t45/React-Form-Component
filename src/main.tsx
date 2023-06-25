import React from "react";
import ReactDOM from "react-dom";
import Form, { FormQuestion } from "./Form.tsx";

ReactDOM.render(
  <React.StrictMode>
    <Form
      showProgress={true}
      pages={[1, 2, 1]}
      OnComplete={(answers) => {
        alert(JSON.stringify(answers));
      }}
      questions={[
        {
            title: "0. Pick up a number",
            answerType: "choise",
            min:1,
            max:5,
            required: true,
          } as FormQuestion,
        {
          title: "1. What is your full name?",
          answerType: "string",
          required: true,
        } as FormQuestion,
        {
          title: "2. How old are you?",
          answerType: "number",
          required: true,
          placeholder: "Enter your age",
        } as FormQuestion,
        {
          title: "3. Are you currently employed?",
          answerType: "boolean",
          required: true,
        } as FormQuestion,
        {
          title: "4. What is your highest level of education?",
          answerType: "options",
          required: true,
          options: [
            "High School",
            "Associate's Degree",
            "Bachelor's Degree",
            "Master's Degree",
            "PhD",
          ],
        } as FormQuestion,
        {
          title: "5. How would you rate your problem-solving skills?",
          answerType: "range",
          required: true,
          min: 1,
          max: 10,
          steps: 1,
        } as FormQuestion,
        {
          title: "6. Have you ever traveled abroad?",
          answerType: "boolean",
          required: true,
        } as FormQuestion,
        {
          title: "7. What is your current annual income?",
          answerType: "number",
          required: true,
          placeholder: "Enter your annual income",
        } as FormQuestion,
        {
          title: "8. How many languages do you speak?",
          answerType: "number",
          required: true,
          placeholder: "Enter the number of languages",
        } as FormQuestion,
        {
          title: "9. When was the last time you read a book?",
          answerType: "date",
          required: true,
        } as FormQuestion,
      ]}
    />
  </React.StrictMode>,
  document.getElementById("root")
);
