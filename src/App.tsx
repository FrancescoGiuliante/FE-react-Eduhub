import { Route, Routes, Navigate } from 'react-router-dom';
import LayoutOutside from './layouts/LayoutOutside';
import { AuthProvider } from './contexts/AuthContext';
import { Landing } from './pages/Landing';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { NotFound } from './pages/NotFound';
import LayoutInside from './layouts/LayoutInside';
import { StoreProvider } from './contexts/StoreContext';
import { TableCards } from './components/elaborated/TableCards';
import { ClassRegister } from './pages/forms/ClassRegister';
import { CourseDisplay } from './pages/CourseDisplay';
import { AdminCourse } from './pages/AdminCourse';
import { Admins } from './pages/Admins';
import { AdminRegister } from './pages/forms/AdminRegister';
import { CourseClassDisplay } from './pages/CourseClassDisplay';
import { MyProfile } from './pages/MyProfile';
import { InfoClassProvider } from './contexts/InfoClassContext';
import TableTodayLessons from './components/elaborated/TableTodayLessons';
import { ClassDisplay } from './pages/ClassDisplay';
import TableSelectLesson from './components/elaborated/TableSelectLesson';
import { GenerateQRcode } from './pages/GenerateQRcode';
import LayoutAttendance from './layouts/LayoutAttendance';
import { CreateQuestion } from './pages/forms/CreateQuestion';
import HomeRoutes from './routes/HomeRoutes';
import { MyCourseClasses } from './pages/MyCourseClasses';
import ScanQRCode from './pages/ScanQRCode';
import TableQuestions from './components/elaborated/TableQuestions';
import { CreateQuiz } from './pages/forms/CreateQuiz';
import { DisplaySubjectsQuizzes } from './pages/DisplaySubjects';
import { StudentQuizzes } from './pages/StudentQuizzes';
import { FreeCourses } from './pages/FreeCourses';
import { EventsProvider } from './contexts/EventsContext';
import { ClassActivity } from './pages/ClassActivity';
import { FreeQuizzes } from './pages/FreeQuizzes';


const getRoleFromToken = (token: string) => {
    if (token) {
        const userRole = JSON.parse(atob(token.split('.')[1])).role;
        return userRole;
    }
    return null;
};

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const token: string | null = localStorage.getItem("ACCESS_TOKEN");

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
};

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
    const token: string | null = localStorage.getItem("ACCESS_TOKEN");
    if (token) {
        const role = getRoleFromToken(token);
        if (role === "ADMIN") {
            return <>{children}</>;
        } else {
            return <Navigate to="/home" replace />;
        }
    } else {
        return <Navigate to="/login" replace />;
    }
}



