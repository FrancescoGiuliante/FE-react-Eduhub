import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

interface SignupTrendProps {
    data: { date: string; count: number }[]
}

export const SignupTrend: React.FC<SignupTrendProps> = ({ data }) => (
    <Card>
        <CardHeader>
            <CardTitle>Signup Trend (Last 30 Days)</CardTitle>
        </CardHeader>
        <CardContent>
            <ResponsiveContainer width="100%" height={200}>
                <LineChart data={data}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="count" stroke="#8884d8" strokeWidth={2} />
                </LineChart>
            </ResponsiveContainer>
        </CardContent>
    </Card>
)