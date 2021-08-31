<template>
    <div class="profile">
        <h2><i class="fas fa-database"></i> Meus Dados</h2>
        <form v-if="!$store.state.loading">
            
            <div class="form_wrapper w50">
                <label for="inputName" id="labelName">Name</label>  
                <input type="text" id="inputName" v-model="user.name" @focus="inputFocus('Name')" @blur="inputBlur('Name')"> 
            </div>
            <div class="form_wrapper w50">
                <label for="inputEmail" id="labelEmail">Email</label>
                <input type="text" id="inputEmail" v-model="user.email" @input="inputFocus('Email')" @focus="inputFocus('Email')" @blur="inputBlur('Email')"> 
            </div>
        </form>
        <button @click="changeData">Alterar Dados</button>
    </div>
</template>

<script>
import axios from "axios"
export default {
    name: 'UserProfile',
    data() {
        return {
            user: {}
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
        getUser() {
            this.user = this.$store.state.user
            if(this.user != null) {
                if(this.user.name != '') {
                    let label = document.querySelector('#labelName')
                    label.classList.add('active')
                }
                if(this.user.email != '') {
                    let label = document.querySelector('#labelEmail')
                    label.classList.add('active')
                }
            }
        },
        changeData() {
            axios.patch(`users/${this.user.id}`,{
                "name": this.user.name,
                "email": this.user.email
            })
            .catch()
        }
    },
    mounted() {
        this.getUser()
    }
}
</script>

<style lang="scss" scoped>
    i {
        font-size: 18px;
    }
    h2 {
        font-size: 20px;
        color: rgb(57,57,57);
        margin-bottom: 10px;
    }
    form {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        .form_wrapper {
            width: 100%;
            position: relative;
            margin: 7px 0;
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
            &.w50 {
                width: 49.5%;
            }
        }
    }
    button {
        margin-top: 10px;
        padding: 12px 15px;
        border-radius: 5px;
        border: none;
        outline: none;
        color: rgb(57, 57, 57);
        font-weight: 500;
        box-shadow: 0 7px 15px -6px rgba(57, 57, 57, .5);
        cursor: pointer;
        background: rgb(255, 115, 0);
        color: white;
        font-size: 16px;
        &:hover {
            text-decoration: underline;
        }
    }
    @media screen and (max-width: 610px) {
        .profile {
            form {
                .form_wrapper {
                    width: 100%;
                }
            } 
        }
    }
</style>