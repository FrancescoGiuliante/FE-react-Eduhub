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
    handleProfessorEdit: (professorUpdData: Partial<IProfessor>) => Promise<void>;
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
    | { type: "SET_USERS"; payload: { users: IUser[] } }
    | { type: "ADD_USER"; payload: { user: IUser } }
    | { type: "UPDATE_USER"; payload: { user: Partial<IUser> } }
    | { type: "DELETE_USER"; payload: { userId: IUser["id"] } }
    | { type: "UPDATE_USER_ROLE"; payload: { userId: IUser["id"]; role: string } }
    | { type: "SET_STUDENTS"; payload: { students: IStudent[] } }
    | { type: "ADD_STUDENT"; payload: { student: IStudent } }
    | { type: "UPDATE_STUDENT"; payload: { student: Partial<IStudent> } }
    | { type: "DELETE_STUDENT"; payload: { studentId: IStudent["id"] } }
    | { type: "SET_PROFESSORS"; payload: { professors: IProfessor[] } }
    | { type: "ADD_PROFESSOR"; payload: { professor: IProfessor } }
    | { type: "UPDATE_PROFESSOR"; payload: { professor: Partial<IProfessor> } }
    | { type: "DELETE_PROFESSOR"; payload: { professorId: IProfessor["id"] } }
    | { type: "SET_COURSE_CLASSES"; payload: { courseClasses: ICourseClass[] } }
    | { type: "ADD_COURSE_CLASS"; payload: { courseClass: ICourseClass } }
    | { type: "UPDATE_COURSE_CLASS"; payload: { courseClass: Partial<ICourseClass> } }
    | { type: "DELETE_COURSE_CLASS"; payload: { courseClassId: ICourseClass["id"] } };

export const StoreContext = createContext<IStoreContextProps | null>(null);

