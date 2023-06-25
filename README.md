# Customizable Form Component
i did this insted of a full react project (maybe later). i did this for the experience, gaining knowledge (which most of that i already knew) and show progress of my learning. the rest of this `README.md` was written by chat-gpt. the way of explaining he use can surpasses mine.

The Form Component was written with TypeScript and React.js without any help of chat-gpt or learning sites, all from my previus knowledge or use of React in the past (which may involve chat-gpt back in those days).

The Form Component script includes 870 lines of code (after using Prettier).

# Introduction
## How to Use
This form component allows users to create and display customizable forms. It accepts various props to configure its behavior and captures user inputs. To use the component, follow these steps:

Import the Form component from the provided script.
```js
import Form from "./Form";
```

Create an array of `FormQuestion` objects that define the questions to be displayed in the form. Each question object should have the following properties:

* `title` (string): The title or prompt for the question.
* `required` (boolean): Indicates whether the question is required or not.
* `defualtValue` (optional): Specifies the default value for the question.
* `answerType` (string): The type of answer expected for the question. Possible values are: "range", "choise", "number", "string", "boolean", "date", or "options".
* Additional properties based on the `answerType`. For example, for `answerType` "options", include an options property that is an array of string options.

Here's an example of defining the questions:
```js
const questions = [
  {
    title: "Question 1",
    required: true,
    answerType: "boolean",
  },
  {
    title: "Question 2",
    required: false,
    answerType: "string",
  },
  // Add more questions...
];
```

Render the Form component and pass the questions array as the questions prop.
```js
<Form questions={questions} />
```

Optionally, you can handle the form completion by providing a callback function to the OnComplete prop. This function will receive the form answers as an argument.

```js
<Form
  questions={questions}
  OnComplete={(answers) => {
    // Handle the form answers here
    console.log(answers);
  }}
/>
```

Customize the form by providing additional props like pages, afterText, and showProgress. These props allow you to control the form's pagination, display a message after form completion, and show a progress bar.

```js
<Form
  questions={questions}
  pages={[2, 3, 4]} // Specify the number of questions on each page
  afterText="Thank you for completing the form!" // Display a custom message after form completion
  showProgress={true} // Show a progress bar indicating form completion
/>
```

## Logic Behind the Component
The form component follows a modular structure to handle the rendering and capturing of user inputs. Here's a general overview of the component's logic:

1. The component renders a set of questions based on the provided `questions` array. Each question is rendered using the `DisplayQuestion` or `DisplayQuestionAlone` component, depending on whether pagination is enabled (`pages` prop).

2. The user interacts with the questions and provides answers. The answers are stored in the component's state.

3. If pagination is enabled (`pages` prop), the user can navigate between pages using the backward and forward buttons. The current page index is tracked in the component's state.

4. If pagination is disabled, all questions are rendered on a single page, and the user can navigate between questions using the backward and forward buttons.

5. Once the user completes the form by either answering all questions or navigating to the last page, the form's completion is handled. If an `OnComplete` callback function is provided, it is invoked with the form answers as an argument.

6. After form completion, an optional custom message can be displayed using the afterText prop.

7. Additionally, a progress bar can be displayed using the `showProgress` prop, indicating the completion progress of the form.

The component provides flexibility in defining various question types, including boolean, string, number, date, and options. Each question type is rendered with an appropriate input field for the user to provide their answer.

Please refer to the code for detailed implementation and customization options.

## Customizable CSS Styles
This project includes a default CSS file (styles.css) that provides styling for various elements. However, if you prefer to customize the appearance of the elements, you have the flexibility to create your own CSS file insted of the default styles.

Or if you would like, The following elements can be customized:

* `Font Family`: By modifying the --font-family CSS variable, you can change the font used throughout the form.

* `Background Color`: The background color of buttons and options can be adjusted by changing the --background-color CSS variable.

* `Primary Color`: Customize the color of submit buttons and selected options by modifying the --primary-color CSS variable.

* `Secondary Color`: The background color of boolean buttons can be changed by adjusting the --secondary-color CSS variable.

* `Highlight Color`: Modify the color of selected boolean buttons using the --highlight-color CSS variable.

* `Header Font Weight`: Change the font weight of question headers by modifying the --header-font-weight CSS variable.

* `Header Font Family`: Adjust the font family of question headers by changing the --header-font-family CSS variable.

## Coding Time
* **First Day**: Implemented the basic form structure without the pagination system. Created the React Componenet and my CSS Style to create a functional good-looking form.
* **Second Day**: Added the pagination system to the form, allowing users to devide questions through different sections. Implemented customizable CSS styling to provide flexibility in modifying the appearance of the form. Users can easily customize the font family, background color, primary color, secondary color, highlight color, and more by adjusting the CSS variables provided in the code.

## Advanced Questions
The form component supports advanced question types that provide additional customization options. Here's a breakdown of the advanced question types and their properties:

### Options Question
The options question type allows users to select multiple options or a single option from a predefined list. It has the following additional properties:

* `options`  (array of strings): Specifies the available options for the question.
* `multiple` (boolean): Indicates whether multiple options can be selected or not.

Example:
```js
{
  title: "Question",
  answerType: "options",
  required: true,
  options: ["Option 1", "Option 2", "Option 3"],
  multiple: true,
}
```

### Range, Choise, and Number Questions
he range, choice, and number questions allow users to provide numerical inputs within specified ranges or choices. They have the following additional properties:

* `min` (number): Specifies the minimum value allowed.
* `max` (number): Specifies the maximum value allowed.
* `steps` (number): Determines the increment or decrement value for the range or number.

Example:
```js
{
  title: "Question",
  answerType: "range",
  required: true,
  min: 0,
  max: 10,
  steps: 1,
}
```

### String and Number Questions with Placeholder
The string and number question types allow users to provide text or numerical inputs. They can also include a placeholder text to guide the user. The `placeholder` property works for `answerType` "string" and "number".

Example:
```js
{
  title: "Question",
  answerType: "string",
  required: true,
  placeholder: "Enter your answer here",
}

```
```js
{
  title: "Question",
  answerType: "number",
  required: true,
  placeholder: "Enter a number",
}

```

### Default Value Type
The `defaultValue` property in the `FormQuestion` type allows you to provide a default value for each question based on its `answerType`. Here's a summary of the expected value types for each `answerType`:

* For `answerType: "boolean"`, use a boolean value (true or false).
* For `answerType: "string"`, use a string value.
* For `answerType: "date"`, use a Date object.
* For `answerType: "number"`, use a number or an array of numbers.
* For `answerType: "options"`, use an array of numbers corresponding to the selected options' indices.

The form component handles the conversion and rendering of the default values based on the `answerType`.

Additionally, the form component implements a date system that formats the Date class to fit the `input type="date" `structure. This enables users to easily select and submit dates as part of their form answers.