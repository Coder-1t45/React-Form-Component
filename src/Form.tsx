import React, { useState, useEffect, createRef } from "react";
import "./form.css";
export type FormQuestion = {
    title: string;
    required: boolean;
    defualtValue?: boolean | string | Date | number | number[];
    answerType:
        | "range"
        | "choise"
        | "number"
        | "string"
        | "boolean"
        | "date"
        | "options";
    min?: number;
    max?: number;
    steps?: number;
    placeholder?: string;
    options?: string[];
    multiple?: boolean;
};

type Answer = string | number | Date | boolean | number[];

function range(start: number, end: number, steps: number = 1): Array<number> {
    const l = [];
    for (let index = start; index <= end; index += steps) {
        l.push(index);
    }
    return l;
}

function DisplayQuestion({
    question,
    onAnswer,
    isSubmitting,
}: {
    question: FormQuestion;
    onAnswer?: (arg: Answer) => void;
    isSubmitting?: boolean;
}) {
    const [answer, SetAnswer] = useState<Answer | undefined>(undefined);
    const ref = createRef<HTMLDivElement>();
    function chooseButtonClicked(
        b: boolean | number | undefined,
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) {
        if (ref.current) {
            const buttons = ref.current.querySelectorAll("button.boolean");
            for (const x of buttons) {
                x.setAttribute("data-selected", "false");
            }
            if (b != undefined)
                e.currentTarget.setAttribute("data-selected", "true");
        }
        SetAnswer(b);
        if (b != undefined && onAnswer) onAnswer(b);
    }

    function chooseOptionClicked(
        b: number,
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) {
        if (ref.current) {
            const buttons = ref.current.querySelectorAll("button.option");
            for (const x of buttons) {
                x.setAttribute("data-selected", "false");
            }
            if (b != -1) e.currentTarget.setAttribute("data-selected", "true");
        }
        if (b != -1) SetAnswer(b);
        else SetAnswer(undefined);
        return false;
    }

    return (
        <div className="questions">
            <p className="question">{question.title}</p>
            <div ref={ref} style={{ maxWidth: "none" }}>
                {" "}
                <center>
                    {question.answerType == "boolean" ? (
                        <>
                            <button
                                className="boolean"
                                onClick={(evea) => {
                                    chooseButtonClicked(true, evea);
                                }}
                            >
                                True
                            </button>
                            <button
                                className="boolean"
                                onClick={(evea) => {
                                    chooseButtonClicked(false, evea);
                                }}
                            >
                                False
                            </button>
                            <br></br>
                        </>
                    ) : question.answerType == "choise" ? (
                        <>
                            {range(
                                question.min ?? 1,
                                question.max ?? 10,
                                question.steps ?? 1
                            ).map((value) => (
                                <button
                                    className="boolean"
                                    onClick={(evea) => {
                                        chooseButtonClicked(false, evea);
                                    }}
                                >
                                    {value}
                                </button>
                            ))}
                        </>
                    ) : question.answerType == "options" ? (
                        <div className="options">
                            {question.multiple ?? false ? (
                                <>
                                    {!question.options ? (
                                        <p>
                                            {"<to-devs> add options proprety!"}
                                        </p>
                                    ) : (
                                        question.options.map((v, index) => (
                                            <button
                                                data-selected={
                                                    answer
                                                        ? (
                                                              answer as number[]
                                                          ).includes(index)
                                                        : false
                                                }
                                                className="option"
                                                onClick={() => {
                                                    if (answer == undefined) {
                                                        SetAnswer([index]);
                                                    } else {
                                                        if (
                                                            (
                                                                answer as number[]
                                                            ).includes(index)
                                                        ) {
                                                            const l: number[] =
                                                                [];
                                                            for (const x of answer as number[]) {
                                                                if (
                                                                    x != index
                                                                ) {
                                                                    l.push(x);
                                                                }
                                                            }
                                                            SetAnswer(l);
                                                        } else {
                                                            SetAnswer((old) => [
                                                                ...(old
                                                                    ? (old as number[])
                                                                    : []),
                                                                index,
                                                            ]);
                                                        }
                                                    }
                                                }}
                                            >
                                                {v}
                                            </button>
                                        ))
                                    )}
                                </>
                            ) : (
                                <>
                                    {!question.options ? (
                                        <p>
                                            {"<to-devs> add options proprety!"}
                                        </p>
                                    ) : (
                                        question.options.map((v, index) => (
                                            <button
                                                className="option"
                                                onClick={(evea) => {
                                                    if (answer == undefined) {
                                                        chooseOptionClicked(
                                                            index,
                                                            evea
                                                        );
                                                    } else {
                                                        if (
                                                            (answer as number) ==
                                                            index
                                                        ) {
                                                            chooseOptionClicked(
                                                                -1,
                                                                evea
                                                            );
                                                        } else {
                                                            chooseOptionClicked(
                                                                index,
                                                                evea
                                                            );
                                                        }
                                                    }
                                                }}
                                            >
                                                {v}
                                            </button>
                                        ))
                                    )}
                                </>
                            )}
                        </div>
                    ) : question.answerType == "date" ? (
                        <>
                            <input
                                defaultValue={
                                    question.defualtValue
                                        ? typeof question.defualtValue ===
                                          "string"
                                            ? question.defualtValue
                                            : question.defualtValue instanceof
                                              Date
                                            ? question.defualtValue
                                                  .toISOString()
                                                  .split("T")[0]
                                            : ""
                                        : ""
                                }
                                type="date"
                                onKeyDown={(e) => {
                                    SetAnswer(e.currentTarget.value);
                                }}
                                onChange={(e) => {
                                    SetAnswer(e.currentTarget.value);
                                }}
                            />
                        </>
                    ) : question.answerType == "number" ? (
                        <>
                            <input
                                defaultValue={(
                                    question.defualtValue ?? ""
                                ).toString()}
                                placeholder={
                                    question.placeholder ?? "Number Type Answer"
                                }
                                type="number"
                                onKeyDown={(e) => {
                                    if (
                                        (e.which != 8 &&
                                            e.which != 0 &&
                                            e.which < 48) ||
                                        e.which > 57
                                    ) {
                                        e.preventDefault();
                                    }
                                    const value = parseFloat(
                                        e.currentTarget.value
                                    );

                                    if (
                                        isNaN(value) ||
                                        value == null ||
                                        e.currentTarget.value.length == 0
                                    )
                                        SetAnswer(undefined);
                                    else SetAnswer(value);
                                }}
                                onChange={(e) => {
                                    const value = parseFloat(
                                        e.currentTarget.value
                                    );

                                    if (
                                        isNaN(value) ||
                                        value == null ||
                                        e.currentTarget.value.length == 0
                                    )
                                        SetAnswer(undefined);
                                    else SetAnswer(value);
                                }}
                            ></input>
                        </>
                    ) : question.answerType == "range" ? (
                        <>
                            <input
                                type="range"
                                min={question.min ?? 0}
                                max={question.max ?? 1}
                                step={question.steps ?? 0.001}
                                onChange={(e) => {
                                    SetAnswer(
                                        parseFloat(e.currentTarget.value)
                                    );
                                }}
                            ></input>
                        </>
                    ) : question.answerType == "string" ? (
                        <>
                            <input
                                placeholder={
                                    question.placeholder ?? "String Type Answer"
                                }
                                defaultValue={(
                                    question.defualtValue ?? ""
                                ).toString()}
                                type="text"
                                onKeyDown={(e) => {
                                    SetAnswer(e.currentTarget.value);
                                }}
                                onChange={(e) => {
                                    SetAnswer(e.currentTarget.value);
                                }}
                            ></input>
                        </>
                    ) : (
                        <></>
                    )}
                </center>{" "}
            </div>
            <center>
                <button
                    className="submit"
                    disabled={
                        answer == undefined ||
                        (typeof answer === "string"
                            ? answer.length == 0
                            : false)
                    }
                    onClick={() => {
                        onAnswer && answer != undefined ? onAnswer(answer) : "";
                        SetAnswer(undefined);
                        const buttons =
                            document.querySelectorAll("button.boolean");
                        for (const x of buttons) {
                            x.setAttribute("data-selected", "false");
                        }

                        if (ref.current) {
                            // List all Text Inputs
                            ref.current
                                .querySelectorAll("input")
                                .forEach((v) => {
                                    (v as HTMLInputElement).value = "";
                                });
                        }
                    }}
                >
                    {" "}
                    {isSubmitting ?? false ? "Submit" : "Answer"}
                </button>
            </center>
        </div>
    );
}

