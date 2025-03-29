"use client"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"
import Autoplay from "embla-carousel-autoplay"

export function Example() {
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
    >
    </Carousel>
  )
}


const testimonials = [
  {
    id: 1,
    name: "Wade Phillips",
    role: "Content Creator",
    avatar: "https://i.pravatar.cc/150?img=1",
    rating: 5,
    quote:
      "BlogMind AI has completely transformed my content creation process. I can now produce high-quality blog posts in half the time it used to take me.",
  },
  {
    id: 2,
    name: "Michael De Santa",
    role: "Marketing Director",
    avatar: "https://i.pravatar.cc/150?img=2",
    rating: 5,
    quote:
      "The SEO optimization feature is a game-changer. Our blog traffic has increased by 78% since we started using BlogMind AI.",
  },
  {
    id: 3,
    name: "Martin Madrazo",
    role: "Freelance Writer",
    avatar: "https://i.pravatar.cc/150?img=3",
    rating: 5,
    quote:
      "As a freelancer, BlogMind AI helps me take on more clients while maintaining quality. It's like having a writing assistant available 24/7.",
  },
  {
    id: 4,
    name: "David Weston",
    role: "Tech Blogger",
    avatar: "https://i.pravatar.cc/150?img=4",
    rating: 4,
    quote:
      "The AI understands technical topics surprisingly well. It helps me explain complex concepts in a way that's accessible to my readers.",
  },
  {
    id: 5,
    name: "Amanda De Santa",
    role: "Small Business Owner",
    avatar: "https://i.pravatar.cc/150?img=5",
    rating: 5,
    quote:
      "BlogMind AI has helped our small team compete with larger companies. We now publish consistent, high-quality content that our customers love.",
  },
]

export function TestimonialsCarousel() {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
      orientation="horizontal"
      className="w-full"
    >
      <CarouselContent className="-ml-4">
        {testimonials.map((testimonial) => (
          <CarouselItem key={testimonial.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card className="bg-white/5 backdrop-blur-sm border-0">
                <CardContent className="flex flex-col p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar>
                      <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                      <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-lg font-medium text-white">{testimonial.name}</h3>
                      <p className="text-sm text-gray-400">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-600"}`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-300 italic">"{testimonial.quote}"</p>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>   
    </Carousel>
  )
}

