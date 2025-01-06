import axios from "axios";
import { createContext, ReactNode, useContext, useEffect, useReducer } from "react";
import { useAuth } from "./AuthContext";
import ISubject from "@/interfaces/Subject";
import IQuestion from "@/interfaces/Question";
import IQuiz from "@/interfaces/Quiz";
import IRule from "@/interfaces/Rule";

interface IInfoClassContextState {
    subjects: ISubject[];
    questions: IQuestion[];
    quizzes: IQuiz[];
    rules: IRule[];
}

interface IInfoClassContextProps extends IInfoClassContextState {
    dispatch: React.Dispatch<InfoClassAction>;
    handleSubjectCreate: (subjectData: Omit<ISubject, "id" | "professorIDs" | "courseClassIDs" | "quizIDs">) => Promise<ISubject>;
    handleSubjectEdit: (subjectUpdData: Partial<ISubject>) => void;
    handleSubjectDelete: (id: ISubject["id"]) => void;
    handleQuestionCreate: (questionData: Omit<IQuestion, "id">) => void;
    handleQuestionEdit: (questionUpdData: Partial<IQuestion>) => void;
    handleQuestionDelete: (id: IQuestion["id"]) => void;
    handleQuizCreate: (quizData: Omit<IQuiz, "id" | "questions">) => Promise<IQuiz>;
    handleQuizEdit: (quizUpdData: Partial<IQuiz>) => void;
    handleQuizDelete: (id: IQuiz["id"]) => void;
    handleRuleCreate: (ruleData: Omit<IRule, "id">) => void;
    handleRuleEdit: (ruleUpdData: Partial<IRule>) => void;
    handleRuleDelete: (id: IRule["id"]) => void;
}

type InfoClassAction =
    | {
        type: "SET_SUBJECTS";
        payload: {
            subjects: ISubject[];
        };
    }
    | {
        type: "ADD_SUBJECT";
        payload: {
            subject: ISubject;
        };
    }
    | {
        type: "UPDATE_SUBJECT";
        payload: {
            subject: Partial<ISubject>;
        };
    }
    | {
        type: "DELETE_SUBJECT";
        payload: {
            subjectId: ISubject["id"];
        };
    }
    | {
        type: "SET_QUESTIONS";
        payload: {
            questions: IQuestion[];
        };
    }
    | {
        type: "ADD_QUESTION";
        payload: {
            question: IQuestion;
        };
    }
    | {
        type: "UPDATE_QUESTION";
        payload: {
            question: Partial<IQuestion>;
        };
    }
    | {
        type: "DELETE_QUESTION";
        payload: {
            questionId: IQuestion["id"];
        };
    }
    | {
        type: "SET_QUIZZES";
        payload: {
            quizzes: IQuiz[];
        };
    }
    | {
        type: "ADD_QUIZ";
        payload: {
            quiz: IQuiz;
        };
    }
    | {
        type: "UPDATE_QUIZ";
        payload: {
            quiz: Partial<IQuiz>;
        };
    }
    | {
        type: "DELETE_QUIZ";
        payload: {
            quizId: IQuiz["id"];
        };
    }
    | {
        type: "SET_RULES";
        payload: {
            rules: IRule[];
        };
    }
    | {
        type: "ADD_RULE";
        payload: {
            rule: IRule;
        };
    }
    | {
        type: "UPDATE_RULE";
        payload: {
            rule: Partial<IRule>;
        };
    }
    | {
        type: "DELETE_RULE";
        payload: {
            ruleId: IRule["id"];
        };
    };

export const InfoClassContext = createContext<IInfoClassContextProps | null>(null);

