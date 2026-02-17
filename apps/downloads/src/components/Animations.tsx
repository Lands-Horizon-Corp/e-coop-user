import React from "react";

export default function Animations() {
  return (
    <style>{`
      @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-18px)} }
      .animate-float { animation: float 6s ease-in-out infinite; }

      @keyframes particle-1 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
      @keyframes particle-2 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-16px)} }
      @keyframes particle-3 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-22px)} }

      .animate-particle-1 { animation: particle-1 6s ease-in-out infinite; }
      .animate-particle-2 { animation: particle-2 7s ease-in-out infinite; }
      .animate-particle-3 { animation: particle-3 8s ease-in-out infinite; }
    `}</style>
  );
}