const storeReducer = (state: IStoreContextState, action: StoreAction): IStoreContextState => {
    switch (action.type) {
        case "SET_USERS":
            return { ...state, users: action.payload.users };
        case "ADD_USER":
            return { ...state, users: [...state.users, action.payload.user] };
        case "UPDATE_USER":
            return {
                ...state,
                users: state.users.map((user) =>
                    user.id === action.payload.user.id ? { ...user, ...action.payload.user } : user
                ),
            };
        case "DELETE_USER":
            return { ...state, users: state.users.filter((user) => user.id !== action.payload.userId) };
        case "UPDATE_USER_ROLE":
            return {
                ...state,
                users: state.users.map((user) =>
                    user.id === action.payload.userId ? { ...user, role: action.payload.role } : user
                ),
            };
        case "SET_STUDENTS":
            return { ...state, students: action.payload.students };
        case "ADD_STUDENT":
            return { ...state, students: [...state.students, action.payload.student] };
        case "UPDATE_STUDENT":
            return {
                ...state,
                students: state.students.map((student) =>
                    student.id === action.payload.student.id ? { ...student, ...action.payload.student } : student
                ),
            };
        case "DELETE_STUDENT":
            return { ...state, students: state.students.filter((student) => student.id !== action.payload.studentId) };
        case "SET_PROFESSORS":
            return { ...state, professors: action.payload.professors };
        case "ADD_PROFESSOR":
            return { ...state, professors: [...state.professors, action.payload.professor] };
        case "UPDATE_PROFESSOR":
            return {
                ...state,
                professors: state.professors.map((professor) =>
                    professor.id === action.payload.professor.id ? { ...professor, ...action.payload.professor } : professor
                ),
            };
        case "DELETE_PROFESSOR":
            return { ...state, professors: state.professors.filter((professor) => professor.id !== action.payload.professorId) };
        case "SET_COURSE_CLASSES":
            return { ...state, courseClasses: action.payload.courseClasses };
        case "ADD_COURSE_CLASS":
            return { ...state, courseClasses: [...state.courseClasses, action.payload.courseClass] };
        case "UPDATE_COURSE_CLASS":
            return {
                ...state,
                courseClasses: state.courseClasses.map((courseClass) =>
                    courseClass.id === action.payload.courseClass.id ? { ...courseClass, ...action.payload.courseClass } : courseClass
                ),
            };
        case "DELETE_COURSE_CLASS":
            return { ...state, courseClasses: state.courseClasses.filter((courseClass) => courseClass.id !== action.payload.courseClassId) };
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
    const API_URL = "http://localhost:3000";

    useEffect(() => {
        if (token) {
            axios.get(`${API_URL}/auth/users`, { headers: { Authorization: `Bearer ${token}` } })
                .then(({ data: usersData }) => {
                    dispatch({ type: "SET_USERS", payload: { users: usersData } });
                })
                .catch((err) => console.log(err));

            axios.get(`${API_URL}/api/students`, { headers: { Authorization: `Bearer ${token}` } })
                .then(({ data: studentsData }) => {
                    dispatch({ type: "SET_STUDENTS", payload: { students: studentsData } });
                })
                .catch((err) => console.log(err));

            axios.get(`${API_URL}/api/professors`, { headers: { Authorization: `Bearer ${token}` } })
                .then(({ data: professorsData }) => {
                    dispatch({ type: "SET_PROFESSORS", payload: { professors: professorsData } });
                })
                .catch((err) => console.log(err));

            axios.get(`${API_URL}/api/courseclasses`, { headers: { Authorization: `Bearer ${token}` } })
                .then(({ data: courseClassesData }) => {
                    dispatch({ type: "SET_COURSE_CLASSES", payload: { courseClasses: courseClassesData } });
                })
                .catch((err) => console.log(err));
        }
    }, [token]);

    const handleProfessorCreate = (professorData: Omit<IProfessor, "id">) => {
        axios.post(`${API_URL}/api/professor`, professorData, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(({ data: professor }) => {
                dispatch({ type: "ADD_PROFESSOR", payload: { professor } });
            })
            .catch((err) => console.log(err));
    };

    const handleProfessorEdit = async (professorUpdData: Partial<IProfessor>): Promise<void> => {
        try {
            await axios.put(`${API_URL}/api/professor/${professorUpdData.userId}`, professorUpdData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            dispatch({ type: "UPDATE_PROFESSOR", payload: { professor: professorUpdData } });
        } catch (err) {
            console.log(err);
            throw err;
        }
    };

    const handleProfessorDelete = (id: IProfessor["id"]) => {
        axios.delete(`${API_URL}/api/professor/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(() => {
                dispatch({ type: "DELETE_PROFESSOR", payload: { professorId: id } });
            })
            .catch((err) => console.log(err));
    };

    const handleUserCreate = (userData: Omit<IUser, "id">) => {
        axios.post(`${API_URL}/auth/users`, userData, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(({ data: user }) => {
                dispatch({ type: "ADD_USER", payload: { user } });
            })
            .catch((err) => console.log(err));
    };

    const handleUserEdit = (userUpdData: Partial<IUser>) => {
        axios.put(`${API_URL}/auth/user/${userUpdData.id}`, userUpdData, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(() => {
                dispatch({ type: "UPDATE_USER", payload: { user: userUpdData } });
            })
            .catch((err) => console.log(err));
    };

    const handleUserDelete = (id: IUser["id"]) => {
        axios.delete(`${API_URL}/auth/user/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(() => {
                dispatch({ type: "DELETE_USER", payload: { userId: id } });
            })
            .catch((err) => console.log(err));
    };

    const handleCourseClassCreate = (courseClassData: Omit<ICourseClass, "id" | "studentIDs" | "professorIDs" | "subjectIDs" | "weekProgramIDs">) => {
        axios.post(`${API_URL}/api/courseclass`, courseClassData, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(({ data: courseClass }) => {
                dispatch({ type: "ADD_COURSE_CLASS", payload: { courseClass } });
            })
            .catch((err) => console.log(err));
    };

    const handleCourseClassEdit = (courseClassUpdData: Partial<ICourseClass>) => {
        axios.put(`${API_URL}/api/courseclass/${courseClassUpdData.id}`, courseClassUpdData, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(() => {
                dispatch({ type: "UPDATE_COURSE_CLASS", payload: { courseClass: courseClassUpdData } });
            })
            .catch((err) => console.log(err));
    };

    const handleCourseClassDelete = (id: ICourseClass["id"]) => {
        axios.delete(`${API_URL}/api/courseclass/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(() => {
                dispatch({ type: "DELETE_COURSE_CLASS", payload: { courseClassId: id } });
            })
            .catch((err) => console.log(err));
    };

    const handleUserUpdateRole = async (userId: number, role: string, classId: number): Promise<void> => {
        try {
            const response = await axios.put(
                `${API_URL}/auth/user-updateRole/${userId}`,
                { classID: classId, role: role },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.status === 200) {
                dispatch({ type: "UPDATE_USER", payload: { user: { id: userId, role: role } } });
            } else {
                throw new Error('Failed to update user role');
            }
        } catch (error) {
            console.log(error);
            throw new Error('Failed to update user role');
        }
    };

    const handleStudentCreate = (studentData: Omit<IStudent, "id">) => {
        axios.post(`${API_URL}/api/student`, studentData, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(({ data: student }) => {
                dispatch({ type: "ADD_STUDENT", payload: { student } });
            })
            .catch((err) => console.log(err));
    };

    const handleStudentEdit = (studentUpdData: Partial<IStudent>) => {
        axios.put(`${API_URL}/api/student/${studentUpdData.id}`, studentUpdData, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(() => {
                dispatch({ type: "UPDATE_STUDENT", payload: { student: studentUpdData } });
            })
            .catch((err) => console.log(err));
    };

    const handleStudentDelete = (id: IStudent["id"]) => {
        axios.delete(`${API_URL}/api/student/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(() => {
                dispatch({ type: "DELETE_STUDENT", payload: { studentId: id } });
            })
            .catch((err) => console.log(err));
    };

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

