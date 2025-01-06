import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

interface PastWeekSignupsProps {
    data: { date: string; count: number }[]
}

export const PastWeekSignups: React.FC<PastWeekSignupsProps> = ({ data }) => (
    <Card>
        <CardHeader>
            <CardTitle>Past Week Signups</CardTitle>
        </CardHeader>
        <CardContent>
            <ResponsiveContainer width="100%" height={200}>
                <BarChart data={data}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </CardContent>
    </Card>
)
