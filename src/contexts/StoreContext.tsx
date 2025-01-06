import IUser from "@/interfaces/User";
import axios from "axios";
import { createContext, ReactNode, useContext, useEffect, useReducer } from "react";
import { useAuth } from "./AuthContext";
import ICourseClass from "@/interfaces/CourseClass";
import IProfessor from "@/interfaces/IProfessor";
import IStudent from "@/interfaces/IStudent";

interface IStoreContextState {
    users: IUser[];
    professors: IProfessor[];
    courseClasses: ICourseClass[];
    students: IStudent[];
}

interface IStoreContextProps extends IStoreContextState {
    dispatch: React.Dispatch<StoreAction>;
    handleUserCreate: (userData: Omit<IUser, "id">) => void;
    handleUserEdit: (userUpdData: Partial<IUser>) => void;
    handleUserDelete: (id: IUser["id"]) => void;
    handleProfessorCreate: (professorData: Omit<IProfessor, "id">) => void;
    handleProfessorEdit: (professorUpdData: Partial<IProfessor>) => void;
    handleProfessorDelete: (id: IProfessor["id"]) => void;
    handleCourseClassCreate: (courseClassData: Omit<ICourseClass, "id" | "studentIDs" | "professorIDs" | "subjectIDs" | "weekProgramIDs">) => void;
    handleCourseClassEdit: (courseClassUpdData: Partial<ICourseClass>) => void;
    handleCourseClassDelete: (id: ICourseClass["id"]) => void;
    handleUserUpdateRole: (userId: IUser["id"], role: string, classID: number) => Promise<void>;
    handleStudentCreate: (studentData: Omit<IStudent, "id">) => void;
    handleStudentEdit: (studentUpdData: Partial<IStudent>) => void;
    handleStudentDelete: (id: IStudent["id"]) => void;
}
type StoreAction =
    | {
        type: "SET_USERS";
        payload: {
            users: IUser[];
        };
    }
    | {
        type: "ADD_USER";
        payload: {
            user: IUser;
        };
    }
    | {
        type: "UPDATE_USER";
        payload: {
            user: Partial<IUser>;
        };
    }
    | {
        type: "DELETE_USER";
        payload: {
            userId: IUser["id"];
        };
    }
    | {
        type: "UPDATE_USER_ROLE";
        payload: {
            userId: IUser["id"];
            role: string;
        };
    }
    | {
        type: "SET_STUDENTS";
        payload: {
            students: IStudent[];
        };
    }
    | {
        type: "ADD_STUDENT";
        payload: {
            student: IStudent;
        };
    }
    | {
        type: "UPDATE_STUDENT";
        payload: {
            student: Partial<IStudent>;
        };
    }
    | {
        type: "DELETE_STUDENT";
        payload: {
            studentId: IStudent["id"];
        };
    }
    | {
        type: "SET_PROFESSORS";
        payload: {
            professors: IProfessor[];
        };
    }
    | {
        type: "ADD_PROFESSOR";
        payload: {
            professor: IProfessor;
        };
    }
    | {
        type: "UPDATE_PROFESSOR";
        payload: {
            professor: Partial<IProfessor>;
        };
    }
    | {
        type: "DELETE_PROFESSOR";
        payload: {
            professorId: IProfessor["id"];
        };
    }
    | {
        type: "SET_COURSE_CLASSES";
        payload: {
            courseClasses: ICourseClass[];
        };
    }
    | {
        type: "ADD_COURSE_CLASS";
        payload: {
            courseClass: ICourseClass;
        };
    }
    | {
        type: "UPDATE_COURSE_CLASS";
        payload: {
            courseClass: Partial<ICourseClass>;
        };
    }
    | {
        type: "DELETE_COURSE_CLASS";
        payload: {
            courseClassId: ICourseClass["id"];
        };
    };


export const StoreContext = createContext<IStoreContextProps | null>(null);

