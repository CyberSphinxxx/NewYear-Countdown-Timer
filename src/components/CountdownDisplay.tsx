import { useCountdown } from '@/hooks/useCountdown';
import { TimerCard } from './TimerCard';
import { motion } from 'framer-motion';

export const CountdownDisplay = () => {
    const { timeRemaining } = useCountdown();

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
            },
        },
    };

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-wrap justify-center gap-4 p-4 md:gap-8 lg:gap-12"
        >
            <TimerCard value={timeRemaining.days} label="Days" />
            <TimerCard value={timeRemaining.hours} label="Hours" />
            <TimerCard value={timeRemaining.minutes} label="Minutes" />
            <TimerCard value={timeRemaining.seconds} label="Seconds" />
        </motion.div>
    );
};
