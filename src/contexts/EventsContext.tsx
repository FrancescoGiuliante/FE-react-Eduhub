import axios from "axios";
import { createContext, ReactNode, useContext, useEffect, useReducer } from "react";
import { useAuth } from "./AuthContext";
import ILesson from "@/interfaces/Lesson";
import IVote from "@/interfaces/Vote";

interface IEventsContextState {
    lessons: ILesson[];
    votes: IVote[];
}

interface IEventsContextProps extends IEventsContextState {
    dispatch: React.Dispatch<EventsAction>;
    handleLessonCreate: (lessonData: Omit<ILesson, "id">) => Promise<ILesson>;
    handleLessonEdit: (lessonUpdData: Partial<ILesson>) => void;
    handleLessonDelete: (id: ILesson["id"]) => void;
    setVotes: (votes: IVote[]) => void;
}

type EventsAction =
    | {
          type: "SET_LESSONS";
          payload: {
              lessons: ILesson[];
          };
      }
    | {
          type: "ADD_LESSON";
          payload: {
              lesson: ILesson;
          };
      }
    | {
          type: "UPDATE_LESSON";
          payload: {
              lesson: Partial<ILesson>;
          };
      }
    | {
          type: "DELETE_LESSON";
          payload: {
              lessonId: ILesson["id"];
          };
      }
    | {
          type: "SET_VOTES";
          payload: {
              votes: IVote[];
          };
      };

export const EventsContext = createContext<IEventsContextProps | null>(null);

const eventsReducer = (state: IEventsContextState, action: EventsAction): IEventsContextState => {
    switch (action.type) {
        case "SET_LESSONS":
            return {
                ...state,
                lessons: action.payload.lessons,
            };
        case "ADD_LESSON":
            return {
                ...state,
                lessons: [...state.lessons, action.payload.lesson],
            };
        case "UPDATE_LESSON":
            return {
                ...state,
                lessons: state.lessons.map((lesson) => {
                    const { lesson: payloadLesson } = action.payload;
                    if (lesson.id === payloadLesson.id) {
                        return {
                            ...lesson,
                            ...payloadLesson,
                        };
                    }
                    return lesson;
                }),
            };
        case "DELETE_LESSON":
            return {
                ...state,
                lessons: state.lessons.filter((lesson) => lesson.id !== action.payload.lessonId),
            };
        case "SET_VOTES":
            return {
                ...state,
                votes: action.payload.votes,
            };
        default:
            return state;
    }
};

const initialState: IEventsContextState = {
    lessons: [],
    votes: [],
};

export const EventsProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(eventsReducer, initialState);
    const { token } = useAuth();
    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        if (token) {
            axios
                .get(`${API_URL}/lessons`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then(({ data: lessonsData }) => {
                    dispatch({
                        type: "SET_LESSONS",
                        payload: {
                            lessons: lessonsData,
                        },
                    });
                })
                .catch((err) => {
                    console.log(err);
                });

            axios
                .get(`${API_URL}/votes`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then(({ data: votesData }) => {
                    dispatch({
                        type: "SET_VOTES",
                        payload: {
                            votes: votesData,
                        },
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [token]);

    async function handleLessonCreate(lessonData: Omit<ILesson, "id">): Promise<ILesson> {
        if (token) {
            return axios
                .post(`${API_URL}/lesson`, lessonData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then(({ data: lesson }) => {
                    dispatch({
                        type: "ADD_LESSON",
                        payload: {
                            lesson,
                        },
                    });
                    return lesson;
                })
                .catch((err) => {
                    console.log(err);
                    return Promise.reject(err);
                });
        }

        return Promise.reject('No token available');
    }

    function handleLessonEdit(lessonUpdData: Partial<ILesson>) {
        if (token && lessonUpdData.id) {
            axios
                .put(`${API_URL}/lesson/${lessonUpdData.id}`, lessonUpdData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then(() => {
                    dispatch({
                        type: "UPDATE_LESSON",
                        payload: {
                            lesson: lessonUpdData,
                        },
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    function handleLessonDelete(id: ILesson["id"]) {
        if (token) {
            axios
                .delete(`${API_URL}/lesson/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then(() => {
                    dispatch({
                        type: "DELETE_LESSON",
                        payload: {
                            lessonId: id,
                        },
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    return (
        <EventsContext.Provider
            value={{
                ...state,
                dispatch,
                handleLessonCreate,
                handleLessonEdit,
                handleLessonDelete,
                setVotes: (votes: IVote[]) => dispatch({ type: "SET_VOTES", payload: { votes } }),
            }}
        >
            {children}
        </EventsContext.Provider>
    );
};

export const useEventsContext = () => {
    const context = useContext(EventsContext);
    if (!context) {
        throw new Error("useEventsContext must be used within an EventsProvider");
    }
    return context;
};
