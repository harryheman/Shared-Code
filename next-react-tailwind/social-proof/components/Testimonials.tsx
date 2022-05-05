import { TestimonialCard } from './TestimonialCard'

const TESTIMONIAL_DATA = [
  {
    customerName: 'Colton Smith',
    imageUrl: 'https://i.pravatar.cc/300',
    testimonialText:
      'We needed the same printed design as the one we had ordered a week prior.Not only did they find the original order, but we also received it in time.Excellent!',
  },

  {
    customerName: 'Irene Roberts',
    imageUrl: 'https://i.pravatar.cc/300',
    testimonialText:
      'Customer service is always excellent and very quick turn around. Completely delighted with the simplicity of the purchase and the speed of delivery.',
  },

  {
    customerName: 'Anne Wallace',
    imageUrl: 'https://i.pravatar.cc/300',
    testimonialText:
      'Put an order with this company and can only praise them for the very high standard. Will definitely use them again and recommend them to everyone!',
  },
]

export const Testimonials = () => (
  <div className="flex flex-col items-center justify-center gap-10 md:flex-row">
    {TESTIMONIAL_DATA.map((item, index) => {
      return (
        <TestimonialCard
          key={index}
          customerName={item.customerName}
          imageUrl={item.imageUrl}
          testimonialText={item.testimonialText}
        />
      )
    })}
  </div>
)
