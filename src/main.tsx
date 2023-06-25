import React from "react";
import ReactDOM from "react-dom/client";
import Form, { FormQuestion } from "./Form.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <h3>My Form Example</h3>
        <p>right now the form's position is set to be abosulte, but you can control it with the value `relative`</p>
        <Form showProgress={true}
        pages={[1,1,1,1,1]}
            OnComplete={(answers) => {
                alert(JSON.stringify(answers));
            }}
            questions={[
                {
                    title: "1: Birthdate",
                    answerType: "boolean",
                    required: true,
                } as FormQuestion,
                {
                    title: "2: Birthdate",
                    answerType: "boolean",
                    required: true,
                } as FormQuestion,
                {
                    title: "3: Age",
                    answerType: "options",
                    required: true,
                    options: ["Hey", "There", "Liitle", "Kids"],
                    multiple: true,
                } as FormQuestion,
                {
                    title: "4 Question: Are you married?",
                    answerType: "choise",
                    required: false,
                } as FormQuestion,
                {
                    title: "5 Question: Name",
                    answerType: "string",
                    required: true,
                } as FormQuestion,
                {
                    title: "6 Question: What is your favorite color?",
                    answerType: "string",
                    required: false,
                } as FormQuestion,
                {
                    title: "7 Question: Income",
                    answerType: "number",
                    required: true,
                } as FormQuestion,
                {
                    title: "8 Question: How many siblings do you have?",
                    answerType: "number",
                    required: false,
                } as FormQuestion,
                {
                    title: "9 Question: When did you last travel?",
                    answerType: "date",
                    required: false,
                } as FormQuestion,
                {
                    title: "10 Question: Are you a student?",
                    answerType: "boolean",
                    required: true,
                } as FormQuestion,
                {
                    title: "11 Question: Did you enjoy this form?",
                    answerType: "boolean",
                    required: false,
                } as FormQuestion,
            ]}
        />
    </React.StrictMode>
);
