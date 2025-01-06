import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { BookA, BookCopy, NotebookText } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle, XCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useStoreContext } from "@/contexts/StoreContext";

const API_URL = import.meta.env.VITE_API_URL;

const courseClassFormSchema = z.object({
    name: z.string(),
    path: z.string(),
    syllabus: z.string(),
    courseID: z.number(),
});

type CourseClassFormValues = z.infer<typeof courseClassFormSchema>;

interface CourseClassFormProps {
    courseID: number;
}

const CourseClassForm = ({ courseID }: CourseClassFormProps) => {
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [courseName, setCourseName] = useState<string | null>(null);
    const { token } = useAuth();
    const { handleCourseClassCreate } = useStoreContext();


    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setValue,
    } = useForm<CourseClassFormValues>({
        resolver: zodResolver(courseClassFormSchema),
    });

    useEffect(() => {
        if (courseID) {
            setValue("courseID", courseID);
        }
    }, [courseID, setValue]);

    useEffect(() => {
        if (courseID) {
            axios
                .get(`${API_URL}/course/${courseID}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => {
                    setCourseName(response.data.path);
                })
                .catch((err) => {
                    setError(true);
                    console.error("Error fetching course data:", err);
                });
        }
    }, [courseID]);

    const submitHandler: SubmitHandler<CourseClassFormValues> = (data) => {
        setError(false);
        setSuccess(false);
        handleCourseClassCreate(data);  
        setSuccess(true);
    };

    return (
        <div className="container max-w-md mx-auto py-6 space-y-5">
            <div className="mb-4">
                <h1 className="font-bold text-4xl text-[#818bff]">Register</h1>
                <p>Register new class for: <span className="font-semibold">
                    {courseName}
                </span></p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit(submitHandler)}>
                <div className="relative">
                    <Input required
                        {...register("name")}
                        placeholder="Class name"
                        type="text"
                        className={errors.name ? "outline outline-destructive" : ""}
                        style={{ paddingLeft: "2.5rem" }}
                    />
                    <BookA className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                </div>
                {errors.name && <span className="text-destructive">{errors.name.message}</span>}

                <div className="relative">
                    <Input
                        required
                        {...register("path")}
                        placeholder="Path"
                        type="text"
                        className={errors.path ? "outline outline-destructive" : ""}
                        style={{ paddingLeft: "2.5rem" }}
                    />
                    <BookCopy className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                </div>
                {errors.path && <span className="text-destructive">{errors.path.message}</span>}

                <div className="relative">
                    <Textarea
                        {...register("syllabus", { required: true })}
                        placeholder="Syllabus"
                        style={{ paddingLeft: "2.5rem" }}
                    />
                    <NotebookText className="absolute left-3 top-1/4 -translate-y-1/2 text-gray-500" />
                </div>
                {errors.syllabus && <span className="text-destructive">{errors.syllabus.message}</span>}

                <Button type="submit" className="w-full hover:bg-[#818bff]" disabled={isSubmitting}>
                    Register by clicking here
                </Button>
            </form>

            {success && (
                <Alert variant="success">
                    <CheckCircle className="h-4 w-4" />
                    <AlertTitle>Registration Successful!</AlertTitle>
                    <AlertDescription>
                        You have successfully registered! You will be redirected to the login page.
                    </AlertDescription>
                </Alert>
            )}
            {error && (
                <Alert variant="destructive">
                    <XCircle className="h-4 w-4" />
                    <AlertTitle>Error during registration</AlertTitle>
                    <AlertDescription>There was an error during the registration</AlertDescription>
                </Alert>
            )}
        </div>
    );
};

export default CourseClassForm;
