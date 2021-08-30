<template>
    <div class="header" @click="closeSearch" @mouseleave="closeSearch">
        <div class="menu">
            <div class="center">
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
                    <div class="icon">
                        <i class="fas fa-user"></i>
                    </div>
                    <p v-if="!$store.state.isLoggedIn"><router-link to="/login">Faça login</router-link> ou <br/> <router-link to="/register">crie sua conta </router-link></p>
                    <span v-else><router-link to="/user">bem vindo<p>{{$store.state.user.name}}</p></router-link></span>
                    <span v-if="$store.state.isLoggedIn" @click="logout" class="logout">logout</span>
                    <div class="cart" @click.stop.prevent="cart">
                        <i class="fas fa-shopping-cart"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="dropdown-menu">
            <div class="center">
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
            modalLogin: false
        }
    },
    mounted() {
        this.getCategories()
    },
    watch: {
        search() {
            this.sendSearch(this.search)
        }
    },
    methods: {
        getCategories() {
            axios.get("categories").then(res=> this.categories = res.data)
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
            this.$store.commit('Logout')
        },
        cart() {
            this.$router.push(`/cart`)
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
                    i {
                        font-size: 17px;
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
                a {
                    font-size: 14px;
                    color: rgb(57, 57, 57);
                    text-decoration: none;
                    &:hover {
                        text-decoration: underline;
                    }
                }
                .cart {
                    i {
                        font-size: 21px;
                        color: rgb(57, 57, 57);
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
        .dropdown-menu {
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
</style>