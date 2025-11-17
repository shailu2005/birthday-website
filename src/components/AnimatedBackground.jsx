import { useEffect } from "react";

export default function AnimatedBackground() {
  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.width = "100vw";
    canvas.style.height = "100vh";
    canvas.style.pointerEvents = "none";
    canvas.style.zIndex = "1";
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    const particles = [];
    const hearts = [];
    const balloons = [];

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.3;
        this.pulse = Math.random() * Math.PI * 2;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.pulse += 0.05;
        this.opacity = 0.3 + Math.sin(this.pulse) * 0.2;

        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
          this.reset();
        }
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = "#ec4899";
        ctx.beginPath();
        for (let i = 0; i < 5; i++) {
          const angle = (Math.PI * 2 * i) / 5 - Math.PI / 2;
          const x = this.x + Math.cos(angle) * this.size;
          const y = this.y + Math.sin(angle) * this.size;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
          
          const innerAngle = angle + Math.PI / 5;
          const innerX = this.x + Math.cos(innerAngle) * (this.size * 0.5);
          const innerY = this.y + Math.sin(innerAngle) * (this.size * 0.5);
          ctx.lineTo(innerX, innerY);
        }
        ctx.closePath();
        ctx.fill();
        ctx.shadowBlur = 10;
        ctx.shadowColor = "#ec4899";
        ctx.fill();
        ctx.restore();
      }
    }

    class Heart {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + 50;
        this.size = Math.random() * 15 + 10;
        this.speed = Math.random() * 0.5 + 0.3;
        this.opacity = Math.random() * 0.4 + 0.2;
        this.pulse = Math.random() * Math.PI * 2;
        this.swayOffset = Math.random() * Math.PI * 2;
      }

      update() {
        this.y -= this.speed;
        this.pulse += 0.08;
        this.swayOffset += 0.02;
        this.x += Math.sin(this.swayOffset) * 0.5;

        if (this.y < -50) {
          this.y = canvas.height + 50;
          this.x = Math.random() * canvas.width;
        }
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        const scale = 1 + Math.sin(this.pulse) * 0.1;
        const size = this.size * scale;
        ctx.translate(this.x, this.y);
        ctx.scale(scale, scale);
        ctx.fillStyle = "#1f2937";
        ctx.beginPath();
        ctx.moveTo(0, size * 0.3);
        ctx.bezierCurveTo(-size * 0.5, -size * 0.3, -size, -size * 0.1, 0, size * 0.5);
        ctx.bezierCurveTo(size, -size * 0.1, size * 0.5, -size * 0.3, 0, size * 0.3);
        ctx.closePath();
        ctx.fill();
        ctx.shadowBlur = 5;
        ctx.shadowColor = "#000000";
        ctx.fill();
        ctx.restore();
      }
    }

    class Balloon {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + 100;
        this.size = Math.random() * 20 + 15;
        this.speed = Math.random() * 0.8 + 0.5;
        this.opacity = Math.random() * 0.3 + 0.3;
        this.swayOffset = Math.random() * Math.PI * 2;
        this.swaySpeed = Math.random() * 0.02 + 0.01;
        this.color = ["#ec4899", "#a855f7", "#f472b6"][Math.floor(Math.random() * 3)];
        this.popped = false;
      }

      update() {
        if (!this.popped) {
          this.y -= this.speed;
          this.swayOffset += this.swaySpeed;
          this.x += Math.sin(this.swayOffset) * 1.5;

          if (this.y < -100) {
            this.y = canvas.height + 100;
            this.x = Math.random() * canvas.width;
          }
        }
      }

      draw() {
        if (this.popped) return;
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.ellipse(this.x, this.y, this.size * 0.6, this.size * 0.8, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
        ctx.beginPath();
        ctx.ellipse(this.x - this.size * 0.2, this.y - this.size * 0.3, this.size * 0.2, this.size * 0.3, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y + this.size * 0.8, this.size * 0.1, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "rgba(100, 100, 100, 0.3)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y + this.size * 0.9);
        for (let i = 0; i < 5; i++) {
          const stringY = this.y + this.size + (i * 10);
          const stringX = this.x + Math.sin(this.swayOffset + i * 0.5) * 5;
          ctx.lineTo(stringX, stringY);
        }
        ctx.stroke();
        ctx.restore();
      }

      pop(mouseX, mouseY) {
        const dist = Math.hypot(this.x - mouseX, this.y - mouseY);
        if (dist < this.size && !this.popped) {
          this.popped = true;
          for (let i = 0; i < 15; i++) {
            const angle = (Math.PI * 2 * i) / 15;
            const particle = {
              x: this.x,
              y: this.y,
              vx: Math.cos(angle) * (Math.random() * 3 + 2),
              vy: Math.sin(angle) * (Math.random() * 3 + 2),
              life: 30,
              size: Math.random() * 3 + 2,
              color: this.color
            };
            popParticles.push(particle);
          }
          return true;
        }
        return false;
      }
    }

    const popParticles = [];

    for (let i = 0; i < 50; i++) {
      particles.push(new Particle());
    }
    for (let i = 0; i < 12; i++) {
      hearts.push(new Heart());
    }
    for (let i = 0; i < 8; i++) {
      balloons.push(new Balloon());
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => { p.update(); p.draw(); });
      hearts.forEach(h => { h.update(); h.draw(); });
      balloons.forEach(b => { b.update(); b.draw(); });

      for (let i = popParticles.length - 1; i >= 0; i--) {
        const p = popParticles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.1;
        p.life--;
        p.vx *= 0.98;
        p.vy *= 0.98;
        ctx.save();
        ctx.globalAlpha = p.life / 30;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        if (p.life <= 0) {
          popParticles.splice(i, 1);
        }
      }
      requestAnimationFrame(animate);
    }
    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.remove();
    };
  }, []);

  return <div className="fixed inset-0 bg-gradient-to-br from-pink-50 via-purple-50 to-slate-50 -z-10" />;
}