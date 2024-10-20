"use client";

import { motion } from "framer-motion";

interface FeatureProps {
  title: string;
  description: string;
}

const Feature = ({ title, description }: FeatureProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="p-6 rounded-xl bg-white/[.02] shadow-lg shadow-[rgba(134, 134, 134, 0.25)] border-white/[.1] border w-[calc(50%-1rem)] h-36 flex flex-col"
    >
      <h3 className="text-white text-2xl font-robotoMono mb-2">{title}</h3>
      <p className="text-light text-sm font-robotoMono">{description}</p>
    </motion.div>
  );
};

export default Feature;
