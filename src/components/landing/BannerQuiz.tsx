
export const BannerQuiz = () => {
  return (
    <div className='w-full flex justify-between items-center px-10 py-16 bg-[#f5dacd] mt-40'>
      <div className='flex flex-col items-start text-white max-w-lg'>
        <h1 className='text-4xl md:text-9xl font-semibold mb-4'>QUIZZES FOR EVERYONE</h1>
        <p className='text-xl mb-6'>Explore a variety of quizzes across multiple subjects to test and improve your knowledge!</p>
        <button className='bg-white text-[#818bff] px-6 py-2 rounded-full text-lg font-semibold hover:bg-black'>
          Start Now
        </button>
      </div>
      <div className="flex gap-2 items-center">
        <img src="assets/gifs/logging.gif" className="max-w-42 md:max-w-md overflow-x-hidden" alt="" />
        <img src="assets/images/quiz-guy.png" className='hidden md:block max-w-xs' alt="Quiz Guy" />
      </div>
    </div>
  );
}