const infoClassReducer = (state: IInfoClassContextState, action: InfoClassAction): IInfoClassContextState => {
    switch (action.type) {
        case "SET_SUBJECTS":
            return {
                ...state,
                subjects: action.payload.subjects,
            };
        case "ADD_SUBJECT":
            return {
                ...state,
                subjects: [...state.subjects, action.payload.subject],
            };
        case "UPDATE_SUBJECT":
            return {
                ...state,
                subjects: state.subjects.map((subject) => {
                    const { subject: payloadSubject } = action.payload;
                    if (subject.id === payloadSubject.id) {
                        return {
                            ...subject,
                            ...payloadSubject,
                        };
                    }
                    return subject;
                }),
            };
        case "DELETE_SUBJECT":
            return {
                ...state,
                subjects: state.subjects.filter((subject) => subject.id !== action.payload.subjectId),
            };
        case "SET_QUESTIONS":
            return {
                ...state,
                questions: action.payload.questions,
            };
        case "ADD_QUESTION":
            return {
                ...state,
                questions: [...state.questions, action.payload.question],
            };
        case "UPDATE_QUESTION":
            return {
                ...state,
                questions: state.questions.map((question) => {
                    const { question: payloadQuestion } = action.payload;
                    if (question.id === payloadQuestion.id) {
                        return {
                            ...question,
                            ...payloadQuestion,
                        };
                    }
                    return question;
                }),
            };
        case "DELETE_QUESTION":
            return {
                ...state,
                questions: state.questions.filter((question) => question.id !== action.payload.questionId),
            };
        case "SET_QUIZZES":
            return {
                ...state,
                quizzes: action.payload.quizzes,
            };
        case "ADD_QUIZ":
            return {
                ...state,
                quizzes: [...state.quizzes, action.payload.quiz],
            };
        case "UPDATE_QUIZ":
            return {
                ...state,
                quizzes: state.quizzes.map((quiz) => {
                    const { quiz: payloadQuiz } = action.payload;
                    if (quiz.id === payloadQuiz.id) {
                        return {
                            ...quiz,
                            ...payloadQuiz,
                        };
                    }
                    return quiz;
                }),
            };
        case "DELETE_QUIZ":
            return {
                ...state,
                quizzes: state.quizzes.filter((quiz) => quiz.id !== action.payload.quizId),
            };
        case "SET_RULES":
            return {
                ...state,
                rules: action.payload.rules,
            };
        case "ADD_RULE":
            return {
                ...state,
                rules: [...state.rules, action.payload.rule],
            };
        case "UPDATE_RULE":
            return {
                ...state,
                rules: state.rules.map((rule) => {
                    const { rule: payloadRule } = action.payload;
                    if (rule.id === payloadRule.id) {
                        return {
                            ...rule,
                            ...payloadRule,
                        };
                    }
                    return rule;
                }),
            };
        case "DELETE_RULE":
            return {
                ...state,
                rules: state.rules.filter((rule) => rule.id !== action.payload.ruleId),
            };
        default:
            return state;
    }
};

const initialState: IInfoClassContextState = {
    subjects: [],
    questions: [],
    quizzes: [],
    rules: [],
};

