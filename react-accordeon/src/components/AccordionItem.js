import { useRef } from 'react'

export const AccordionItem = ({ faq, toggle, active }) => {
  const { question, answer } = faq

  const contentEl = useRef()

  return (
    <li className={`accordion_item ${active ? 'active' : ''}`}>
      <button className='button' onClick={toggle}>
        {question}
        <span className='control'>{active ? '-' : '+'}</span>
      </button>
      <div
        className='answer_wrapper'
        ref={contentEl}
        style={{ height: active ? contentEl.current.scrollHeight : 0 }}
      >
        <div className='answer'>{answer}</div>
      </div>
    </li>
  )
}
