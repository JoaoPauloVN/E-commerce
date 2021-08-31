<template>
    <div class="header" @click="closeSearch" @mouseleave="closeSearch">
        <div class="menu">
            <div class="center">
                <div class="menu_mobile">
                    <i class="fas fa-bars" @click.stop.prevent="menuExpand"></i>
                    <div class="menu_blur" @click.stop.prevent="menuExpand">
                        <div class="menu_expansive" @click.stop.prevent>
                            <div class="close">
                                <i class="fas fa-times" @click.stop.prevent="menuExpand"></i>
                            </div>
                            <div class="logo">
                                <router-link to="/" @click="menuExpand">E-Commerce</router-link>
                            </div>
                            <div class="menu_wrapper" v-if="!loading">
                                <h3>Categorias</h3>
                                <div class="menu-wrapper" v-for="category in categories" :key="category.id">
                                    <router-link :to="'/categoria/'+category.slug" @click="menuExpand">{{ category.name }}</router-link>
                                </div>
                            </div>
                            <div class="menu_wrapper">
                                <p v-if="!$store.state.isLoggedIn"><router-link to="/login" @click="menuExpand">Faça login</router-link> ou <br/> <router-link to="/register" @click="menuExpand">Crie sua conta </router-link></p>
                            <span v-else><router-link to="/user" @click="menuExpand">bem vindo<p>{{ $store.state.user.name.slice(0, 15) }}</p></router-link></span>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div class="logo">
                    <router-link to="/">E-Commerce</router-link>
                </div>
                <div class="search_box">
                    <input type="text" v-model="search" @keyup.enter="sendSearch" @click.stop.prevent="openSearch">
                    <button @click.stop.prevent="clearSearch"><i class="fas fa-times"></i></button>
                    <div class="box_results" v-show="searchOpen">
                        <ul v-for="search in searchResult" :key="search.id">
                            <li @click.stop.prevent="ClickProduct(search.id)">
                                <img :src="'/assets/products/'+search.image[0]" :alt="search.name">
                                {{search.name}}
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="user" @mouseleave.stop.prevent="closeModalLogin">
                    <div class="user_settings">
                        <div class="icon">
                            <i class="fas fa-user"></i>
                        </div>
                        <p v-if="!$store.state.isLoggedIn"><router-link to="/login">Faça login</router-link> ou <br/> <router-link to="/register">crie sua conta </router-link></p>
                        <span v-else><router-link to="/user">bem vindo<p>{{ $store.state.user.name.slice(0, 15) }}</p></router-link></span>
                        <span v-if="$store.state.isLoggedIn" @click="logout" class="logout">logout</span>
                    </div>
                   
                    <div class="cart" @click.stop.prevent="cart">
                        <i class="fas fa-shopping-cart"></i>
                        <span>{{$store.state.cartQnt}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="dropdown_menu">
            <div class="center" v-if="!loading">
                <div class="menu-wrapper" v-for="category in categories" :key="category.id">
                    <router-link :to="'/categoria/'+category.slug">{{ category.name }}</router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from "axios"
import cookie from 'js-cookie'
export default {
    name : "Header",
    data(){
        return {
            categories: [], 
            search: '',
            searchResult: [],
            searchOpen: false,
            modalLogin: false,
            loading: true
        }
    },
    mounted() {
        this.getCategories()
        this.getCartList()
    },
    watch: {
        search() {
            this.sendSearch(this.search)
        },
        cartQnt() {
            this.$store.state.cartQnt
        }
    },
    methods: {
        getCategories() {
            axios.get("categories").then(res=> {
                this.categories = res.data
                this.loading = false
                })
        },
        sendSearch(search){
            if(search.length >= 3) {
                this.searchOpen = true
                axios.get(`products?name_like=${this.search}`).then(res=> this.searchResult = res.data)
            } else {
                this.searchOpen = false
            }
        },
        ClickProduct(id) {
            this.$router.push(`/produto/${id}`)
        },
        closeSearch() {
            this.searchOpen = false
        },
        openSearch() {
            this.searchOpen = true
        },
        clearSearch() {
            this.search = ''
            this.searchResult = []
        },
        logout() {
            cookie.remove('idE-Commerce')
            cookie.remove('tokenE-Commerce')
            this.$store.commit('USER_LOGOUT')
            this.$router.push('/')
        },
        cart() {
            this.$router.push(`/cart`)
        },
        getCartList() {
            this.$store.dispatch('upgradeCartQnt')
        },
        disableScroll() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop
            const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft
    
            window.onscroll = function() {
                window.scrollTo(scrollLeft, scrollTop)
            }
        },
        enableScroll() {
            window.onscroll = function() {};
        },
        menuExpand() {
            const app = this
            const el = $('.menu_blur')
            if(el.hasClass('active')) {
                el.find('.menu_expansive').animate({
                    left: '-400px'
                }, 600, function() {
                    el.removeClass('active')
                    app.enableScroll()
                })
            } else {
                el.addClass('active')
                app.disableScroll()
                el.find('.menu_expansive').animate({
                    left: '0'
                }, 600)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .header {
        background: rgb(240, 240, 240);
        width: 100%;
        .center {
            height: 100%;
        }
        .menu { 
            .center {
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 100%;
                padding: 25px 2%;
            }
            .menu_mobile {
                display: none;
                .menu_blur {
                    display: none;
                }
            }
            .logo {
                font-size: 22px;
                a {
                    color: rgb(57, 57, 57);
                    text-decoration: none;
                    cursor: pointer;
                }
            }
            .search_box {
                display: flex;
                position: relative;
                input {
                    width: 550px;
                    padding: 10px 12px;
                    outline: none;
                    border-radius: 20px 0 0 20px;
                    border: none;
                    color: rgb(57,57,57);
                }
                button {
                    border-radius: 0 20px 20px 0;
                    border: none;
                    background: white;
                    padding: 10px 12px;
                    cursor: pointer; 
                    outline: none;
                    i {
                        font-size: 17px;
                         outline: none;
                        color: rgb(57,57,57);
                    }
                }
                .box_results {
                    position: absolute;
                    top: 30px;
                    width: 100%;
                    margin-top: 10px;
                    border-radius: 10px;
                    z-index: 3;
                    max-height: 300px;
                    overflow: auto;
                    &::-webkit-scrollbar {
                        width: 5px;
                    }
                    &::-webkit-scrollbar-thumb {
                        background: rgba(57, 57, 57, 0.347);
                        border-radius: 10px;
                    }
                    ul {
                        
                        background: white;
                        padding: 10px;
                        li {
                            list-style: none;
                            display: flex;
                            align-items: center;
                            cursor: pointer;
                            img {
                                width: 40px;
                                height: 40px;
                            }
                        }
                    }
                }
            }
            .user {
                display: flex;
                align-items: center;
                position: relative;
                .user_settings {
                    display: flex;
                }
                .icon {
                    width: 35px;
                    height: 35px;
                    border-radius: 50%;
                    border: 2px solid rgb(57, 57, 57);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-right: 5px;
                    i {
                        font-size: 20px;
                        color: rgb(57, 57, 57);
                    }
                }
                p {
                    margin-right: 10px;
                }
                a {
                    font-size: 14px;
                    color: rgb(57, 57, 57);
                    text-decoration: none;
                    &:hover {
                        text-decoration: underline;
                    }
                }
                .cart {
                    position: relative;
                    i {
                        font-size: 21px;
                        color: rgb(57, 57, 57);
                    }
                    span {
                        position: absolute;
                        top: -10px;
                        right: -8px;
                        margin: 0;
                        background: rgb(255, 115, 0);
                        color: white;
                        padding: 3px 4px;
                        border-radius: 50%;
                        font-size: 10px;
                        text-align: center;
                    }

                }
                .modalLogin {
                    position: absolute;
                    top: 45px;
                    left: 20px;
                    background: white;
                    border-radius: 10px;
                    padding: 20px;
                    box-shadow: 0 5px 18px 0 rgba(0,0,0,0.5);
                    a {
                        color: rgb(255, 115, 0);
                        text-decoration: none;
                        font-size: 15px;
                        &:hover {
                            text-decoration: underline;
                        }
                    }
                    p {
                        font-size: 14px;
                        margin: 5px 0;
                        color: rgb(169, 169, 169);
                    }
                }
                span {
                    font-size: 14px;
                    color: rgb(99, 99, 99);
                    margin: 0 5px 0 0;
                    p {
                        font-size: 16px;
                    }
                }
                .logout {
                    margin: 0 10px;
                    display: block;
                    cursor: pointer;
                    &:hover {
                        text-decoration: none;
                    }
                }
            }
        } 
        .dropdown_menu {
            width: 100%;
            padding: 8px 0;
            background: rgb(230, 218, 218);
            
            .center {
                justify-content: space-between;
                display: flex;
                align-items: center;
            }

            a {
                text-decoration: none;
                color: rgb(57,57,57);
                &:hover {
                    text-decoration: underline;
                }
            }
        }
    }
       @media screen and (max-width: 960px) {
        .header {
            .menu {
                .center {
                    flex-wrap: wrap;
                    padding: 25px 3%;
                    .menu_mobile {
                        display: block;
                        i {
                            font-size: 23px;
                            color: #393939;
                        }
                        .menu_blur {
                            background: rgba(30, 30, 30, 0.7);
                            width: 100%;
                            height: 100vh;
                            position: absolute;
                            top: 0;
                            left: 0;
                            z-index: 110;
                            &.active {
                                display: block;
                            }
                            .menu_expansive {
                                max-width: 350px;
                                min-width: 320px;
                                height: 100vh;
                                background: rgb(241, 241, 241);
                                z-index: 111;
                                position: absolute;
                                top: 0;
                                left: -400px;
                                .close {
                                    position: absolute;
                                    top: 15px;
                                    right: 15px;
                                    i {
                                        font-size: 22px;
                                        color: rgb(57, 57, 57); 
                                    }
                                }
                                .logo {
                                    text-align: center;
                                    padding: 20px 0;
                                }
                                .menu_wrapper {
                                    padding: 5px 15px;
                                    border-bottom: 1px solid rgba(57,57,57, .1);
                                    h3 {
                                        font-size: 20px;
                                        color: rgb(57, 57, 57);
                                        border-bottom: 1px solid rgba(57,57,57, .1);
                                        padding-bottom: 10px;
                                    }
                                    a {
                                        display: block;
                                        color: rgb(86, 86, 86);
                                        text-decoration: none;
                                        font-size: 17px;
                                        margin: 15px 0;
                                        &:hover {
                                            text-decoration: underline;
                                        }
                                    }
                                    p {
                                        font-size: 14px;
                                        color: rgb(155, 155, 155);
                                    }
                                }
                            }
                        } 
                    }
                    .search_box {
                        width: 100%;
                        order: 3;
                        margin-top: 15px;
                        input {
                            width: 100%;
                        }
                    }
                    .user {
                        .user_settings {
                            display: none;
                        }
                        .cart {
                            margin-right: 8px;
                        }
                    }

                }
            }
            .dropdown_menu {
                display: none;
            }
        }
        
    }
</style>