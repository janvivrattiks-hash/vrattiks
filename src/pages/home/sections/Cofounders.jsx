import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import arpitpatel from '../../../assests/img/feature/arpit-patel.webp'
import hiteshdave from '../../../assests/img/feature/hitesh-dave.webp'
import './Cofounders.css'

gsap.registerPlugin(ScrollTrigger)

const FOUNDERS = [
  {
    img: arpitpatel,
    first: 'Arpit',
    last: 'Patel',
    role: 'Co-Founder',
    lines: [
      'Intelligence is the true center of the universe — and when it meets clarity, action and flow, business becomes unstoppable.',
      'We draw that depth from the timeless systems of Ancient India and translate it into living, adaptive technology.',
    ],
  },
  {
    img: hiteshdave,
    first: 'Hitesh',
    last: 'Dave',
    role: 'Co-Founder',
    lines: [
      'Vrattiks is not another tech company — it is a growth engine for businesses ready to simplify, scale and evolve without chaos.',
      'Where others get stuck in repetitive tasks, we build systems that think, connect and act. That is the Vrattiks way.',
    ],
  },
]

/* ── canvas intelligence-particles (sparse, dissolve into the portrait) ── */
function useParticlePortrait(canvasRef, imgSrc, progressRef, activeRef) {
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf = 0
    let particles = []
    let pairs = []
    let W = 0, H = 0, dpr = 1
    let disposed = false

    const img = new Image()
    img.src = imgSrc

    const buildParticles = () => {
      const rect = canvas.getBoundingClientRect()
      W = rect.width; H = rect.height
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = W * dpr
      canvas.height = H * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const rw = Math.min(W * 0.74, 430)
      const rh = rw * 4 / 3
      const rx = (W - rw) / 2
      const ry = (H - rh) / 2

      const SW = 120, SH = 160
      const buf = document.createElement('canvas')
      buf.width = SW; buf.height = SH
      const bctx = buf.getContext('2d')
      bctx.drawImage(img, 0, 0, SW, SH)
      let data
      try { data = bctx.getImageData(0, 0, SW, SH).data } catch { return }

      particles = []
      const step = 3                              // sparser sampling
      for (let y = 0; y < SH; y += step) {
        for (let x = 0; x < SW; x += step) {
          const i = (y * SW + x) * 4
          const lum = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]
          if (lum < 26) continue
          if (Math.random() > 0.18 + lum / 650) continue   // ~60% fewer particles
          const hx = rx + (x / SW) * rw
          const hy = ry + (y / SH) * rh
          const ang = Math.random() * Math.PI * 2
          const rad = 60 + Math.random() * Math.max(W, H)
          particles.push({
            hx, hy,
            sx: W / 2 + Math.cos(ang) * rad,
            sy: H / 2 + Math.sin(ang) * rad,
            x: 0, y: 0,
            a: 0.3 + lum / 500,
            r: lum > 150 ? 1.0 : 0.75,
            ph: Math.random() * Math.PI * 2,
            drift: 0.4 + Math.random() * 0.8,
          })
          if (particles.length > 1000) break
        }
      }

      // neural pairs via coarse grid (capped, sparse)
      pairs = []
      const cell = rw / 20
      const grid = new Map()
      const key = (gx, gy) => gx + ',' + gy
      particles.forEach((p, idx) => {
        const gx = Math.floor(p.hx / cell), gy = Math.floor(p.hy / cell)
        const k = key(gx, gy)
        if (!grid.has(k)) grid.set(k, [])
        grid.get(k).push(idx)
      })
      const deg = new Int8Array(particles.length)
      const maxD = cell * 1.4
      outer:
      for (let idx = 0; idx < particles.length; idx += 4) {
        if (deg[idx] >= 1) continue
        const p = particles[idx]
        const gx = Math.floor(p.hx / cell), gy = Math.floor(p.hy / cell)
        for (let ox = -1; ox <= 1; ox++) for (let oy = -1; oy <= 1; oy++) {
          const nb = grid.get(key(gx + ox, gy + oy))
          if (!nb) continue
          for (const j of nb) {
            if (j <= idx || deg[j] >= 1) continue
            const q = particles[j]
            const d = Math.hypot(p.hx - q.hx, p.hy - q.hy)
            if (d > 6 && d < maxD) {
              pairs.push([idx, j]); deg[idx]++; deg[j]++
              if (pairs.length > 260) break outer
              break
            }
          }
        }
      }
    }

    const ease = t => t * t * (3 - 2 * t)
    const clamp01 = v => (v < 0 ? 0 : v > 1 ? 1 : v)

    const frame = () => {
      if (disposed) return
      raf = requestAnimationFrame(frame)
      if (!activeRef.current || !particles.length) return

      const p = progressRef.current
      const time = performance.now() / 1000

      const form = ease(clamp01((p - 0.02) / 0.33))        // scatter → energy cloud → face
      const fade = 1 - clamp01((p - 0.42) / 0.3)           // dissolve into portrait by ~72%
      const exit = ease(clamp01((p - 0.85) / 0.15))        // peel away, flow to next section
      const lineFade = form * (1 - clamp01((p - 0.34) / 0.12)) * fade

      ctx.clearRect(0, 0, W, H)
      if (fade <= 0.01 && exit <= 0.01) return

      // neural connections while the cloud organizes
      if (lineFade > 0.02) {
        ctx.lineWidth = 0.5
        ctx.strokeStyle = `rgba(150,120,255,${0.22 * lineFade})`
        ctx.beginPath()
        for (const [a, b] of pairs) {
          const pa = particles[a], pb = particles[b]
          ctx.moveTo(pa.x, pa.y); ctx.lineTo(pb.x, pb.y)
        }
        ctx.stroke()
      }

      for (const pt of particles) {
        const amp = 8 * (1 - form) + 2 * form * fade       // residual "breathing" once formed
        const fx = Math.cos(time * pt.drift + pt.ph) * amp
        const fy = Math.sin(time * pt.drift + pt.ph) * amp
        let x = (pt.sx + fx) * (1 - form) + pt.hx * form
        let y = (pt.sy + fy) * (1 - form) + pt.hy * form
        if (exit > 0) {                                     // stream downward into next section
          x += Math.cos(pt.ph) * exit * 46
          y += exit * H * 0.7
        }
        pt.x = x; pt.y = y
        const alpha = pt.a * Math.max(fade, exit * 0.55)
        if (alpha <= 0.01) continue
        ctx.beginPath()
        ctx.fillStyle = `rgba(210,200,255,${alpha})`
        ctx.arc(x, y, pt.r, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const onResize = () => { if (img.complete && img.naturalWidth) buildParticles() }
    img.onload = () => buildParticles()
    if (img.complete && img.naturalWidth) buildParticles()
    raf = requestAnimationFrame(frame)
    window.addEventListener('resize', onResize)

    return () => {
      disposed = true
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imgSrc])
}

/* ── one pinned founder panel ─────────────────────────────────────── */
function FounderPanel({ data, index }) {
  const panelRef = useRef(null)
  const canvasRef = useRef(null)
  const progressRef = useRef(0)
  const activeRef = useRef(false)
  const reverse = index % 2 === 1

  useParticlePortrait(canvasRef, data.img, progressRef, activeRef)

  useEffect(() => {
    const el = panelRef.current
    const isMobile = window.matchMedia('(max-width: 900px)').matches

    const ctx = gsap.context(() => {
      gsap.set('.cf-name .word', { y: 44, opacity: 0, filter: 'blur(12px)' })
      gsap.set('.cf-name', { letterSpacing: '0.14em' })
      gsap.set(['.cf-kicker', '.cf-role', '.cf-body p'], { opacity: 0, y: 16 })
      gsap.set('.cf-line', { width: 0 })
      gsap.set('.cf-portrait', { '--op': 0, '--blur': 8, '--reveal': 0, '--con': 1.05, '--bri': 0.5 })

      if (isMobile) {
        activeRef.current = true
        progressRef.current = 0.75
        gsap.set('.cf-portrait', { '--op': 1, '--blur': 1, '--reveal': 1, '--con': 1.18, '--bri': 0.95 })
        gsap.set(['.cf-name .word', '.cf-kicker', '.cf-role', '.cf-body p'],
          { opacity: 1, y: 0, filter: 'blur(0px)' })
        gsap.set('.cf-name', { letterSpacing: '-0.02em' })
        gsap.set('.cf-line', { width: 120 })
        return
      }

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: '+=2600',
          pin: true,
          scrub: true,
          onToggle: self => { activeRef.current = self.isActive },
          onUpdate: self => { progressRef.current = self.progress },
        },
      })

      // subtle portrait parallax (15px) across the whole pin
      tl.fromTo('.cf-portrait-wrap', { y: 10 }, { y: -15, duration: 1 }, 0)

      /* ── clarity curve : the face gets progressively clearer ──
         30% op .15 · 60% op .5 · 80% op .7 · 90% op .9 · 100% op 1  */
      tl.to('.cf-portrait', { '--op': 0.15, duration: 0.3 }, 0)     // → 30%
        .to('.cf-portrait', { '--op': 0.5, duration: 0.3 }, 0.3)    // → 60%
        .to('.cf-portrait', { '--op': 0.7, duration: 0.2 }, 0.6)    // → 80%
        .to('.cf-portrait', { '--op': 0.9, duration: 0.1 }, 0.8)    // → 90%
        .to('.cf-portrait', { '--op': 1, duration: 0.1 }, 0.9)      // → 100%

      // base blur clears, local contrast + brightness rise (cinematic detail)
      tl.to('.cf-portrait', { '--blur': 1.5, duration: 0.9 }, 0.1)
        .to('.cf-portrait', { '--con': 1.18, duration: 0.9 }, 0.1)
        .to('.cf-portrait', { '--bri': 0.95, duration: 0.9 }, 0.1)

      // procedural materialization : feature clusters fill in (eyes→cheeks→
      // hair→beard→jaw→neck), driven by --reveal growing the mask blobs
      tl.to('.cf-portrait', { '--reveal': 0.15, duration: 0.15 }, 0.15) // first clusters
        .to('.cf-portrait', { '--reveal': 0.45, duration: 0.3 }, 0.3)   // features
        .to('.cf-portrait', { '--reveal': 0.75, duration: 0.2 }, 0.6)   // fill
        .to('.cf-portrait', { '--reveal': 1, duration: 0.2 }, 0.8)      // full

      // cursor light appears once the face is readable
      tl.to('.cf-glow', { opacity: 1, duration: 0.15 }, 0.6)

      // ── text : only after portrait ≥ 70% clarity ──
      tl.to('.cf-kicker', { opacity: 1, y: 0, duration: 0.05 }, 0.7)
      tl.to('.cf-name .word',
        { y: 0, opacity: 1, filter: 'blur(0px)', stagger: 0.03, duration: 0.12 }, 0.72)
      tl.to('.cf-name', { letterSpacing: '-0.02em', duration: 0.18 }, 0.72)
      tl.to('.cf-role', { opacity: 1, y: 0, duration: 0.05 }, 0.8)
      tl.to('.cf-line', { width: 120, duration: 0.07 }, 0.84)
      tl.to('.cf-body p', { opacity: 1, y: 0, stagger: 0.06, duration: 0.1 }, 0.86)
    }, panelRef)

    // micro-interaction: cursor light + 2° portrait tilt
    const portrait = el.querySelector('.cf-portrait')
    const glow = el.querySelector('.cf-glow')
    const setRX = gsap.quickTo(portrait, 'rotationY', { duration: 0.6, ease: 'power2' })
    const setRY = gsap.quickTo(portrait, 'rotationX', { duration: 0.6, ease: 'power2' })
    const onMove = e => {
      const r = el.getBoundingClientRect()
      const nx = (e.clientX - r.left) / r.width
      const ny = (e.clientY - r.top) / r.height
      setRX((nx - 0.5) * 4)
      setRY(-(ny - 0.5) * 4)
      if (glow) { glow.style.setProperty('--mx', nx * 100 + '%'); glow.style.setProperty('--my', ny * 100 + '%') }
    }
    el.addEventListener('mousemove', onMove)

    return () => { ctx.revert(); el.removeEventListener('mousemove', onMove) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={`cf-panel${reverse ? ' reverse' : ''}`} ref={panelRef}>
      <div className="cf-visual">
        <SacredGeometry />
        <div className="cf-portrait-wrap">
          <div className="cf-portrait">
            <div className="cf-aura" />
            <img className="cf-img base" src={data.img} alt="" aria-hidden />
            <img className="cf-img sharp" src={data.img} alt={`${data.first} ${data.last}`} />
            <div className="cf-light" />
            <div className="cf-glow" />
            <canvas ref={canvasRef} className="cf-canvas" />
            <div className="cf-grain" />
          </div>
        </div>
      </div>

      <div className="cf-content">
        <div className="cf-kicker">Co-Founders' Note</div>
        <h2 className="cf-name">
          <span className="word">{data.first}</span>{' '}
          <span className="word grad">{data.last}</span>
        </h2>
        <div className="cf-role">{data.role}</div>
        <div className="cf-line" />
        <div className="cf-body">
          {data.lines.map((t, i) => <p key={i}>{t}</p>)}
        </div>
      </div>
    </div>
  )
}

