import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import IUser from "@/interfaces/User";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { CheckCircle, Eye, EyeOff, XCircle, User, AtSign, Lock, LockOpen } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const STORAGE_URL = import.meta.env.VITE_STORAGE_URL;

interface IRegisterFormProps {
    role?: "USER" | "ADMIN" | "STUDENT" | "PROFESSOR";
    user?: IUser;
}

const registerFormSchema = z
    .object({
        name: z.string(),
        lastName: z.string(),
        email: z.string().email(),
        password: z.string().min(8),
        confirmPassword: z.string().min(8),
        role: z.enum(["USER", "ADMIN", "STUDENT", "PROFESSOR"]).optional(),
    })
    .superRefine(({ confirmPassword, password }, ctx) => {
        if (confirmPassword !== password) {
            ctx.addIssue({
                code: "custom",
                message: "The passwords did not match",
                path: ["confirmPassword"],
            });
        }
    });

type RegisterFormValues = z.infer<typeof registerFormSchema>;

const initialValues = {
    name: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "USER",
};

const RegisterForm = ({ role = "USER", user }: IRegisterFormProps) => {
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

    const navigate = useNavigate();
    const { token, setUserData } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFormValues>({
        defaultValues: user
            ? {
                name: user.name,
                lastName: user.lastName,
                email: user.email,
                password: "",
                confirmPassword: "",
                role: user.role as "USER" | "ADMIN" | "STUDENT" | "PROFESSOR",
            }
            : { ...initialValues, role },
        resolver: zodResolver(registerFormSchema),
    });


    const submitHandler: SubmitHandler<RegisterFormValues> = (data) => {
        const userData = { ...data };
        setError(false);
        setSuccess(false);

        if (user) {
            axios
                .put(
                    `${STORAGE_URL}/auth/user/${user.id}`,
                    userData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`, 
                        },
                    }
                )
                .then((res) => {
                    setUserData(res.data);
                    setSuccess(true);
                })
                .catch((err) => {
                    setError(true);
                    console.log(err);
                });
        } else {
            axios
                .post(`${STORAGE_URL}/auth/register`, userData)
                .then((res) => {
                    console.log(res.data);
                    setSuccess(true);

                    if (role === "USER") {
                        setTimeout(() => {
                            navigate("/login");
                        }, 2500);
                    }
                })
                .catch((err) => {
                    setError(true);
                    console.log(err);
                });
        }
    };


    return (
        <div className="container max-w-md mx-auto py-6 space-y-5">
            <div className="mb-4">
                <h1 className="font-bold text-4xl text-[#818bff]">
                    {user ? "Update Profile" : "Register"}
                </h1>
                <p>
                    {user
                        ? "Update your account information"
                        : role
                            ? `Register new ${role.toLowerCase()}`
                            : "Register as a new user"}
                </p>
            </div>
            <form className="space-y-4" onSubmit={handleSubmit(submitHandler)}>
                <div className="relative">
                    <Input
                        {...register("name")}
                        placeholder="First name"
                        type="text"
                        className={cn(errors.name && "outline outline-destructive")}
                        style={{ paddingLeft: "2.5rem" }}
                    />
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                </div>
                {errors.name && (
                    <span className="text-destructive">{errors.name.message as string}</span>
                )}
                <div className="relative">
                    <Input
                        {...register("lastName")}
                        placeholder="Last name"
                        type="text"
                        className={cn(errors.lastName && "outline outline-destructive")}
                        style={{ paddingLeft: "2.5rem" }}
                    />
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                </div>
                {errors.lastName && (
                    <span className="text-destructive">{errors.lastName.message as string}</span>
                )}
                <div className="relative">
                    <Input
                        {...register("email", { required: true })}
                        placeholder="Email"
                        type="email"
                        style={{ paddingLeft: "2.5rem" }}
                    />
                    <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                </div>
                {errors.email && (
                    <span className="text-destructive">{errors.email.message as string}</span>
                )}
                <div className="relative">
                    <Input
                        {...register("password", { required: true })}
                        placeholder="Password"
                        className="pr-10"
                        type={isPasswordVisible ? "text" : "password"}
                        style={{ paddingLeft: "2.5rem" }}
                    />
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    <Button
                        type="button"
                        className="absolute right-1 top-1/2 -translate-y-1/2 p-0 size-8 cursor-pointer"
                        variant="ghost"
                        onClick={() => {
                            setIsPasswordVisible(!isPasswordVisible);
                        }}
                    >
                        <span className="pointer-events-none">
                            {isPasswordVisible ? <EyeOff /> : <Eye />}
                        </span>
                    </Button>
                </div>
                {errors.password && (
                    <span className="text-destructive">{errors.password.message as string}</span>
                )}
                <div className="relative">
                    <Input
                        {...register("confirmPassword", { required: true })}
                        placeholder="Confirm Password"
                        className="pr-10"
                        type={isConfirmPasswordVisible ? "text" : "password"}
                        style={{ paddingLeft: "2.5rem" }}
                    />
                    <LockOpen className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    <Button
                        type="button"
                        className="absolute right-1 top-1/2 -translate-y-1/2 p-0 size-8 cursor-pointer"
                        variant="ghost"
                        onClick={() => {
                            setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
                        }}
                    >
                        <span className="pointer-events-none">
                            {isConfirmPasswordVisible ? <EyeOff /> : <Eye />}
                        </span>
                    </Button>
                </div>
                {errors.confirmPassword && (
                    <span className="text-destructive">
                        {errors.confirmPassword.message as string}
                    </span>
                )}
                <Button
                    type="submit"
                    className="w-full hover:bg-[#818bff]"
                    disabled={isSubmitting}
                >
                    {user ? "Update Profile" : "Register by clicking here"}
                </Button>
            </form>
            {success && (
                <Alert variant="success">
                    <CheckCircle className="h-4 w-4" />
                    <AlertTitle>
                        {user ? "Profile Updated Successfully!" : "Registration Successful!"}
                    </AlertTitle>
                    <AlertDescription>
                        {user
                            ? "Your profile has been updated successfully."
                            : "You have successfully registered! You will be redirected to the login page."}
                    </AlertDescription>
                </Alert>
            )}
            {error && (
                <Alert variant="destructive">
                    <XCircle className="h-4 w-4" />
                    <AlertTitle>{user ? "Error Updating Profile" : "Error during registration"}</AlertTitle>
                    <AlertDescription>
                        {user
                            ? "There was an error while updating your profile."
                            : "There was an error during the registration."}
                    </AlertDescription>
                </Alert>
            )}
        </div>
    );

};

export default RegisterForm;
