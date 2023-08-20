 // axios的配置文件, 可以在这里去区分开发环境和生产环境等全局一些配置
 const devBaseUrl = 'http://localhost:3000'
//  const devBaseUrl = 'http://43.143.159.15:5000/'
 const proBaseUrl = ''
 
 // process.env返回的是一个包含用户的环境信息,它可以去区分是开发环境还是生产环境
 export const BASE_URL =  process.env.NODE_ENV === 'development' ? devBaseUrl : proBaseUrl
 
 export const TIMEOUT = 5000