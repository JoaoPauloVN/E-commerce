<template>
    <div id="login">
        <form action="">
            <h2>Faça seu Login</h2>
            <div class="form_wrapper">
                <label for="inputEmail" id="labelEmail">Email</label>
                <input type="text" id="inputEmail" v-model="email" @focus="inputFocus('Email')" @blur="inputBlur('Email')">
            </div>

            <div class="form_wrapper">
                <label for="inputPassword" id="labelPassword">Senha</label>
                <input type="password" id="inputPassword" v-model="password" @focus="inputFocus('Password')" @blur="inputBlur('Password')" autocomplete="off">
            </div>
            <button @click.stop.prevent="Login">Acessar conta</button>
            <p>ou</p>
            <router-link to="/register">crie sua conta</router-link>
        </form>
    </div>
</template>

<script>
import axios from "axios"
import Cookie from "js-cookie"
export default {
    name: 'login',
    data() {
        return {
            email: '',
            password: '',
        }
    },
    methods: {
        inputFocus: function(field) {
            let label = document.querySelector('#label'+field)
            label.classList.add('active')
        },
        inputBlur: function(field) {
            let label = document.querySelector('#label'+field)
            let input = document.querySelector('#input'+field)
            if(input.value != 0)
                label.classList.add('active')
            else 
                label.classList.remove('active')
        },
        Login() {
            let payload = {
                "email": this.email,
                "password": this.password
            }
            axios.post('/login', payload)
            .then(res=> {
                if(res.data.accessToken) {
                    Cookie.set('tokenE-Commerce', res.data.accessToken)
                    Cookie.set('idE-Commerce', res.data.user.id)
                    Cookie.set('nameE-Commerce', res.data.user.name)
                    this.$store.dispatch('getUserLogged')
                    this.$router.push('/')
                }
            })
            .catch(err=> console.log(err))
        }
    }
}
</script>

<style lang="scss" scoped>
    #login {
        width: 100%;
        min-height: calc(100vh - 244px);
        display: flex;
        align-items: center;
        justify-content: center;
        form {
            width: 400px;
            text-align: center;
            h2 {
                font-size: 24px;
                margin-bottom: 40px;
                color: rgb(91, 89, 89);
            }
            .form_wrapper {
                width: 100%;
                position: relative;
                margin: 20px 0;
                input {
                    padding: 12px 10px;
                    width: 100%;
                    font-size: 15px;
                    border-radius: 5px;
                    border: 1px solid rgb(57,57,57);
                    outline: none;
                    color: rgb(57,57,57);
                }
                label {
                    position: absolute;
                    background: rgb(255, 255, 255);
                    display: inline-block;
                    top: 12px;
                    left: 10px;
                    transition: all 200ms;
                    padding: 0 4px;
                    color: rgb(67,67,67);
                    &.active {
                        top: 0;
                        transform: translate(-5px, -10px) scale(.8)
                    }
                }
            }
            button {
                width: 200px;
                padding: 12px 5px;
                font-size: 16px;
                color: rgb(250, 239, 231);
                background: rgb(255, 115, 0);
                font-weight: 500;
                border-radius: 25px;
                border: none;
                outline: none;
            }
            p {
                color: rgb(150, 150, 150);
                margin: 10px 0;
            }
            a {
                color: rgb(57,57,57);
                text-decoration: none;
                &:hover {
                    text-decoration: underline;
                }
            }
        }
    }
</style>