const storeReducer = (state: IStoreContextState, action: StoreAction): IStoreContextState => {
    switch (action.type) {
        case "SET_USERS":
            return {
                ...state,
                users: action.payload.users,
            };
        case "ADD_USER":
            return {
                ...state,
                users: [...state.users, action.payload.user],
            };
        case "UPDATE_USER":
            return {
                ...state,
                users: state.users.map((user) => {
                    const { user: payloadUser } = action.payload;
                    if (user.id === payloadUser.id) {
                        return {
                            ...user,
                            ...payloadUser,
                        };
                    }
                    return user;
                }),
            };
        case "DELETE_USER":
            return {
                ...state,
                users: state.users.filter((user) => user.id !== action.payload.userId),
            };
        case "UPDATE_USER_ROLE":
            return {
                ...state,
                users: state.users.map((user) => {
                    if (user.id === action.payload.userId) {
                        return {
                            ...user,
                            role: action.payload.role,
                        };
                    }
                    return user;
                }),
            };
        case "SET_STUDENTS":
            return {
                ...state,
                students: action.payload.students,
            };
        case "ADD_STUDENT":
            return {
                ...state,
                students: [...state.students, action.payload.student],
            };
        case "UPDATE_STUDENT":
            return {
                ...state,
                students: state.students.map((student) => {
                    const { student: payloadStudent } = action.payload;
                    if (student.id === payloadStudent.id) {
                        return {
                            ...student,
                            ...payloadStudent,
                        };
                    }
                    return student;
                }),
            };
        case "DELETE_STUDENT":
            return {
                ...state,
                students: state.students.filter((student) => student.id !== action.payload.studentId),
            };
        case "SET_PROFESSORS":
            return {
                ...state,
                professors: action.payload.professors,
            };
        case "ADD_PROFESSOR":
            return {
                ...state,
                professors: [...state.professors, action.payload.professor],
            };
        case "UPDATE_PROFESSOR":
            return {
                ...state,
                professors: state.professors.map((professor) => {
                    const { professor: payloadProfessor } = action.payload;
                    if (professor.id === payloadProfessor.id) {
                        return {
                            ...professor,
                            ...payloadProfessor,
                        };
                    }
                    return professor;
                }),
            };
        case "DELETE_PROFESSOR":
            return {
                ...state,
                professors: state.professors.filter((professor) => professor.id !== action.payload.professorId),
            };
        case "SET_COURSE_CLASSES":
            return {
                ...state,
                courseClasses: action.payload.courseClasses,
            };
        case "ADD_COURSE_CLASS":
            return {
                ...state,
                courseClasses: [...state.courseClasses, action.payload.courseClass],
            };
        case "UPDATE_COURSE_CLASS":
            return {
                ...state,
                courseClasses: state.courseClasses.map((courseClass) => {
                    const { courseClass: payloadCourseClass } = action.payload;
                    if (courseClass.id === payloadCourseClass.id) {
                        return {
                            ...courseClass,
                            ...payloadCourseClass,
                        };
                    }
                    return courseClass;
                }),
            };
        case "DELETE_COURSE_CLASS":
            return {
                ...state,
                courseClasses: state.courseClasses.filter(
                    (courseClass) => courseClass.id !== action.payload.courseClassId
                ),
            };
        default:
            return state;
    }
};

const initialState: IStoreContextState = {
    users: [],
    professors: [],
    courseClasses: [],
    students: [],
};

