import { useState } from 'react'
import { faqs } from '../data'
import { AccordionItem } from './AccordionItem'

export const Accordion = () => {
  const [clicked, setClicked] = useState('0')

  const toggle = (i) => {
    if (clicked === i) {
      return setClicked('0')
    }
    setClicked(i)
  }

  return (
    <ul className='accordion'>
      {faqs.map((f, i) => (
        <AccordionItem
          key={i}
          faq={f}
          toggle={() => toggle(i)}
          active={clicked === i}
        />
      ))}
    </ul>
  )
}
