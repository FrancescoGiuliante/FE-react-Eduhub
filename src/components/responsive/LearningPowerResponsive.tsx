import { Link } from 'react-router-dom'
import { Button } from '../ui/button'

export const LearningPowerResponsive = () => {
    return (
        <div className='flex flex-col mt-24 justify-center items-center text-center'>
            <img src="assets/gifs/learning-power.gif" alt="" />
            <h1 className='text-[#636ee4] text-4xl -mt-10'>LEARN THE POWER OF KNOWLEDGE</h1>
            <Link to="/register">
                <Button className="bg-[#636ee4] mt-10 text-white py-2 px-6 rounded-xl text-lg hover:bg-black">
                    Register here
                </Button>
            </Link>
        </div>
    )
}
