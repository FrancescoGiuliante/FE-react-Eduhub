import CourseClassForm from "@/components/form/CourseClassForm";
import { useParams } from "react-router-dom";

export const ClassRegister = () => {
    const { courseID } = useParams<{ courseID: string }>();

    const courseIDNumber = parseInt(courseID || "", 10);

    return (
        <div className="flex flex-col-reverse md:flex-row px-10 md:px-60 pt-10 md:py-20">
            <img src="/assets/gifs/classroom-register.gif" className="max-w-xs" alt="" />
            <CourseClassForm courseID={courseIDNumber} />
        </div>
    );
};
