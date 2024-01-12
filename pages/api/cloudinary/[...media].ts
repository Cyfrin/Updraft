import {
    mediaHandlerConfig,
    createMediaHandler,
  } from 'next-tinacms-cloudinary/dist/handlers'
  
  import { isAuthorized } from '@tinacms/auth'
  
  export const config = mediaHandlerConfig
  
  if(!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) throw new Error('Missing Cloudinary env variables')

  export default createMediaHandler({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    authorized: async (req, _res) => {
      try {
        /* if (process.env.NODE_ENV == 'development') {
          return true
        } */
    
        const user = await isAuthorized(req)
    
        return !!user && user.verified
      } catch (e) {
        console.error(e)
        return false 
      }
    },
  })