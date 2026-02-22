import { motion } from "framer-motion";
import { 
  Wallet, 
  Landmark, 
  Zap, 
  Users, 
  TrendingUp, 
  ShieldCheck, 
  Banknote, 
  Database,
  Bell,
  ArrowRightLeft,
  Fingerprint,
  PiggyBank
} from "lucide-react";

const services = [
  {
    icon: Wallet,
    title: "Account Wallets",
    description: "Secure multi-asset custody for every cooperative member."
  },
  {
    icon: Landmark,
    title: "Digital Banking",
    description: "Cloud-native core processing for instant transactions."
  },
  {
    icon: Zap,
    title: "High performance",
    description: "Sub-millisecond ledger updates for global scale."
  },
  {
    icon: Users,
    title: "Membership & Shares",
    description: "Manage cooperative membership and share holdings."
  },
  {
    icon: TrendingUp,
    title: "Forecasting",
    description: "Predictive liquidity models powered by neural networks."
  },
  {
    icon: ShieldCheck,
    title: "Secure Cooperative",
    description: "Military-grade encryption for total data sovereignty."
  },
  {
    icon: Banknote,
    title: "Loans & Grants",
    description: "Streamlined lending and grant management system."
  },
  {
    icon: Database,
    title: "Data Storage & APIs",
    description: "Extensible endpoints for third-party fintech integration."
  }
];

const floatingCards = [
  {
    icon: Bell,
    title: "Real-time Alerts",
    description: "Instant push notifications for every transaction.",
    position: "top-left",
    delay: 0
  },
  {
    icon: ArrowRightLeft,
    title: "Easy Transfers",
    description: "Seamless peer-to-peer cooperative sharing.",
    position: "top-right",
    delay: 0.2
  },
  {
    icon: Fingerprint,
    title: "Biometric Security",
    description: "Military-grade Face and Touch ID integration.",
    position: "bottom-left",
    delay: 0.4
  },
  {
    icon: PiggyBank,
    title: "Smart Savings",
    description: "AI-driven round-ups and automated goal tracking.",
    position: "bottom-right",
    delay: 0.6
  }
];

// REDUCED from 6 to 3 coins
const miniCoins = [
  { symbol: "$", backSymbol: "₱", shade: "light" },
  { symbol: "€", backSymbol: "£", shade: "base" },
  { symbol: "¥", backSymbol: "₹", shade: "dark" }
];

