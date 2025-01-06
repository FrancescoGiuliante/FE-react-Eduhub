
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import IQuestion from "@/interfaces/Question";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface QuestionSliderProps {
    questions: IQuestion[];
    onSelectQuestion: (question: IQuestion) => void;
    selectedQuestionIds: number[];
}

const QuestionSlider: React.FC<QuestionSliderProps> = ({ questions, onSelectQuestion, selectedQuestionIds }) => {
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        vertical: true,
        verticalSwiping: true,
    };

    return (
        <div className="fixed right-0 top-24 bottom-0 w-80 bg-white p-6 flex flex-col h-fit border-2 border-blue-100 rounded-lg scale-90">
            <h2 className="text-xl font-bold mb-4 text-center text-blue-400">Available Questions</h2>
            <Slider {...settings}>
                {questions
                    .filter(question => !selectedQuestionIds.includes(question.id))
                    .map((question) => (
                        <div key={question.id} className="p-2">
                            <Card className="hover:bg-slate-100 transition-colors duration-200">
                                <CardContent className="p-4">
                                    <p className="font-bold mb-2">{question.prompt}</p>
                                    <p className="text-sm text-gray-600 mb-2">Correct: {question.correctAnswer}</p>
                                    <div className="flex justify-between text-xs">
                                        <span>Rights: {question.rights || 0}</span>
                                        <span>Wrongs: {question.wrongs || 0}</span>
                                    </div>
                                    <Button
                                        variant="outline"
                                        className="w-full mt-2 hover:bg-blue-100"
                                        onClick={() => onSelectQuestion(question)}
                                    >
                                        Add to Quiz
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    ))}
            </Slider>
        </div>
    );
};

export default QuestionSlider;