<template>
    <div class="user">
        <div class="center">
            <div class="sidebar">
                <router-link to="/user" class="sidebar_wrapper" :class="{'active': path == ''}">
                    <h3><i class="fas fa-user"></i> Meu Perfil</h3>
                </router-link>
                <router-link to="/user/dados" class="sidebar_wrapper" :class="{'active': path == '/dados'}">
                    <h3><i class="fas fa-database"></i> Editar Dados</h3>
                </router-link>
            </div>
            <div class="main">
                <div v-if="path == ''">
                    <UserPerfil/>
                    <UserAddress />
                </div>
                <div v-else>
                    <router-view></router-view>
                </div>
            </div>         
        </div>
    </div>
</template>

<script>
import UserPerfil from '@/components/UserPerfil.vue'
import UserProfile from "@/components/UserProfile.vue"
import UserAddress from "@/components/UserAddress.vue"
import axios from 'axios'
export default {
    name: 'UserPage',
    data() {
        return {
            path: null
        }
    },
    mounted() {
        this.path = this.$route.fullPath.replace('/user', '')
    },
    watch: {
        $route(){
            this.path = this.$route.fullPath.replace('/user', '')
        }
    },
    methods: {
        redirect(url) {
            this.$router.push(url)
        },
    },
    components: {
        UserPerfil,
        UserProfile,
        UserAddress
    }
}
</script>

<style lang="scss" scoped>
    .user {
        padding: 20px 0;
        width: 100%;
        min-height: calc(100vh - 242px);
        .center {
            display: flex;
            justify-content: space-between;
        }
        .sidebar {
            width: 20%;
            .sidebar_wrapper {
                width: 100%;
                border-bottom: 1px solid rgba(57, 57, 57, 0.442);
                padding: 11px 10px;
                cursor: pointer;
                display: block;
                text-decoration: none;
                h3 {
                    color: rgb(57,57,57);
                }
                &:hover {
                    background: rgba(213, 213, 213, 0.442);
                }
                i {
                    font-size: 18px;
                }
                &.active {
                    background: rgb(189, 189, 189);
                }
            }
        }
        .main {
            width: 79%;
            padding: 11px 10px;
        }
    }
    @media screen and (max-width: 610px) {
        .user {
            .center {
                flex-wrap: wrap;
                .sidebar {
                    width: 100%;

                }
                .main {
                    margin-top: 20px;
                    width: 100%;
                }
            }
        }
    }
</style>