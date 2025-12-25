import type { Config } from 'tailwindcss';

const config: Config = {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                countdown: {
                    primary: 'hsl(24, 100%, 68%)',
                    secondary: 'hsl(30, 97%, 74%)',
                    glow: 'hsl(51, 100%, 50%)',
                    'glass-bg': 'rgba(255, 255, 255, 0.15)',
                    'glass-border': 'rgba(255, 255, 255, 0.25)',
                },
            },
            backdropBlur: {
                glass: '12px',
            },
            fontFamily: {
                display: ['Poppins', 'system-ui', 'sans-serif'],
            },
            keyframes: {
                'pulse-glow': {
                    '0%, 100%': {
                        textShadow: '3px 3px 20px rgba(255, 223, 0, 1)',
                    },
                    '50%': {
                        textShadow: '3px 3px 30px rgba(255, 223, 0, 1)',
                    },
                },
                'gradient-shift': {
                    '0%, 100%': {
                        backgroundPosition: '0% 50%',
                    },
                    '50%': {
                        backgroundPosition: '100% 50%',
                    },
                },
            },
            animation: {
                'pulse-glow': 'pulse-glow 1.5s infinite',
                'gradient-shift': 'gradient-shift 3s ease infinite',
            },
        },
    },
    plugins: [],
};

export default config;
