import QuizCreation from './QuizCreation'

export const CreateQuiz = () => {
    return (
        <div className="container mx-auto px-4 py-8 bg-[url('/assets/images/bg-home.png')] bg-center bg-repeat bg-cover"
            style={{ backgroundSize: '50%' }}>
            <QuizCreation />
            <img src="/assets/images/quizzes.png" className='max-w-52 mx-auto' alt="" />
        </div>
    )
}
