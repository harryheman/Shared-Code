import { useState, useEffect, useContext } from 'react'
import { Redirect, useParams } from 'react-router-dom'

import { UrlContext, ArtistsContext } from 'context'

import { TopBtn, LikeBtn, BackBtn, PrevBtn, NextBtn } from 'components'

import artImg from 'icons/art.png'

export function GalleryProfile() {
  const { imgUrl, audioUrl } = useContext(UrlContext)

  const [artists, setArtists] = useContext(ArtistsContext)

  const { id } = useParams()

  const [nextId, setNextId] = useState(id)

  const ids = artists.map((a) => +a.id)

  const minId = Math.min(...ids)
  const maxId = Math.max(...ids)

  function onClickLikeBtn() {
    const newArtists = artists.map((a) => {
      if (a.id === id) {
        a.like = !a.like
      }
      return a
    })
    setArtists(newArtists)
  }

  function onClickPrevBtn() {
    setNextId(+nextId > minId ? +nextId - 1 : maxId)
  }

  function onClickNextBtn() {
    setNextId(+nextId < maxId ? +nextId + 1 : minId)
  }

  function onKeydown({ key }) {
    if (key !== 'ArrowLeft' && key !== 'ArrowRight') return
    if (key === 'ArrowLeft') onClickPrevBtn()
    else onClickNextBtn()
  }

  useEffect(() => {
    window.addEventListener('keydown', onKeydown)
    return () => {
      window.removeEventListener('keydown', onKeydown)
    }
  }, [nextId])

  const artist = artists.find((a) => a.id === id)
  if (!artist) return null
  const { img, name, date, audio, wiki, info, like } = artist

  return (
    <div className='profile'>
      <Redirect to={nextId.toString()} />
      <BackBtn to='/gallery' />
      <div className='profile_imgbox'>
        <img src={`${imgUrl}/${img}`} alt={name} className='img' />
      </div>
      <p className='name'>{name}</p>
      <p className='date'>({date})</p>
      <audio src={`${audioUrl}/${audio}`} controls className='audio'></audio>
      <a
        href={wiki}
        target='_blank'
        rel='noopener noreferrer'
        className='wiki_link'
      >
        <img src={artImg} alt='art' className='wiki_img' />
        <span>Картины</span>
      </a>
      <div className='profile_buttons'>
        <PrevBtn onClickPrevBtn={onClickPrevBtn} />
        <NextBtn onClickNextBtn={onClickNextBtn} />
      </div>
      <p className='info'>{info}</p>
      <div className='profile_buttons'>
        <PrevBtn onClickPrevBtn={onClickPrevBtn} />
        <NextBtn onClickNextBtn={onClickNextBtn} />
      </div>
      <TopBtn />
      <LikeBtn like={like} onClickLikeBtn={onClickLikeBtn} />
    </div>
  )
}
