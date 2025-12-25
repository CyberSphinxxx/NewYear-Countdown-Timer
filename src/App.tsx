import { useEffect } from 'react';
import { CountdownDisplay } from '@/components/CountdownDisplay';
import { useCountdown } from '@/hooks/useCountdown';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
    const { isNewYear } = useCountdown();

    // Automatic confetti celebration when New Year arrives
    useEffect(() => {
        if (isNewYear) {
            const duration = 15 * 1000;
            const animationEnd = Date.now() + duration;
            const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

            const randomInRange = (min: number, max: number) => {
                return Math.random() * (max - min) + min;
            };

            const interval = setInterval(function () {
                const timeLeft = animationEnd - Date.now();

                if (timeLeft <= 0) {
                    return clearInterval(interval);
                }

                const particleCount = 50 * (timeLeft / duration);
                confetti({
                    ...defaults,
                    particleCount,
                    origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
                });
                confetti({
                    ...defaults,
                    particleCount,
                    origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
                });
            }, 250);

            return () => clearInterval(interval);
        }
    }, [isNewYear]);

    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-cover bg-fixed bg-center font-display text-white selection:bg-countdown-primary selection:text-white"
            style={{ backgroundImage: 'url(/assets/imgs/rdr2horse.jpg)' }}
        >
            {/* Dark overlay for better text contrast */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[8px]" />

            <main className="relative z-10 flex w-full flex-col items-center justify-center px-4 pb-32">
                <motion.h1
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, type: "spring" }}
                    className="mb-8 text-center text-4xl font-black uppercase tracking-widest sm:mb-12 sm:text-5xl md:text-7xl lg:text-8xl"
                >
                    <span className="bg-gradient-to-r from-countdown-primary to-countdown-secondary bg-clip-text text-transparent drop-shadow-[0_2px_15px_rgba(255,223,0,0.5)]">
                        New Year
                    </span>
                    <br />
                    <span className="text-white drop-shadow-md tracking-widest">Countdown</span>
                </motion.h1>

                <AnimatePresence mode="wait">
                    {isNewYear ? (
                        <motion.div
                            key="new-year"
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 200, damping: 20 }}
                            className="text-center"
                        >
                            <h2 className="text-6xl font-black uppercase tracking-widest text-yellow-400 drop-shadow-[0_0_25px_rgba(255,223,0,0.8)] sm:text-7xl md:text-9xl">
                                Happy<br />New Year!
                            </h2>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="countdown"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                        >
                            <CountdownDisplay />
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
}

export default App;
