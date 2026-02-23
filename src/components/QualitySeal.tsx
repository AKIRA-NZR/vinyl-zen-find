import { motion } from 'framer-motion';
import { Award, Crown, Star } from 'lucide-react';

const sealConfig: Record<string, { label: string; labelJp: string; icon: any; gradient: string }> = {
  premium: {
    label: 'Premium',
    labelJp: 'プレミアム',
    icon: Crown,
    gradient: 'from-yellow-600 via-amber-400 to-yellow-600',
  },
  rare: {
    label: 'Raro',
    labelJp: 'レア',
    icon: Star,
    gradient: 'from-red-700 via-rose-400 to-red-700',
  },
  classic: {
    label: 'Clássico',
    labelJp: 'クラシック',
    icon: Award,
    gradient: 'from-sky-700 via-cyan-400 to-sky-700',
  },
};

export default function QualitySeal({ seal, size = 'md' }: { seal: string; size?: 'sm' | 'md' }) {
  const config = sealConfig[seal];
  if (!config) return null;

  const Icon = config.icon;
  const s = size === 'sm' ? 'text-[10px] px-2 py-0.5 gap-1' : 'text-xs px-3 py-1 gap-1.5';

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`seal-shimmer inline-flex items-center rounded-full font-bold bg-gradient-to-r ${config.gradient} text-white shadow-lg ${s}`}
    >
      <Icon className={size === 'sm' ? 'h-3 w-3' : 'h-4 w-4'} />
      <span>{config.labelJp}</span>
    </motion.div>
  );
}
