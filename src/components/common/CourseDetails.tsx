import { useAuth } from '@/contexts/AuthContext';
import ICourse from '@/interfaces/Course';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card, CardContent } from '../ui/card';

interface CourseDetailsProps {
    courseID: number;
}

const API_URL = import.meta.env.VITE_API_URL;

export const CourseDetails = ({ courseID }: CourseDetailsProps) => {
    const { token } = useAuth();
    const [course, setCourse] = useState<ICourse | null>(null);

    useEffect(() => {
        if (courseID) {
            axios
                .get(`${API_URL}/course/${courseID}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => {
                    setCourse(response.data);
                })
                .catch((err) => {
                    console.error("Error fetching course data:", err);
                });
        }
    }, [courseID]);


    const renderDescription = (description: string) => {
        const paragraphs = description.split('\n\n');
        return paragraphs.map((paragraph, index) => {
            const sentences = paragraph.split('\n');
            return (
                <div key={index} className="mb-10 last:mb-0">
                    {sentences.map((sentence, sentenceIndex) => {
                        const parts = sentence.split(/(\*\*.*?\*\*)/);
                        return (
                            <React.Fragment key={sentenceIndex}>
                                {sentence.trim().startsWith('-') && sentenceIndex > 0 && <br />}
                                {parts.map((part, partIndex) => {
                                    if (part.startsWith('**') && part.endsWith('**')) {
                                        const text = part.slice(2, -2);
                                        return (
                                            <React.Fragment key={partIndex}>
                                                <strong className="text-primary font-bold text-2xl">{text}</strong>
                                                {partIndex < parts.length - 1 && parts[partIndex + 1].startsWith(':') && ': '}
                                            </React.Fragment>
                                        );
                                    }
                                    return (
                                        <span key={partIndex} className="text-gray-700 text-xl">
                                            {part.startsWith(':') ? part.slice(1).trim() : part}
                                        </span>
                                    );
                                })}
                            </React.Fragment>
                        );
                    })}
                </div>
            );
        });
    };



    if (!course) {
        return <div className="text-center text-red-500">Failed to load course details.</div>;
    }
    return (
        <div className="w-full px-4 py-12 bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-5xl md:text-5xl font-extrabold bg-clip-text bg-gradient-to-r text-blue-300 mb-12 text-center">
                    {course.path}
                </h1>
                <Card className="w-full shadow-md">
                    <CardContent className="p-8 md:p-12">
                        <div className="prose prose-xl lg:prose-2xl max-w-none">
                            {renderDescription(course.description)}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};


