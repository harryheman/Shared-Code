export const Hero = ({ children, hero = 'defaultHero' }) => (
  <header className={hero}>{children}</header>
)