const coinColors = {
  lightest: { from: "#a7f3d0", to: "#34d399", edge: ["#6ee7b7", "#34d399"] },
  light: { from: "#6ee7b7", to: "#10b981", edge: ["#34d399", "#10b981"] },
  medium: { from: "#34d399", to: "#059669", edge: ["#10b981", "#059669"] },
  base: { from: "#10b981", to: "#047857", edge: ["#059669", "#047857"] },
  dark: { from: "#059669", to: "#065f46", edge: ["#047857", "#065f46"] },
  darkest: { from: "#047857", to: "#064e3b", edge: ["#065f46", "#064e3b"] }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

// Smooth gradient with many stops to prevent banding
const createSmoothGradient = (color1, color2, angle = 135) => {
  return `linear-gradient(${angle}deg, 
    ${color1} 0%, 
    ${color2} 11%,
    ${color1} 22%,
    ${color2} 33%,
    ${color1} 44%,
    ${color2} 55%,
    ${color1} 66%,
    ${color2} 77%,
    ${color1} 88%,
    ${color2} 100%
  )`;
};

const RealisticCoin = ({ 
  symbol, 
  backSymbol, 
  colors, 
  size = "normal", 
  isMain = false 
}) => {
  const sizeClasses = {
    small: "w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-sm sm:text-base lg:text-lg",
    normal: "w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 text-base sm:text-lg lg:text-2xl",
    large: "w-20 h-20 sm:w-28 sm:h-28 lg:w-40 lg:h-40 text-2xl sm:text-3xl lg:text-5xl"
  };

  const thickness = isMain ? 6 : size === "normal" ? 4 : 3;
  const edgeGradient = `linear-gradient(to bottom, ${colors.edge[0]} 0%, ${colors.from} 20%, ${colors.to} 50%, ${colors.from} 80%, ${colors.edge[1]} 100%)`;

  const mainGradient = {
    backgroundImage: `
      radial-gradient(ellipse at 30% 30%, rgba(255,255,255,0.6) 0%, transparent 40%),
      radial-gradient(ellipse at 70% 70%, rgba(0,0,0,0.2) 0%, transparent 40%),
      ${createSmoothGradient(colors.from, colors.to, 135)}
    `
  };

  const backGradient = {
    backgroundImage: `
      radial-gradient(ellipse at 70% 30%, rgba(255,255,255,0.5) 0%, transparent 40%),
      radial-gradient(ellipse at 30% 70%, rgba(0,0,0,0.2) 0%, transparent 40%),
      ${createSmoothGradient(colors.from, colors.to, 315)}
    `
  };

  return (
    <div className="relative" style={{ transformStyle: "preserve-3d" }}>
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-4 opacity-60"
        style={{
          width: isMain ? "80%" : "70%",
          height: isMain ? "20%" : "15%",
          background: "radial-gradient(ellipse at center, rgba(0,0,0,0.5) 0%, transparent 70%)",
          filter: "blur(8px)",
          transform: "translate(-50%, 50%) rotateX(70deg) scaleY(0.3)"
        }}
      />

      <motion.div
        animate={{ rotateY: isMain ? 360 : -360 }}
        className={`relative ${sizeClasses[size]} rounded-full`}
        style={{ transformStyle: "preserve-3d" }}
        transition={{ duration: isMain ? 8 : 3, repeat: Infinity, ease: "linear" }}
      >
        {[...Array(thickness)].map((_, i) => (
          <div
            className="absolute inset-0 rounded-full"
            key={i}
            style={{
              background: edgeGradient,
              transform: `translateZ(-${i + 1}px)`,
              boxShadow: "inset 0 0 5px rgba(0,0,0,0.3)"
            }}
          />
        ))}

        <div 
          className="absolute inset-0 rounded-full flex items-center justify-center overflow-hidden"
          style={{
            ...mainGradient,
            boxShadow: `
              inset 0 0 20px rgba(0,0,0,0.3),
              inset 0 0 5px rgba(255,255,255,0.6),
              0 0 0 2px ${colors.edge[1]},
              0 0 0 4px ${colors.to}
            `,
            transform: "translateZ(0px)",
            backfaceVisibility: "hidden"
          }}
        >
          <div 
            className="absolute inset-2 rounded-full border-2 border-white/30"
            style={{
              boxShadow: "inset 0 0 10px rgba(0,0,0,0.2), 0 0 5px rgba(255,255,255,0.2)"
            }}
          />
          
          <span 
            className="relative font-bold z-10"
            style={{
              color: "transparent",
              background: "linear-gradient(to bottom, #ffffff 0%, #d1fae5 50%, #ffffff 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              textShadow: "0 2px 4px rgba(0,0,0,0.4), 0 -1px 2px rgba(255,255,255,0.9)",
              filter: "drop-shadow(0 2px 2px rgba(0,0,0,0.5))"
            }}
          >
            {symbol}
          </span>

          <div 
            className="absolute top-3 left-3 w-1/4 h-1/4 rounded-full opacity-50"
            style={{
              background: "radial-gradient(circle, rgba(255,255,255,0.9) 0%, transparent 60%)",
              filter: "blur(4px)"
            }}
          />
        </div>

        <div 
          className="absolute inset-0 rounded-full flex items-center justify-center overflow-hidden"
          style={{
            ...backGradient,
            boxShadow: `
              inset 0 0 20px rgba(0,0,0,0.3),
              inset 0 0 5px rgba(255,255,255,0.5),
              0 0 0 2px ${colors.edge[1]},
              0 0 0 4px ${colors.to}
            `,
            transform: `rotateY(180deg) translateZ(${thickness}px)`,
            backfaceVisibility: "hidden"
          }}
        >
          <div 
            className="absolute inset-2 rounded-full border-2 border-white/20"
            style={{
              boxShadow: "inset 0 0 10px rgba(0,0,0,0.2)"
            }}
          />
          
          <span 
            className="relative font-bold z-10"
            style={{
              color: "transparent",
              background: "linear-gradient(to bottom, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.6) 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              textShadow: "0 2px 4px rgba(0,0,0,0.3)"
            }}
          >
            {backSymbol}
          </span>
        </div>
      </motion.div>

      {isMain && (
        <>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 sm:w-40 sm:h-40 lg:w-56 lg:h-56 rounded-full bg-emerald-500/20 blur-3xl -z-10" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 sm:w-32 sm:h-32 lg:w-48 lg:h-48 rounded-full bg-emerald-400/30 blur-2xl -z-10" />
        </>
      )}
    </div>
  );
};

export default function ServicesSection() {
  return (
    <section className="relative min-h-screen py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          <motion.div 
            className="relative h-[350px] sm:h-[450px] lg:h-[600px] flex items-center justify-center"
            initial={{ opacity: 0, x: -50 }}
            style={{ perspective: "1000px" }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 lg:-translate-x-[65%]">
              
              <div className="relative w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] lg:w-[260px] lg:h-[400px]">
                
                {/* First wave - now only 3 coins instead of 6 */}
                {miniCoins.map((coin, i) => {
                  const angle = (i / miniCoins.length) * 360;
                  const distance = 100;
                  const delay = i * 0.4;
                  const colors = coinColors[coin.shade];
                  
                  return (
                    <motion.div
                      animate={{ 
                        x: [
                          "-50%", 
                          `${Math.cos(angle * Math.PI / 180) * distance - 50}%`
                        ],
                        y: [
                          "-50%", 
                          `${Math.sin(angle * Math.PI / 180) * distance - 50}%`
                        ],
                        opacity: [0, 1, 1, 0],
                        scale: [0, 0.9, 0.8, 0.5]
                      }}
                      className="absolute top-1/2 left-1/2 pointer-events-none"
                      initial={{ 
                        x: "-50%", 
                        y: "-50%", 
                        opacity: 0,
                        scale: 0
                      }}
                      key={i}
                      style={{ zIndex: 30 }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        delay: delay,
                        ease: "easeOut",
                        times: [0, 0.2, 0.7, 1]
                      }}
                    >
                      <RealisticCoin 
                        backSymbol={coin.backSymbol} 
                        colors={colors} 
                        size="normal"
                        symbol={coin.symbol}
                      />
                    </motion.div>
                  );
                })}

                {/* Second wave - now only 2 coins instead of 4 */}
                {miniCoins.slice(0, 2).map((coin, i) => {
                  const angle = ((i / 2) * 360) + 45;
                  const distance = 130;
                  const delay = i * 0.5 + 2;
                  const colors = coinColors[coin.shade];
                  
                  return (
                    <motion.div
                      animate={{ 
                        x: [
                          "-50%", 
                          `${Math.cos(angle * Math.PI / 180) * distance - 50}%`
                        ],
                        y: [
                          "-50%", 
                          `${Math.sin(angle * Math.PI / 180) * distance - 50}%`
                        ],
                        opacity: [0, 0.8, 0.8, 0],
                        scale: [0, 0.7, 0.6, 0.4] 
                      }}
                      className="absolute top-1/2 left-1/2 pointer-events-none"
                      initial={{ 
                        x: "-50%", 
                        y: "-50%", 
                        opacity: 0,
                        scale: 0
                      }}
                      key={`second-${i}`}
                      style={{ zIndex: 30 }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        delay: delay,
                        ease: "easeOut",
                        times: [0, 0.15, 0.6, 1]
                      }}
                    >
                      <RealisticCoin 
                        backSymbol={coin.backSymbol} 
                        colors={colors} 
                        size="small"
                        symbol={coin.symbol}
                      />
                    </motion.div>
                  );
                })}

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ zIndex: 10 }}>
                  <RealisticCoin 
                    backSymbol="₱" 
                    colors={coinColors.base} 
                    isMain={true}
                    size="large"
                    symbol="$"
                  />
                </div>

                <motion.div
                  animate={{ rotate: 360 }}
                  className="absolute inset-6 sm:inset-8 lg:inset-12 rounded-full border border-emerald-500/20"
                  style={{ zIndex: 5 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-emerald-400 rounded-full shadow-[0_0_15px_rgba(52,211,153,0.8)]" />
                </motion.div>

                <motion.div
                  animate={{ rotate: -360 }}
                  className="absolute inset-0 sm:inset-2 lg:inset-4 rounded-full border border-emerald-500/15"
                  style={{ zIndex: 5 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                >
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1 h-1 sm:w-1.5 sm:h-1.5 bg-emerald-300 rounded-full shadow-[0_0_10px_rgba(52,211,153,0.6)]" />
                </motion.div>

                {[...Array(6)].map((_, i) => (
                  <motion.div
                    animate={{
                      x: [0, Math.cos(i * 60 * Math.PI / 180) * 100],
                      y: [0, Math.sin(i * 60 * Math.PI / 180) * 100],
                      opacity: [0.2, 0.8, 0.2],
                      scale: [0.8, 1.2, 0.8]
                    }}
                    className="absolute w-1 h-1 sm:w-1.5 sm:h-1.5 bg-emerald-400/60 rounded-full top-1/2 left-1/2"
                    key={`particle-${i}`}
                    style={{ zIndex: 5 }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      delay: i * 0.5,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </div>

              {/* FIXED: Stats cards with better mobile positioning */}
              {floatingCards.map((card, index) => {
                // Much closer positioning for mobile so cards stay visible
                const positions = {
                  "top-left": "top-0 -left-12 sm:-left-16 lg:-left-40",
                  "top-right": "top-0 -right-12 sm:-right-16 lg:-right-40",
                  "bottom-left": "bottom-0 -left-12 sm:-left-16 lg:-left-40",
                  "bottom-right": "bottom-0 -right-12 sm:-right-16 lg:-right-40"
                };
                
                const linePositions = {
                  "top-left": "top-1/3 left-0 w-10 sm:w-14 lg:w-32 h-px origin-right -rotate-12",
                  "top-right": "top-1/3 right-0 w-10 sm:w-14 lg:w-32 h-px origin-left rotate-12",
                  "bottom-left": "bottom-1/3 left-0 w-10 sm:w-14 lg:w-32 h-px origin-right rotate-12",
                  "bottom-right": "bottom-1/3 right-0 w-10 sm:w-14 lg:w-32 h-px origin-left -rotate-12"
                };

                return (
                  <motion.div
                    className={`absolute ${positions[card.position as keyof typeof positions]}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    key={index}
                    transition={{ delay: card.delay + 0.5, duration: 0.6 }}
                    viewport={{ once: true }}
                    whileInView={{ opacity: 1, scale: 1 }}
                  >
                    {/* Connecting line - shorter on mobile */}
                    <motion.div
                      className={`absolute ${linePositions[card.position as keyof typeof linePositions]} bg-gradient-to-r from-emerald-500/50 to-transparent hidden sm:block`}
                      initial={{ scaleX: 0 }}
                      transition={{ delay: card.delay + 0.8, duration: 0.8 }}
                      viewport={{ once: true }}
                      whileInView={{ scaleX: 1 }}
                    />
                    
                    {/* Animated dot - smaller on mobile */}
                    <motion.div
                      animate={{ 
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 1, 0.5]
                      }}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 sm:w-1.5 sm:h-1.5 lg:w-2 lg:h-2 bg-emerald-400 rounded-full hidden sm:block"
                      transition={{ duration: 2, repeat: Infinity, delay: card.delay }}
                    />
                    
                    {/* Card - compact on mobile, normal on desktop */}
                    <motion.div
                      animate={{ y: [0, -4, 0] }}
                      className="relative p-2 sm:p-3 lg:p-4 rounded-lg sm:rounded-xl border border-emerald-500/20 backdrop-blur-md w-24 sm:w-32 lg:w-48 shadow-[0_0_20px_rgba(16,185,129,0.1)]"
                      transition={{ duration: 3, repeat: Infinity, delay: card.delay, ease: "easeInOut" }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 rounded-md sm:rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 mb-1 sm:mb-2">
                        <card.icon className="w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-4 lg:h-4" />
                      </div>
                      <h4 className="text-white font-semibold text-[9px] sm:text-[11px] lg:text-xs mb-0.5">{card.title}</h4>
                      <p className="text-gray-400 text-[7px] sm:text-[9px] lg:text-[10px] leading-tight hidden sm:block">{card.description}</p>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
                What are <span className="text-emerald-400">you</span> up to?
              </h2>
              <p className="mt-3 text-gray-400 text-sm sm:text-base max-w-lg">
                Our comprehensive cooperative banking platform helps cooperatives and credit unions build stronger financial communities.
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-3"
              initial="hidden"
              variants={containerVariants}
              viewport={{ once: true }}
              whileInView="visible"
            >
              {services.map((service, index) => (
                <motion.div
                  className="group p-3 sm:p-4 rounded-xl border border-gray-800/50 backdrop-blur-sm transition-all duration-300"
                  key={index}
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.02,
                    backgroundColor: "rgba(16, 185, 129, 0.05)",
                    borderColor: "rgba(16, 185, 129, 0.3)"
                  }}
                >
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-2 sm:mb-3 group-hover:bg-emerald-500/20 group-hover:border-emerald-500/40 transition-all duration-300">
                    <service.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-white font-semibold text-xs sm:text-sm mb-1 group-hover:text-emerald-100 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-gray-500 text-xs leading-relaxed">
                    {service.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}