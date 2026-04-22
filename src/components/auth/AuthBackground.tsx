import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const images = [
    '/rca1.jpeg',
    '/auth-bg.png', // Using available images
];

export const AuthBackground = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="absolute inset-0 z-0 bg-[#0A0E2E]">
            <AnimatePresence>
                <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                    className="absolute inset-0"
                >
                    <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                        style={{ backgroundImage: `url(${images[index]})` }}
                    />
                    {/* Overlay to ensure text readability and maintain the brand color theme */}
                    <div className="absolute inset-0 bg-[#0A0E2E]/60" />
                    <div
                        className="absolute inset-0 opacity-40"
                        style={{
                            background: 'radial-gradient(circle at center, transparent 0%, #0A0E2E 100%)'
                        }}
                    />
                </motion.div>
            </AnimatePresence>
        </div>
    );
};
