import { useEffect, useRef } from "react";

export default function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let animationFrameId: number;

    const particles: any[] = [];
    const particleCount = 90;

    // parallax scroll vars
    const parallaxFactor = 0.35; // how strongly particles follow scroll (0 = none, 1 = full)
    let scrollTarget = typeof window !== "undefined" ? window.scrollY : 0;
    let scrollOffset = scrollTarget;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);
    const onScroll = () => {
      scrollTarget = window.scrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 3 + 0.8,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        opacity: Math.random() * 0.9 + 0.15,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // ease scroll offset for smooth movement
      scrollOffset += (scrollTarget - scrollOffset) * 0.08;
      const offset = scrollOffset * parallaxFactor;

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < -canvas.height || p.y > canvas.height * 2) p.vy *= -1;

        // draw with vertical offset so particles appear to follow scroll
        const drawX = p.x;
        const drawY = p.y - offset;

        // don't draw if outside visible canvas
        if (drawY + p.radius < 0 || drawY - p.radius > canvas.height) return;

        ctx.beginPath();
        ctx.arc(drawX, drawY, p.radius, 0, Math.PI * 2);
        const alpha = Math.max(0.06, Math.min(1, p.opacity));
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-10 pointer-events-none"
    />
  );
}
