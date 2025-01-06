import LoginForm from '@/components/form/LoginForm'

export const Login = () => {
    return (
        <div className='flex flex-col-reverse md:flex-row max-w-xs md:max-w-3xl mx-auto items-center'>
            <img src="assets/gifs/login.gif" className='max-w-80 md:max-w-md' alt="" />
            <LoginForm />
        </div>
    )
}

