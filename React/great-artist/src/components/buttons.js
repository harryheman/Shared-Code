import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import likeImg from 'icons/like.png'
import notLikeImg from 'icons/notlike.png'
import rightArrow from 'icons/right.png'
import menuBtn from 'icons/menu.png'
import { useStyle } from 'hooks/useStyle'
import { useWindowSize } from 'hooks/useWindowSize'

export function TopBtn() {
  function handleClick() {
    window.scrollTo(0, 0)
  }

  return (
    <button className='topbtn' onClick={handleClick} aria-label='To top'>
      <img src={rightArrow} alt='up' />
    </button>
  )
}

export function LikeBtn({ like, onClickLikeBtn }) {
  return (
    <button className='likebtn' onClick={onClickLikeBtn} aria-label='Like'>
      <img src={like ? likeImg : notLikeImg} alt='like' />
    </button>
  )
}

export function BackBtn({ to }) {
  return (
    <Link to={to} className='backbtn'>
      <img src={rightArrow} alt='back' />
    </Link>
  )
}

export function PrevBtn({ onClickPrevBtn }) {
  return (
    <button
      className='prevbtn'
      onClick={onClickPrevBtn}
      aria-label='Previous artist'
    >
      <img src={rightArrow} alt='previous' />
    </button>
  )
}

export function NextBtn({ onClickNextBtn }) {
  return (
    <button
      className='nextbtn'
      onClick={onClickNextBtn}
      aria-label='Next artist'
    >
      <img src={rightArrow} alt='next' />
    </button>
  )
}

export function MenuBtn({ handleClick }) {
  return (
    <button className='menubtn' onClick={handleClick} aria-label='Menu'>
      <img src={menuBtn} alt='menu' />
    </button>
  )
}

export function ToggleBtn() {
  function handleClick() {
    document.body.classList.toggle('dark')
  }

  return (
    <div className='togglebtn_box' onClick={handleClick}>
      <button className='togglebtn' aria-label='Change theme'></button>
    </div>
  )
}

export function FontBtn() {
  const [style, setStyle] = useStyle('font-size')
  const { width } = useWindowSize()

  useEffect(() => {
    if (width < 701 && width > 500) {
      setStyle('12px')
    } else if (width < 501) {
      setStyle('11px')
    } else {
      setStyle('14px')
    }
  }, [width])

  function handleClick({ target: { className } }) {
    let fontSize = parseInt(style)
    className.includes('plus') ? (fontSize += 1) : (fontSize -= 1)
    setStyle(fontSize + 'px')
  }

  return (
    <div className='fontbtn_box'>
      <button
        className='fontbtn plus'
        onClick={handleClick}
        aria-label='Increase font size'
      >
        +
      </button>
      <button
        className='fontbtn minus'
        onClick={handleClick}
        aria-label='Reduce font size'
      >
        -
      </button>
    </div>
  )
}
