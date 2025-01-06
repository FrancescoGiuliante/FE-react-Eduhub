import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { motion } from 'framer-motion'

interface TodaySignupsProps {
    count: number
}

export const TodaySignups: React.FC<TodaySignupsProps> = ({ count }) => (
    <Card>
        <CardHeader>
            <CardTitle>Today's Signups</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="flex items-center justify-center h-[200px]">
                <motion.div
                    className="text-6xl font-bold"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                >
                    {count}
                </motion.div>
            </div>
        </CardContent>
    </Card>
)