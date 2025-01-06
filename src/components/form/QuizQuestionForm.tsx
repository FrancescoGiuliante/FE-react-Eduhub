import React, { useState } from 'react'
import axios from 'axios'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Trash2, Plus } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"
import IQuestion from '@/interfaces/Question'
import { useAuth } from '@/contexts/AuthContext'
import { Toaster } from '../ui/toaster'


type QuestionFormValues = Omit<IQuestion, 'id' | 'wrongs' | 'rights'>

interface QuizQuestionFormProps {
    professorID: number
}

const API_URL = import.meta.env.VITE_API_URL;
export const QuizQuestionForm: React.FC<QuizQuestionFormProps> = ({ professorID }) => {
    const [prompt, setPrompt] = useState('')
    const [answers, setAnswers] = useState(['', ''])
    const [correctAnswer, setCorrectAnswer] = useState('')
    const { toast } = useToast()
    const { token } = useAuth() 

    const handleAddAnswer = () => {
        setAnswers([...answers, ''])
    }

    const handleRemoveAnswer = (index: number) => {
        const newAnswers = answers.filter((_, i) => i !== index)
        setAnswers(newAnswers)
        if (correctAnswer === answers[index]) {
            setCorrectAnswer('')
        }
    }

    const handleAnswerChange = (index: number, value: string) => {
        const newAnswers = [...answers]
        newAnswers[index] = value
        setAnswers(newAnswers)
        if (correctAnswer === answers[index]) {
            setCorrectAnswer(value)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const formData: QuestionFormValues = {
            prompt,
            answers,
            correctAnswer,
            professorID
        }

        console.log('Form Data:', formData)

        try {
            const response = await axios.post(
                `${API_URL}/question`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );
            console.log('API Response:', response.data)
            toast({
                title: "Question Created",
                description: "Your quiz question has been successfully created.",
            })
        } catch (error) {
            console.error('Error submitting question:', error)
            toast({
                title: "Error",
                description: "There was an error creating your question. Please try again.",
                variant: "destructive"
            })
        }
    }

    return (
        <Card className="w-full max-w-2xl mx-auto shadow-lg">
            <CardHeader className="bg-gradient-to-r bg-blue-100">
                <CardTitle className="text-2xl font-bold text-blue-500">Create a New Quiz Question</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <Label htmlFor="prompt" className="text-lg font-semibold">Question Prompt</Label>
                        <Input
                            id="prompt"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="Enter your question here"
                            className="text-lg mt-1"
                            required
                        />
                    </div>

                    <div className="space-y-4">
                        <Label className="text-lg font-semibold">Answers</Label>
                        {answers.map((answer, index) => (
                            <div key={index} className="flex items-center space-x-2 bg-gray-50 p-3 rounded-md">
                                <RadioGroup
                                    value={correctAnswer}
                                    onValueChange={setCorrectAnswer}
                                    className="flex items-center"
                                >
                                    <RadioGroupItem value={answer} id={`correct-${index}`} />
                                </RadioGroup>
                                <Input
                                    value={answer}
                                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                                    placeholder="Enter answer"
                                    className="flex-grow"
                                    required
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleRemoveAnswer(index)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                    </div>

                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="mt-2"
                        onClick={handleAddAnswer}
                    >
                        <Plus className="h-4 w-4 mr-2" /> Add Answer
                    </Button>

                    <Button
                        type="submit"
                        className="w-full bg-gradient-to-r hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-full transition-all duration-200 ease-in-out transform hover:scale-105"
                        disabled={prompt === '' || answers.length < 2 || correctAnswer === ''}
                    >
                        Submit Question
                    </Button>
                </form>
            </CardContent>
            <Toaster />
        </Card>
    )
}