function DisplayQuestionAlone({
    question,
    onAnswer,
    disabled,
}: {
    question: FormQuestion;
    onAnswer?: (arg: Answer) => void;
    disabled?: boolean;
}) {
    const [answer, SetAnswer] = useState<Answer | undefined>(undefined);

    useEffect(() => {
        onAnswer && answer != undefined ? onAnswer(answer) : "";
    }, [answer]);
    // useEffect(()=>{SetAnswer(undefined)},[])
    const ref = createRef<HTMLDivElement>();
    function chooseButtonClicked(
        b: boolean | number,
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) {
        if (ref.current) {
            const buttons = ref.current.querySelectorAll("button.boolean");
            for (const x of buttons) {
                x.setAttribute("data-selected", "false");
            }
            e.currentTarget.setAttribute("data-selected", "true");
        }
        SetAnswer(b);
        onAnswer ? onAnswer(b) : "";
    }

    function chooseOptionClicked(
        b: number,
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) {
        if (ref.current) {
            const buttons = ref.current.querySelectorAll("button.option");
            for (const x of buttons) {
                x.setAttribute("data-selected", "false");
            }
            if (b != -1) e.currentTarget.setAttribute("data-selected", "true");
        }
        if (b != -1) SetAnswer(b);
        else SetAnswer(undefined);
        return false;
    }

    return (
        <div
            className="alone"
            Data-ClearEvent={() => {
                SetAnswer(undefined);
            }}
            style={
                disabled ?? false ? { opacity: 0.5, pointerEvents: "none" } : {}
            }
        >
            <p className="question alone">{question.title}</p>
            <div ref={ref} style={{ maxWidth: "none" }}>
                {" "}
                <center>
                    {question.answerType == "boolean" ? (
                        <>
                            <button
                                className="boolean"
                                onClick={(e) => chooseButtonClicked(true, e)}
                            >
                                True
                            </button>
                            <button
                                className="boolean"
                                onClick={(e) => chooseButtonClicked(false, e)}
                            >
                                False
                            </button>
                            <br></br>
                        </>
                    ) : question.answerType == "choise" ? (
                        <>
                            {range(
                                question.min ?? 1,
                                question.max ?? 10,
                                question.steps ?? 1
                            ).map((value) => (
                                <button
                                    className="boolean"
                                    onClick={(evea) => {
                                        chooseButtonClicked(value, evea);
                                    }}
                                >
                                    {value}
                                </button>
                            ))}
                        </>
                    ) : question.answerType == "options" ? (
                        <div className="options">
                            {question.multiple ?? false ? (
                                <>
                                    {!question.options ? (
                                        <p>
                                            {"<to-devs> add options proprety!"}
                                        </p>
                                    ) : (
                                        question.options.map((v, index) => (
                                            <button
                                                data-selected={
                                                    answer
                                                        ? (
                                                              answer as number[]
                                                          ).includes(index)
                                                        : false
                                                }
                                                className="option"
                                                onClick={() => {
                                                    if (answer == undefined) {
                                                        SetAnswer([index]);
                                                    } else {
                                                        if (
                                                            (
                                                                answer as number[]
                                                            ).includes(index)
                                                        ) {
                                                            const l: number[] =
                                                                [];
                                                            for (const x of answer as number[]) {
                                                                if (
                                                                    x != index
                                                                ) {
                                                                    l.push(x);
                                                                }
                                                            }
                                                            SetAnswer(l);
                                                        } else {
                                                            SetAnswer((old) => [
                                                                ...(old
                                                                    ? (old as number[])
                                                                    : []),
                                                                index,
                                                            ]);
                                                        }
                                                    }
                                                }}
                                            >
                                                {v}
                                            </button>
                                        ))
                                    )}
                                </>
                            ) : (
                                <>
                                    {!question.options ? (
                                        <p>
                                            {"<to-devs> add options proprety!"}
                                        </p>
                                    ) : (
                                        question.options.map((v, index) => (
                                            <button
                                                className="option"
                                                onClick={(evea) => {
                                                    if (answer == undefined) {
                                                        chooseOptionClicked(
                                                            index,
                                                            evea
                                                        );
                                                    } else {
                                                        if (
                                                            (answer as number) ==
                                                            index
                                                        ) {
                                                            chooseOptionClicked(
                                                                -1,
                                                                evea
                                                            );
                                                        } else {
                                                            chooseOptionClicked(
                                                                index,
                                                                evea
                                                            );
                                                        }
                                                    }
                                                }}
                                            >
                                                {v}
                                            </button>
                                        ))
                                    )}
                                </>
                            )}
                        </div>
                    ) : question.answerType == "date" ? (
                        <>
                            <input
                                defaultValue={
                                    question.defualtValue
                                        ? typeof question.defualtValue ===
                                          "string"
                                            ? question.defualtValue
                                            : question.defualtValue instanceof
                                              Date
                                            ? question.defualtValue
                                                  .toISOString()
                                                  .split("T")[0]
                                            : ""
                                        : ""
                                }
                                type="date"
                                onKeyDown={(e) => {
                                    SetAnswer(e.currentTarget.value);
                                }}
                                onChange={(e) => {
                                    SetAnswer(e.currentTarget.value);
                                }}
                            />
                        </>
                    ) : question.answerType == "number" ? (
                        <>
                            <input
                                defaultValue={(
                                    question.defualtValue ?? ""
                                ).toString()}
                                placeholder={
                                    question.placeholder ?? "Number Type Answer"
                                }
                                type="number"
                                onKeyDown={(e) => {
                                    if (
                                        (e.which != 8 &&
                                            e.which != 0 &&
                                            e.which < 48) ||
                                        e.which > 57
                                    ) {
                                        e.preventDefault();
                                    }
                                    const value = parseFloat(
                                        e.currentTarget.value
                                    );

                                    if (
                                        isNaN(value) ||
                                        value == null ||
                                        e.currentTarget.value.length == 0
                                    )
                                        SetAnswer(undefined);
                                    else SetAnswer(value);
                                }}
                                onChange={(e) => {
                                    const value = parseFloat(
                                        e.currentTarget.value
                                    );

                                    if (
                                        isNaN(value) ||
                                        value == null ||
                                        e.currentTarget.value.length == 0
                                    )
                                        SetAnswer(undefined);
                                    else SetAnswer(value);
                                }}
                            ></input>
                        </>
                    ) : question.answerType == "range" ? (
                        <>
                            <input
                                type="range"
                                min={question.min ?? 0}
                                max={question.max ?? 1}
                                step={question.steps ?? 0.001}
                                onChange={(e) => {
                                    SetAnswer(
                                        parseFloat(e.currentTarget.value)
                                    );
                                }}
                            ></input>
                        </>
                    ) : question.answerType == "string" ? (
                        <>
                            <input
                                placeholder={
                                    question.placeholder ?? "String Type Answer"
                                }
                                defaultValue={(
                                    question.defualtValue ?? ""
                                ).toString()}
                                type="text"
                                onKeyDown={(e) => {
                                    SetAnswer(e.currentTarget.value);
                                }}
                                onChange={(e) => {
                                    SetAnswer(e.currentTarget.value);
                                }}
                            ></input>
                        </>
                    ) : (
                        <></>
                    )}
                </center>{" "}
            </div>
        </div>
    );
}
function Form({
    questions,
    OnComplete,
    afterText,
    pages,
    showProgress,
}: {
    questions: FormQuestion[];
    OnComplete?: (args: Answer[]) => void;
    afterText?: string;
    pages?: Array<number>;
    showProgress?: boolean;
}) {
    if (pages) {
        const sum = (a: number[]) => {
            var s = 0;
            for (let index = 0; index < a.length; index++) {
                s += a[index];
            }
            return s;
        };
        function buildPages(p: number[]) {
            const clone = JSON.parse(JSON.stringify(p)) as number[];
            while (sum(clone) < questions.length) {
                clone.push(1);
            }
            return clone;
        }

        function sumUntil(p: number[], i: number) {
            if (i >= p.length) return sum(p);
            var s = 0;
            for (let index = 0; index <= i; index++) {
                s += p[index];
            }
            return s;
        }

        const PAGES = buildPages(pages);
        const [pIndex, SetPage] = useState<number>(0);
        const [answers, SetAnswers] = useState<Array<Answer>>([]);
        const [submitted, SetSubmitted] = useState<boolean>(false);
        const ref = React.createRef<HTMLDivElement>();

        function NoOneNull(a: Array<Answer>) {
            for (let index = 0; index < a.length; index++) {
                const element = a[index];
                if (
                    element == undefined ||
                    element == null ||
                    (typeof element === "string" ? element.length === 0 : false)
                )
                    return false;
            }
            return true;
        }

        function GetAnswersPageLength(): number {
            var l = answers.length;
            for (let index = 0; index < PAGES.length; index++) {
                l -= PAGES[index];
                if (l <= 0) return index;
            }
            return PAGES.length - 1;
        }

        return (
            <div className="iform">
                {JSON.stringify(answers)}
                {submitted == false ? (
                    <>
                        <div ref={ref} className="questions">
                            {range(1, PAGES[pIndex]).map((v) => {
                                var lastsIds = -1;
                                for (let index = 0; index < pIndex; index++) {
                                    lastsIds += PAGES[index];
                                }
                                const current = lastsIds + v;
                                return (
                                    <>
                                        <DisplayQuestionAlone
                                            key={current}
                                            disabled={answers.length < current}
                                            onAnswer={(arg: Answer) => {
                                                if (answers.length == current) {
                                                    SetAnswers((old) => [
                                                        ...old,
                                                        arg,
                                                    ]);
                                                } else {
                                                    answers[current] = arg;
                                                    SetAnswers(answers);
                                                }
                                            }}
                                            question={
                                                questions[
                                                    Math.min(
                                                        Math.max(0, current),
                                                        questions.length - 1
                                                    )
                                                ]
                                            }
                                        />
                                    </>
                                );
                            })}
                            <center>
                                <button
                                    className="submit"
                                    disabled={
                                        answers.length <
                                            sumUntil(PAGES, pIndex) &&
                                        NoOneNull(answers)
                                    }
                                    onClick={() => {
                                        if (pIndex == PAGES.length - 1) {
                                            SetSubmitted(true);
                                            OnComplete
                                                ? OnComplete(answers)
                                                : "";
                                        } else {
                                            SetPage(pIndex + 1);

                                            if (ref.current) {
                                                // List all Text Inputs

                                                ref.current
                                                    .querySelectorAll("input")
                                                    .forEach((v) => {
                                                        (
                                                            v as HTMLInputElement
                                                        ).value = "";
                                                    });
                                            }
                                        }
                                    }}
                                >
                                    {" "}
                                    {pIndex == PAGES.length - 1
                                        ? "Submit"
                                        : "Answer"}
                                </button>
                            </center>
                        </div>
                        <div>
                            <button
                                className="backward"
                                onClick={() => {
                                    SetPage(pIndex - 1);
                                }}
                                disabled={pIndex == 0}
                            >
                                {"<"}
                            </button>

                            <button
                                className="forward"
                                onClick={() => {
                                    SetPage(pIndex + 1);
                                }}
                                disabled={pIndex > GetAnswersPageLength()}
                            >
                                {">"}
                            </button>
                        </div>
                    </>
                ) : (
                    <p className="afterText">
                        {afterText ?? "Thank you for applying our servey!"}
                    </p>
                )}
                {showProgress ? (
                    <progress
                        value={answers.length / questions.length}
                        className="progress"
                    />
                ) : (
                    <></>
                )}
            </div>
        );
    } else {
        const [qIndex, SetIndex] = useState<number>(0);
        const [answers, SetAnswers] = useState<Array<Answer>>([]);
        const [submitted, SetSubmitted] = useState<boolean>(false);
        return (
            <div className="iform">
                {JSON.stringify(answers)}
                {submitted == false ? (
                    <>
                        <DisplayQuestion
                            key={qIndex}
                            isSubmitting={qIndex == questions.length - 1}
                            onAnswer={(arg: Answer) => {
                                if (answers.length == qIndex) {
                                    SetAnswers((old) => [...old, arg]);
                                } else {
                                    answers[qIndex] = arg;
                                    SetAnswers(answers);
                                }
                                if (qIndex < questions.length - 1)
                                    SetIndex(qIndex + 1);

                                if (qIndex == questions.length - 1) {
                                    // submitting
                                    OnComplete ? OnComplete(answers) : "";
                                    SetSubmitted(true);
                                }
                            }}
                            question={
                                questions[
                                    Math.min(
                                        Math.max(0, qIndex),
                                        questions.length - 1
                                    )
                                ]
                            }
                        />
                        <div>
                            <button
                                className="backward"
                                onClick={() => {
                                    SetIndex(qIndex - 1);
                                }}
                                disabled={qIndex == 0}
                            >
                                {"<"}
                            </button>

                            <button
                                className="forward"
                                onClick={() => {
                                    SetIndex(qIndex + 1);
                                }}
                                disabled={qIndex > answers.length - 1}
                            >
                                {">"}
                            </button>
                        </div>
                    </>
                ) : (
                    <p className="afterText">
                        {afterText ?? "Thank you for applying our servey!"}
                    </p>
                )}
                {showProgress ? (
                    <progress
                        value={answers.length / questions.length}
                        className="progress"
                    />
                ) : (
                    <></>
                )}
            </div>
        );
    }
}

export default Form;
