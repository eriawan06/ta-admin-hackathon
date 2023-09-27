import React from 'react'
import { Typography, Carousel } from 'antd'
import Image from 'next/image'

export default function ProjectDetails({ project }) {
  const dummyData = [
    {
      url: '',
      alt: 'carousel-image-1'
    },
    {
      url: '',
      alt: 'carousel-image-2'
    },
    {
      url: '',
      alt: 'carousel-image-3'
    }
  ]

  const dummyLink = [
    'http://mysitedemo.com/',
    'http://appstore.google.com/ssk35nkm25acladfp235',
    'http://github.com/ssk35nkm25acladfp235'
  ]

  const setting = {
    customPaging: () => (
      <div
        style={{
          width: '12px',
          height: '12px',
          backgroundColor: 'grey',
          borderRadius: '10px',
          border: '1px solid black',
          cursor: 'pointer',
          marginTop: '22px'
        }}
      />
    )
  }

  return (
    <>
      <div id='project-details'>
        <div className='mb-[30px]'>
          <Typography.Title level={3}>Project Details</Typography.Title>
        </div>
        <div className='mb-10'>
          <Carousel
            autoplay
            {...setting}
          >
            {project.images.map((item) => (
              <div
                key={item.id}
                className='w-full h-[400px] bg-cover bg-url'
                >
                <div 
                style={{backgroundImage: `url(${item.image})` }}
                className='w-full h-full bg-contain bg-center bg-no-repeat '
                ></div>
              </div>
            ))}
          </Carousel>
        </div>
        <div className='bg-white drop-shadow-md p-[30px] mb-[30px]'>
          <div className='flex flex-col gap-2'> 
            <div className='font-bold'>Story Of Project</div>
            <div dangerouslySetInnerHTML={{ __html: project.story }} />
          </div>
        </div>
        <div className='bg-white drop-shadow-md p-[30px]'>
          <div className='grid grid-cols-2'>
            <div className='flex flex-col gap-[26px]'>
              <div className='flex flex-col gap-3'>
                <div className='font-bold'>Tech Stack</div>
                <div>
                  {project.built_with?.map((tech, index) => (
                    <span key={tech.technology_id}>
                      {tech.technology.Name}
                      {project.built_with.length > index + 1 && ', '}
                    </span>
                  ))}
                </div>
              </div>
              <div className='flex flex-col gap-3'>
                <div className='font-bold'>
                  Video Demo
                </div>
                <a
                  href={project.video}
                  className='underline cursor-pointer'
                  target='_blank'
                >
                  Click here to see
                </a>
              </div>
            </div>
            <div className='flex flex-col'>
              <div className='font-bold'>Site Links</div>
              <ol className='list-decimal'>
                {project.site_links?.map((item) => (
                  <li
                    key={item.id}
                    className='marker:font-bold'
                  >
                    <a
                      className='underline'
                      href={item.link}
                      target='_blank'
                    >
                      {item.link}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