export const StoreProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(storeReducer, initialState);
    const { token } = useAuth();

    useEffect(() => {
        axios
            .get("http://localhost:3000/auth/users", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(({ data: usersData }) => {
                dispatch({
                    type: "SET_USERS",
                    payload: {
                        users: usersData,
                    },
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }, [token]);

    useEffect(() => {
        axios
            .get("http://localhost:3000/api/students", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(({ data: studentsData }) => {
                dispatch({
                    type: "SET_STUDENTS",
                    payload: {
                        students: studentsData,
                    },
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }, [token]);

    useEffect(() => {
        axios
            .get("http://localhost:3000/api/professors", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(({ data: professorsData }) => {
                dispatch({
                    type: "SET_PROFESSORS",
                    payload: {
                        professors: professorsData,
                    },
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }, [token]);

    useEffect(() => {
        axios
            .get("http://localhost:3000/api/courseclasses", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(({ data: courseClassesData }) => {
                dispatch({
                    type: "SET_COURSE_CLASSES",
                    payload: {
                        courseClasses: courseClassesData,
                    },
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }, [token]);

    function handleProfessorCreate(professorData: Omit<IProfessor, "id">) {
        axios
            .post("http://localhost:3000/api/professor", professorData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(({ data: professor }) => {
                dispatch({
                    type: "ADD_PROFESSOR",
                    payload: {
                        professor,
                    },
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleProfessorEdit(professorUpdData: Partial<IProfessor>) {
        axios
            .put("http://localhost:3000/api/professor/" + professorUpdData.id, professorUpdData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(() => {
                dispatch({
                    type: "UPDATE_PROFESSOR",
                    payload: {
                        professor: professorUpdData,
                    },
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const handleUserUpdateRole = async (userId: number, role: string, classId: number) => {
        try {
            const response = await axios.put(
                `http://localhost:3000/auth/user-updateRole/${userId}`,
                {
                    classID: classId,
                    role: role
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (response.status === 200) {
                dispatch({
                    type: 'UPDATE_USER',
                    payload: {
                        user: {
                            id: userId,
                            role: role,
                        }
                    }
                });
            } else {
                throw new Error('Failed to update user role');
            }
        } catch (error) {
            console.log(error);
            throw new Error('Failed to update user role');
        }
    };


    function handleProfessorDelete(id: IProfessor["id"]) {
        axios
            .delete("http://localhost:3000/api/professor/" + id, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(() => {
                dispatch({
                    type: "DELETE_PROFESSOR",
                    payload: {
                        professorId: id,
                    },
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    // Funzioni per gli utenti
    function handleUserCreate(userData: Omit<IUser, "id">) {
        axios
            .post("https://jsonplaceholder.typicode.com/users", userData)
            .then(({ data: id }) => {
                dispatch({
                    type: "ADD_USER",
                    payload: {
                        user: {
                            id,
                            ...userData,
                        },
                    },
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleUserEdit(userUpdData: Partial<IUser>) {
        axios
            .put("https://jsonplaceholder.typicode.com/users/" + userUpdData.id, {
                name: userUpdData.name,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(() => {
                dispatch({
                    type: "UPDATE_USER",
                    payload: {
                        user: userUpdData,
                    },
                });
            });
    }

    function handleUserDelete(id: IUser["id"]) {
        axios
            .delete("http://localhost:3000/auth/user/" + id, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(() => {
                dispatch({
                    type: "DELETE_USER",
                    payload: {
                        userId: id,
                    },
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }
    function handleCourseClassCreate(courseClassData: Omit<ICourseClass, "id" | "studentIDs" | "professorIDs" | "subjectIDs" | "weekProgramIDs">) {
        axios
            .post("http://localhost:3000/api/courseclass", courseClassData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(({ data: courseClass }) => {
                dispatch({
                    type: "ADD_COURSE_CLASS",
                    payload: {
                        courseClass,
                    },
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }
    function handleCourseClassEdit(courseClassUpdData: Partial<ICourseClass>) {
        axios
            .put("http://localhost:3000/api/courseclass/" + courseClassUpdData.id, courseClassUpdData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(() => {
                dispatch({
                    type: "UPDATE_COURSE_CLASS",
                    payload: {
                        courseClass: courseClassUpdData,
                    },
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleCourseClassDelete(id: ICourseClass["id"]) {
        axios
            .delete("http://localhost:3000/api/courseclass/" + id, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(() => {
                dispatch({
                    type: "DELETE_COURSE_CLASS",
                    payload: {
                        courseClassId: id,
                    },
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleStudentCreate(studentData: Omit<IStudent, "id">) {
        axios
            .post("http://localhost:3000/api/student", studentData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(({ data: student }) => {
                dispatch({
                    type: "ADD_STUDENT",
                    payload: {
                        student,
                    },
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleStudentEdit(studentUpdData: Partial<IStudent>) {
        axios
            .put("http://localhost:3000/api/student/" + studentUpdData.id, studentUpdData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(() => {
                dispatch({
                    type: "UPDATE_STUDENT",
                    payload: {
                        student: studentUpdData,
                    },
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleStudentDelete(id: IStudent["id"]) {
        axios
            .delete("http://localhost:3000/api/student/" + id, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(() => {
                dispatch({
                    type: "DELETE_STUDENT",
                    payload: {
                        studentId: id,
                    },
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }



    return (
        <StoreContext.Provider
            value={{
                ...state,
                dispatch,
                handleUserCreate,
                handleUserEdit,
                handleUserDelete,
                handleProfessorCreate,
                handleProfessorEdit,
                handleProfessorDelete,
                handleCourseClassCreate,
                handleCourseClassEdit,
                handleCourseClassDelete,
                handleUserUpdateRole,
                handleStudentCreate,
                handleStudentEdit,
                handleStudentDelete
            }}
        >
            {children}
        </StoreContext.Provider>
    );
};

export const useStoreContext = () => {
    const context = useContext(StoreContext);
    if (!context) {
        throw new Error("useStoreContext must be used inside StoreProvider");
    }
    return context;
};