export const InfoClassProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(infoClassReducer, initialState);
    const { token } = useAuth();
    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        if (token) {
            axios
                .get(`${API_URL}/subjects`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then(({ data: subjectsData }) => {
                    dispatch({
                        type: "SET_SUBJECTS",
                        payload: {
                            subjects: subjectsData,
                        },
                    });
                })
                .catch((err) => {
                    console.log(err);
                });

            axios
                .get(`${API_URL}/questions`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then(({ data: questionsData }) => {
                    dispatch({
                        type: "SET_QUESTIONS",
                        payload: {
                            questions: questionsData,
                        },
                    });
                })
                .catch((err) => {
                    console.log(err);
                });

            axios
                .get(`${API_URL}/quizzes`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then(({ data: quizzesData }) => {
                    dispatch({
                        type: "SET_QUIZZES",
                        payload: {
                            quizzes: quizzesData,
                        },
                    });
                })
                .catch((err) => {
                    console.log(err);
                });

            axios
                .get(`${API_URL}/rules`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then(({ data: rulesData }) => {
                    dispatch({
                        type: "SET_RULES",
                        payload: {
                            rules: rulesData,
                        },
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [token]);

    async function handleSubjectCreate(subjectData: Omit<ISubject, "id" | "professorIDs" | "courseClassIDs" | "quizIDs">): Promise<ISubject> {
        if (token) {
            return axios
                .post(`${API_URL}/subject`, subjectData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then(({ data: subject }) => {
                    dispatch({
                        type: "ADD_SUBJECT",
                        payload: {
                            subject,
                        },
                    });
                    return subject;
                })
                .catch((err) => {
                    console.log(err);
                    return Promise.reject(err);
                });
        }

        return Promise.reject('No token available');
    }


    function handleSubjectEdit(subjectUpdData: Partial<ISubject>) {
        if (token && subjectUpdData.id) {
            axios
                .put(`${API_URL}/subject/${subjectUpdData.id}`, subjectUpdData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then(() => {
                    dispatch({
                        type: "UPDATE_SUBJECT",
                        payload: {
                            subject: subjectUpdData,
                        },
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    function handleSubjectDelete(id: ISubject["id"]) {
        if (token) {
            axios
                .delete(`${API_URL}/subject/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then(() => {
                    dispatch({
                        type: "DELETE_SUBJECT",
                        payload: {
                            subjectId: id,
                        },
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    function handleQuestionCreate(questionData: Omit<IQuestion, "id">) {
        if (token) {
            axios
                .post(`${API_URL}/question`, questionData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then(({ data: question }) => {
                    dispatch({
                        type: "ADD_QUESTION",
                        payload: {
                            question,
                        },
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    function handleQuestionEdit(questionUpdData: Partial<IQuestion>) {
        if (token && questionUpdData.id) {
            axios
                .put(`${API_URL}/question/${questionUpdData.id}`, questionUpdData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then(() => {
                    dispatch({
                        type: "UPDATE_QUESTION",
                        payload: {
                            question: questionUpdData,
                        },
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    function handleQuestionDelete(id: IQuestion["id"]) {
        if (token) {
            axios
                .delete(`${API_URL}/question/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then(() => {
                    dispatch({
                        type: "DELETE_QUESTION",
                        payload: {
                            questionId: id,
                        },
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    async function handleQuizCreate(quizData: Omit<IQuiz, "id" | "questions">): Promise<IQuiz> {
        if (!token) {
            throw new Error("No token found");
        }

        try {
            const response = await axios.post(`${API_URL}/quiz`, quizData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const quiz = response.data;

            dispatch({
                type: "ADD_QUIZ",
                payload: quiz,
            });

            return quiz;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }


    function handleQuizEdit(quizUpdData: Partial<IQuiz>) {
        if (token && quizUpdData.id) {
            axios
                .put(`${API_URL}/quiz/${quizUpdData.id}`, quizUpdData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then(() => {
                    dispatch({
                        type: "UPDATE_QUIZ",
                        payload: {
                            quiz: quizUpdData,
                        },
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    function handleQuizDelete(id: IQuiz["id"]) {
        if (token) {
            axios
                .delete(`${API_URL}/quiz/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then(() => {
                    dispatch({
                        type: "DELETE_QUIZ",
                        payload: {
                            quizId: id,
                        },
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    function handleRuleCreate(ruleData: Omit<IRule, "id">) {
        if (token) {
            axios
                .post(`${API_URL}/rule`, ruleData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then(({ data: rule }) => {
                    dispatch({
                        type: "ADD_RULE",
                        payload: {
                            rule,
                        },
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    function handleRuleEdit(ruleUpdData: Partial<IRule>) {
        if (token && ruleUpdData.id) {
            axios
                .put(`${API_URL}/rule/${ruleUpdData.id}`, ruleUpdData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then(() => {
                    dispatch({
                        type: "UPDATE_RULE",
                        payload: {
                            rule: ruleUpdData,
                        },
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    function handleRuleDelete(id: IRule["id"]) {
        if (token) {
            axios
                .delete(`${API_URL}/rule/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then(() => {
                    dispatch({
                        type: "DELETE_RULE",
                        payload: {
                            ruleId: id,
                        },
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    return (
        <InfoClassContext.Provider
            value={{
                ...state,
                dispatch,
                handleSubjectCreate,
                handleSubjectEdit,
                handleSubjectDelete,
                handleQuestionCreate,
                handleQuestionEdit,
                handleQuestionDelete,
                handleQuizCreate,
                handleQuizEdit,
                handleQuizDelete,
                handleRuleCreate,
                handleRuleEdit,
                handleRuleDelete,
            }}
        >
            {children}
        </InfoClassContext.Provider>
    );
};

export const useInfoClassContext = () => {
    const context = useContext(InfoClassContext);
    if (!context) {
        throw new Error("useInfoClass must be used within a InfoClassProvider");
    }
    return context;
};
