import { useEffect, useRef } from 'react';

interface StarfieldCanvasProps {
  shootingStarTrigger?: number;
}

interface Star {
  x: number;
  y: number;
  radius: number;
  baseAlpha: number;
  alpha: number;
  twinkleSpeed: number;
  color: string;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  alpha: number;
  type: 'petal' | 'heart' | 'glow';
  rotation: number;
  rotationSpeed: number;
  color: string;
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  alpha: number;
}

export default function StarfieldCanvas({ shootingStarTrigger }: StarfieldCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const shootingStarsRef = useRef<ShootingStar[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initStars();
    };

    window.addEventListener('resize', handleResize);

    // Stars
    let stars: Star[] = [];
    const colors = ['#ffffff', '#fef08a', '#fbcfe8', '#ddd6fe', '#e0e7ff'];

    const initStars = () => {
      stars = [];
      const count = Math.min(Math.floor((width * height) / 4500), 220);
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 1.6 + 0.5,
          baseAlpha: Math.random() * 0.7 + 0.2,
          alpha: Math.random() * 0.7 + 0.2,
          twinkleSpeed: Math.random() * 0.02 + 0.005,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    initStars();

    // Floating Petals & Hearts
    const particles: Particle[] = [];
    const particleCount = 32;
    const petalColors = ['#f472b6', '#fb7185', '#ec4899', '#fbcfe8', '#fbbf24'];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 5 + 3,
        speedY: -(Math.random() * 0.45 + 0.2), // slow upward float
        speedX: (Math.random() - 0.5) * 0.35,
        alpha: Math.random() * 0.55 + 0.2,
        type: i % 4 === 0 ? 'heart' : i % 3 === 0 ? 'petal' : 'glow',
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        color: petalColors[Math.floor(Math.random() * petalColors.length)],
      });
    }

    const drawHeart = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
      ctx.beginPath();
      const topCurveHeight = size * 0.3;
      ctx.moveTo(x, y + topCurveHeight);
      ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + topCurveHeight);
      ctx.bezierCurveTo(x - size / 2, y + (size + topCurveHeight) / 2, x, y + (size + topCurveHeight) / 1.5, x, y + size);
      ctx.bezierCurveTo(x, y + (size + topCurveHeight) / 1.5, x + size / 2, y + (size + topCurveHeight) / 2, x + size / 2, y + topCurveHeight);
      ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + topCurveHeight);
      ctx.closePath();
      ctx.fill();
    };

    const drawPetal = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
      ctx.beginPath();
      ctx.ellipse(x, y, size * 0.6, size * 1.3, 0, 0, Math.PI * 2);
      ctx.fill();
    };

    let time = 0;

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      // Draw starry ambient night gradient
      const bgGrad = ctx.createRadialGradient(width * 0.5, height * 0.3, 50, width * 0.5, height * 0.5, width * 0.8);
      bgGrad.addColorStop(0, 'rgba(40, 24, 75, 0.45)');
      bgGrad.addColorStop(0.5, 'rgba(15, 18, 48, 0.65)');
      bgGrad.addColorStop(1, 'rgba(6, 8, 20, 0.95)');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Render stars
      for (const s of stars) {
        s.alpha = s.baseAlpha + Math.sin(time * 2 + s.x) * 0.25;
        if (s.alpha < 0.1) s.alpha = 0.1;
        if (s.alpha > 1) s.alpha = 1;

        ctx.save();
        ctx.fillStyle = s.color;
        ctx.globalAlpha = s.alpha;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fill();

        // Extra twinkle aura for larger stars
        if (s.radius > 1.4) {
          ctx.globalAlpha = s.alpha * 0.25;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.radius * 2.8, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      // Render shooting stars
      for (let i = shootingStarsRef.current.length - 1; i >= 0; i--) {
        const ss = shootingStarsRef.current[i];
        ss.x += Math.cos(ss.angle) * ss.speed;
        ss.y += Math.sin(ss.angle) * ss.speed;
        ss.alpha -= 0.012;

        if (ss.alpha <= 0 || ss.x > width + 200 || ss.y > height + 200) {
          shootingStarsRef.current.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = ss.alpha;
        const tailX = ss.x - Math.cos(ss.angle) * ss.length;
        const tailY = ss.y - Math.sin(ss.angle) * ss.length;

        const grad = ctx.createLinearGradient(tailX, tailY, ss.x, ss.y);
        grad.addColorStop(0, 'rgba(251, 191, 36, 0)');
        grad.addColorStop(0.7, 'rgba(251, 207, 232, 0.8)');
        grad.addColorStop(1, 'rgba(255, 255, 255, 1)');

        ctx.strokeStyle = grad;
        ctx.lineWidth = 2.5;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(ss.x, ss.y);
        ctx.stroke();

        // Glow head
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#fbbf24';
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(ss.x, ss.y, 2.8, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Render floating particles (hearts, petals, glowing orbs)
      for (const p of particles) {
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(time + p.y * 0.01) * 0.3;
        p.rotation += p.rotationSpeed;

        if (p.y < -20) {
          p.y = height + 20;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.alpha * (0.6 + 0.4 * Math.sin(time + p.x * 0.05));
        ctx.fillStyle = p.color;

        if (p.type === 'heart') {
          drawHeart(ctx, 0, 0, p.size * 1.5);
        } else if (p.type === 'petal') {
          drawPetal(ctx, 0, 0, p.size * 1.2);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.6, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Trigger shooting stars when shootingStarTrigger updates
  useEffect(() => {
    if (!shootingStarTrigger) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Create 3 dazzling shooting stars in rapid succession
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        shootingStarsRef.current.push({
          x: Math.random() * (window.innerWidth * 0.6),
          y: Math.random() * (window.innerHeight * 0.3),
          length: 160 + Math.random() * 90,
          speed: 18 + Math.random() * 8,
          angle: Math.PI / 4 + (Math.random() - 0.5) * 0.2, // ~45 degrees downward
          alpha: 1.0,
        });
      }, i * 280);
    }
  }, [shootingStarTrigger]);

  return (
    <canvas
      id="starfield-canvas"
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.92 }}
    />
  );
}
