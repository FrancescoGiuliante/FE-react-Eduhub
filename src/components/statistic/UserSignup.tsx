'use client'

import React, { useMemo } from 'react'
import { useStoreContext } from '@/contexts/StoreContext'
import { format, subDays, startOfToday, parseISO, isToday, isSameDay, eachDayOfInterval } from 'date-fns'
import { motion } from 'framer-motion'
import { PastWeekSignups } from './PastWeekSignup'
import { TodaySignups } from './TodaySignups'
import { SignupTrend } from './SignupTrend'

export const UserSignup: React.FC = () => {
    const { users } = useStoreContext()
    const today = startOfToday()

    const pastWeekSignups = useMemo(() => {
        const last7Days = Array.from({ length: 7 }, (_, i) => subDays(today, i))
        return last7Days.map(date => ({
            date: format(date, 'MMM dd'),
            count: users.filter(user => isSameDay(parseISO(user.createdAt), date)).length
        })).reverse()
    }, [users])

    const todaySignups = useMemo(() => {
        return users.filter(user => isToday(parseISO(user.createdAt))).length
    }, [users])

    const signupTrend = useMemo(() => {
        const startDate = subDays(today, 30)
        const dateRange = eachDayOfInterval({ start: startDate, end: today })
        return dateRange.map(date => ({
            date: format(date, 'MMM dd'),
            count: users.filter(user => isSameDay(parseISO(user.createdAt), date)).length
        }))
    }, [users])

    return (
        <div className="p-6 bg-blue-100 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">User Signup Statistics</h1>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <PastWeekSignups data={pastWeekSignups} />
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <TodaySignups count={todaySignups} />
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <SignupTrend data={signupTrend} />
                </motion.div>
            </div>
        </div>
    )
}