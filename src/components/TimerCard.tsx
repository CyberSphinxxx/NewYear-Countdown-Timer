import React, { useRef } from 'react';
import { motion, AnimatePresence, useMotionTemplate, useMotionValue } from 'framer-motion';
import confetti from 'canvas-confetti';

interface TimerCardProps {
    value: number;
    label: string;
}

export const TimerCard = ({ value, label }: TimerCardProps) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const cardRef = useRef<HTMLDivElement>(null);

    // Pad the value to always be at least 2 digits
    const formattedValue = value.toString().padStart(2, '0');

    // Handle mouse move for the glow effect
    const handleMouseMove = ({ clientX, clientY }: React.MouseEvent) => {
        if (!cardRef.current) return;
        const { left, top } = cardRef.current.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    };

    // Trigger confetti on click for tactile feedback
    const handleClick = () => {
        const rect = cardRef.current?.getBoundingClientRect();
        if (rect) {
            const x = (rect.left + rect.width / 2) / window.innerWidth;
            const y = (rect.top + rect.height / 2) / window.innerHeight;
            confetti({
                origin: { x, y },
                particleCount: 30,
                spread: 50,
                gravity: 0.8,
                scalar: 0.8,
                colors: ['#ff7e5f', '#feb47b', '#ffffff'],
            });
        }
    };

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onClick={handleClick}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05, y: -8 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="group relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border border-countdown-glass-border bg-black/20 p-8 backdrop-blur-glass transition-shadow hover:shadow-2xl sm:p-6 md:w-40 md:p-8"
            style={{
                boxShadow: '0 10px 20px rgba(0, 0, 0, 0.5)',
            }}
        >
            {/* Dynamic Glow Gradient Follows Mouse */}
            <motion.div
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(254, 180, 123, 0.15),
              transparent 80%
            )
          `,
                }}
            />

            {/* Border Glow */}
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(255, 255, 255, 0.3),
              transparent 80%
            )
          `,
                }}
            />

            <div className="relative z-10 flex flex-col items-center">
                <div className="relative flex h-24 w-full items-center justify-center overflow-hidden text-center sm:h-32 md:h-40">
                    <AnimatePresence mode="popLayout" initial={false}>
                        <motion.span
                            key={formattedValue}
                            initial={{ y: '100%', opacity: 0, filter: 'blur(5px)' }}
                            animate={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
                            exit={{ y: '-100%', opacity: 0, filter: 'blur(5px)' }}
                            transition={{ type: 'spring', stiffness: 500, damping: 30, mass: 1 }}
                            className="block bg-gradient-to-br from-white to-white/80 bg-clip-text text-5xl font-extrabold text-transparent sm:text-6xl md:text-7xl"
                            style={{
                                fontVariantNumeric: 'tabular-nums',
                                filter: 'drop-shadow(0 0 15px rgba(255, 223, 0, 0.45))'
                            }}
                        >
                            {formattedValue}
                        </motion.span>
                    </AnimatePresence>
                </div>

                <small className="mt-2 text-sm font-medium uppercase tracking-[0.2em] text-white/80 md:text-base">
                    {label}
                </small>
            </div>
        </motion.div>
    );
};