function SacredGeometry() {
  return (
    <>
      <svg className="cf-yantra" viewBox="0 0 200 200" fill="none"
        stroke="currentColor" strokeWidth="0.5">
        {[92, 74, 56, 38].map(r => <circle key={r} cx="100" cy="100" r={r} />)}
        {[0, 60, 120].map(a => (
          <polygon key={a} points="100,20 170,140 30,140" transform={`rotate(${a} 100 100)`} />
        ))}
        {[0, 60, 120].map(a => (
          <polygon key={'d' + a} points="100,180 30,60 170,60" transform={`rotate(${a} 100 100)`} />
        ))}
        {Array.from({ length: 12 }).map((_, i) => (
          <line key={i} x1="100" y1="100"
            x2={100 + 92 * Math.cos(i * Math.PI / 6)}
            y2={100 + 92 * Math.sin(i * Math.PI / 6)} />
        ))}
      </svg>
      <svg className="cf-yantra slow" viewBox="0 0 200 200" fill="none"
        stroke="currentColor" strokeWidth="0.4">
        <polygon points="100,10 128,72 190,72 140,112 158,174 100,136 42,174 60,112 10,72 72,72" />
        <circle cx="100" cy="100" r="60" />
      </svg>
    </>
  )
}

export default function Co_founders() {
  return (
    <section className="cf-root">
      {FOUNDERS.map((f, i) => <FounderPanel key={i} data={f} index={i} />)}
    </section>
  )
}
