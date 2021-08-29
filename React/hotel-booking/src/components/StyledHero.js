import defaultImg from 'images/room-1.jpeg'

export const StyledHero = ({ img }) => {
  const styles = {
    minHeight: '60vh',
    background: `url(${img ? img : defaultImg})`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }

  return <header style={styles}></header>
}
