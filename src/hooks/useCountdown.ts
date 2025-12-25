import { useState, useEffect } from 'react';

// Constants for time calculation to avoid magic numbers
const MILLISECONDS_PER_SECOND = 1000;
const SECONDS_PER_MINUTE = 60;
const MINUTES_PER_HOUR = 60;
const HOURS_PER_DAY = 24;

const MILLISECONDS_PER_MINUTE = MILLISECONDS_PER_SECOND * SECONDS_PER_MINUTE;
const MILLISECONDS_PER_HOUR = MILLISECONDS_PER_MINUTE * MINUTES_PER_HOUR;
const MILLISECONDS_PER_DAY = MILLISECONDS_PER_HOUR * HOURS_PER_DAY;

export interface TimeRemaining {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    total: number;
}

export const useCountdown = () => {
    const [isNewYear, setIsNewYear] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        total: 0,
    });

    useEffect(() => {
        // Calculate next New Year
        const currentYear = new Date().getFullYear();
        const nextNewYear = new Date(currentYear + 1, 0, 1).getTime();

        const calculateTimeRemaining = () => {
            const now = new Date().getTime();
            const distance = nextNewYear - now;

            if (distance <= 0) {
                setIsNewYear(true);
                return {
                    days: 0,
                    hours: 0,
                    minutes: 0,
                    seconds: 0,
                    total: 0,
                };
            }

            setIsNewYear(false);

            return {
                days: Math.floor(distance / MILLISECONDS_PER_DAY),
                hours: Math.floor((distance % MILLISECONDS_PER_DAY) / MILLISECONDS_PER_HOUR),
                minutes: Math.floor((distance % MILLISECONDS_PER_HOUR) / MILLISECONDS_PER_MINUTE),
                seconds: Math.floor((distance % MILLISECONDS_PER_MINUTE) / MILLISECONDS_PER_SECOND),
                total: distance,
            };
        };

        // Initial calculation
        setTimeRemaining(calculateTimeRemaining());

        // Update every second
        const intervalId = setInterval(() => {
            const remaining = calculateTimeRemaining();
            setTimeRemaining(remaining);
        }, 1000);

        // Cleanup on unmount
        return () => clearInterval(intervalId);
    }, []);

    return { timeRemaining, isNewYear };
};
