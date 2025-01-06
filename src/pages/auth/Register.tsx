import RegisterForm from '@/components/form/RegisterForm'

export const Register = () => {
  return (
    <div className='flex flex-col-reverse md:flex-row max-w-xs md:max-w-4xl mx-auto items-center mb-24'>
      <img src="/assets/gifs/pofile.gif" className='max-w-xs md:max-w-lg' alt="" />
      <RegisterForm />
    </div>
  )
}
