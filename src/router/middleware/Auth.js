import cookie from 'js-cookie'
export default (to, from, next) => {
    let token = cookie.get('tokenE-Commerce')
    if(token == undefined) 
      next({name: 'Home'})   
    next()
}