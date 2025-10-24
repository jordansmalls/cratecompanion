import {  TwitterIcon, Github } from 'lucide-react'

const Footer = () => {
  return (
    <footer>
      <div className='mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 max-md:flex-col sm:px-6 sm:py-6 md:gap-6 md:py-8'>
        <a href='#'>
          <div className='flex items-center gap-3'>
            <p className='text-balance'>{`© ${new Date().getFullYear()}`} Crate Companion. All rights reserved.</p>
          </div>
        </a>

        <div className='flex items-center gap-4'>
          <a href='https://github.com/jordansmalls/cratecompanion' target='_blank'>
            <Github className='size-5'  />
          </a>
          <a href='https://www.twitter.com/jsmallsdev' target='_blank'>
            <TwitterIcon className='size-5' />
          </a>

        </div>
      </div>
    </footer>
  )
}

export default Footer
