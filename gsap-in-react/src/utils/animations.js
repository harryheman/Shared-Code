import gsap from 'gsap'

export const h1Anim = (target, duration) =>
  gsap.from(target, {
    duration,
    autoAlpha: 0
  })

export const h2Anim = (target, duration) =>
  gsap.fromTo(
    target,
    {
      y: -15,
      autoAlpha: 0
    },
    {
      duration,
      y: 0,
      autoAlpha: 1
    }
  )

export const imgAnim = (target, duration) => {
  const q = gsap.utils.selector(target)
  const overlay = q('.overlay')
  const img = q('.image')
  const timeLine = gsap.timeline()

  timeLine
    .fromTo(
      overlay,
      {
        clipPath: 'polygon (0 0, 0 0, 0 100%, 0% 100%)'
      },
      {
        duration,
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
      }
    )
    .to(overlay, {
      duration,
      left: '100%'
    })
    .fromTo(
      img,
      {
        clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)'
      },
      {
        duration,
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
      },
      duration
    )

  return timeLine
}

export const articlesAnim = (target, duration, stagger) =>
  gsap.fromTo(
    target,
    {
      autoAlpha: 0
    },
    {
      duration,
      autoAlpha: 1,
      stagger
    }
  )
