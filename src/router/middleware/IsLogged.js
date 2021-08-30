import cookie from 'js-cookie'
export default (to, from, next) => {
    let token = cookie.get('tokenE-Commerce')
    if(token != undefined && to.fullPath == '/login' || token != undefined && to.fullPath == '/register')
        next({name: 'Home'}) 
}