import RegisterForm from "@/components/form/RegisterForm"

export const AdminRegister = () => {

  return (
    <div className="flex flex-col-reverse md:flex-row mx-auto max-w-xs md:max-w-3xl items-center py-10">
      <img src="/assets/gifs/register-admin.gif" className="max-h-96" alt="" />
      <RegisterForm role="ADMIN" />
    </div>
  );
};