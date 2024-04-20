import React from 'react';
import ProfilePic from '../../assets/images/ProfilePic.png';
import Headings from '../Heading';

function Testimonials() {
  const testimonials = [
    {
      review:
        "With Capsule, we're able to tell stories with video at scale for",
      profilePicture: ProfilePic,
      name: 'Kate Bedingfield',
      designation: 'CMO at HubSpot',
    },
    {
      review:
        'Love how you can take raw footage and turn it into a professional video with AI.',
      profilePicture: ProfilePic,
      name: 'Kipp Bodnar',
      designation: 'CMO at HubSpot',
    },
    {
      review: 'It makes video editing much, much easier.',
      profilePicture: ProfilePic,
      name: 'Kieran Flanagan',
      designation: 'CMO at Zapier',
    },
    {
      review:
        'Having spent years editing video, Capsule is absolutely mindblowing. 🤯',
      profilePicture: ProfilePic,
      name: 'Cameron Baughn',
      designation: 'Founder at DesignFriend',
    },
    {
      review:
        "Capsule's AI-powered editing tools have revolutionized the way we create video content.",
      profilePicture: ProfilePic,
      name: 'Sarah Johnson',
      designation: 'Creative Director at XYZ Studios',
    },
    {
      review:
        'I never thought video editing could be this easy. Capsule is a game-changer!',
      profilePicture: ProfilePic,
      name: 'John Smith',
      designation: 'Marketing Manager at ABC Corp',
    },
    {
      review:
        "Capsule has saved us countless hours of editing time. It's incredibly efficient!",
      profilePicture: ProfilePic,
      name: 'Emily Davis',
      designation: 'Content Creator at XYZ Company',
    },
    {
      review:
        'As a freelance videographer, Capsule has become my go-to tool for quick and professional edits.',
      profilePicture: ProfilePic,
      name: 'Michael Chen',
      designation: 'Freelance Videographer',
    },

    // Add more testimonials as needed
  ];

  const maxColumns = 4; // Maximum number of columns

  return (
    <div className=' flex justify-center items-center flex-col mt-4'>
      <Headings content={'TESTIMONIALS'} />
      <div className='flex w-full p-4 mb-4  bg-blue-50 justify-center items-center flex-col mt-10'>
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${maxColumns} gap-4`}
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`bg-white gap-5 rounded-xl p-4 flex flex-col justify-between ${
                index % 2 === 0 ? 'right-to-left' : 'left-to-right'
              }`}
            >
              <div className='review text-xs leading-8'>{testimonial.review}</div>
              <div className='flex items-center mt-4'>
                <img
                  loading='lazy'
                  src={testimonial.profilePicture}
                  alt={testimonial.name}
                  className='profile-picture mr-3'
                />
                <div>
                  <div className='name'>{testimonial.name}</div>
                  <div className='designation'>{testimonial.designation}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Testimonials;
