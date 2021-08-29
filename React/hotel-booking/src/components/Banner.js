export const Banner = ({ children, title, subtitle }) => (
  <div className='banner'>
    <h1>{title}</h1>
    <div></div>
    <p>{subtitle}</p>
    {children}
  </div>
)