function App() {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/" element={<LayoutOutside />}>
                    <Route index element={<Landing />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="*" element={<NotFound />} />
                </Route>

                <Route path="/home" element={<LayoutInside />}>
                    <Route
                        index
                        element={
                            <ProtectedRoute>
                                <StoreProvider >
                                    <InfoClassProvider>
                                        <EventsProvider>
                                            <HomeRoutes />
                                        </EventsProvider>
                                    </InfoClassProvider>
                                </StoreProvider>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="my-profile"
                        element={
                            <ProtectedRoute>
                                <MyProfile />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="free-courses"
                        element={
                            <ProtectedRoute>
                                <FreeCourses />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="table-free-quizzes"
                        element={
                            <StoreProvider >
                                <InfoClassProvider>
                                    <FreeQuizzes />
                                </InfoClassProvider>
                            </StoreProvider>
                        }
                    />
                    <Route
                        path="course/:courseID"
                        element={
                            <ProtectedRoute>
                                <CourseDisplay />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="users"
                        element={
                            <ProtectedRoute>
                                <AdminRoute>
                                    <StoreProvider >
                                        <TableCards />
                                    </StoreProvider>
                                </AdminRoute>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="register-class/:courseID"
                        element={
                            <ProtectedRoute>
                                <AdminRoute>
                                    <StoreProvider >
                                        <ClassRegister />
                                    </StoreProvider>
                                </AdminRoute>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="admins"
                        element={
                            <ProtectedRoute>
                                <AdminRoute>
                                    <StoreProvider >
                                        <Admins />
                                    </StoreProvider>
                                </AdminRoute>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="register-admin"
                        element={
                            <ProtectedRoute>
                                <AdminRoute>
                                    <StoreProvider >
                                        <AdminRegister />
                                    </StoreProvider>
                                </AdminRoute>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="admin-course/:courseID"
                        element={
                            <ProtectedRoute>
                                <AdminRoute>
                                    <StoreProvider >
                                        <AdminCourse />
                                    </StoreProvider>
                                </AdminRoute>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="classes"
                        element={
                            <ProtectedRoute>
                                <AdminRoute>
                                    <StoreProvider >
                                        <InfoClassProvider>
                                            <CourseClassDisplay />
                                        </InfoClassProvider>
                                    </StoreProvider>
                                </AdminRoute>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="my-classes"
                        element={
                            <ProtectedRoute>
                                <StoreProvider >
                                    <InfoClassProvider>
                                        <MyCourseClasses />
                                    </InfoClassProvider>
                                </StoreProvider>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="course-class/:courseClassID"
                        element={
                            <ProtectedRoute>
                                <StoreProvider >
                                    <InfoClassProvider>
                                        <EventsProvider>
                                            <ClassDisplay />
                                        </EventsProvider>
                                    </InfoClassProvider>
                                </StoreProvider>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="today-lessons"
                        element={
                            <ProtectedRoute>
                                <AdminRoute>
                                    <StoreProvider >
                                        <InfoClassProvider>
                                            <TableTodayLessons />
                                        </InfoClassProvider>
                                    </StoreProvider>
                                </AdminRoute>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="select-lesson"
                        element={
                            <ProtectedRoute>
                                <AdminRoute>
                                    <StoreProvider >
                                        <InfoClassProvider>
                                            <TableSelectLesson />
                                        </InfoClassProvider>
                                    </StoreProvider>
                                </AdminRoute>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="my-questions"
                        element={
                            <ProtectedRoute>
                                <StoreProvider >
                                    <InfoClassProvider>
                                        <TableQuestions />
                                    </InfoClassProvider>
                                </StoreProvider>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="create-question"
                        element={
                            <ProtectedRoute>
                                <StoreProvider >
                                    <InfoClassProvider>
                                        <CreateQuestion />
                                    </InfoClassProvider>
                                </StoreProvider>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="create-quiz/:subjectID"
                        element={
                            <ProtectedRoute>
                                <StoreProvider >
                                    <InfoClassProvider>
                                        <CreateQuiz />
                                    </InfoClassProvider>
                                </StoreProvider>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="tables-sub&quiz"
                        element={
                            <ProtectedRoute>
                                <StoreProvider >
                                    <InfoClassProvider>
                                        <DisplaySubjectsQuizzes />
                                    </InfoClassProvider>
                                </StoreProvider>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="quizzes"
                        element={
                            <ProtectedRoute>
                                <StoreProvider >
                                    <InfoClassProvider>
                                        <StudentQuizzes />
                                    </InfoClassProvider>
                                </StoreProvider>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="scan-qr"
                        element={
                            <ProtectedRoute>
                                <StoreProvider >
                                    <InfoClassProvider>
                                        <ScanQRCode />
                                    </InfoClassProvider>
                                </StoreProvider>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="activity"
                        element={
                            <ProtectedRoute>
                                <StoreProvider >
                                    <InfoClassProvider>
                                        <EventsProvider>
                                            <ClassActivity />
                                        </EventsProvider>
                                    </InfoClassProvider>
                                </StoreProvider>
                            </ProtectedRoute>
                        }
                    />
                    <Route path="*" element={<NotFound />} />
                </Route>

                <Route path='/attendance' element={<LayoutAttendance />}>
                    <Route
                        path="generate-qr/:lessonID"
                        element={
                            <ProtectedRoute>
                                <AdminRoute>
                                    <StoreProvider >
                                        <InfoClassProvider>
                                            <GenerateQRcode />
                                        </InfoClassProvider>
                                    </StoreProvider>
                                </AdminRoute>
                            </ProtectedRoute>
                        }
                    />
                </Route>

            </Routes>

        </AuthProvider >
    );
}

export default App;
