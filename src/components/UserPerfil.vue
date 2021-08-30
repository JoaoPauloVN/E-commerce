<template>
    <div>
        <div class="profile">
            <h2><i class="fas fa-user"></i> Meu Perfil</h2>
            <p>Nome: {{user.name}}</p>
            <p>Email: {{user.email}}</p>
            <button><router-link to="/user/dados">Editar Dados</router-link></button>
        </div>
    </div>
</template>

<script>
export default {
    name: "UserPerfil",
    data(){
        return {
            user: this.$store.state.user
        }
    }
}
</script>

<style lang="scss" scoped>
    .profile {
        padding-bottom: 20px;
        i {
            font-size: 18px;
        }
        h2 {
            font-size: 20px;
            color: rgb(57,57,57);
            margin-bottom: 10px;
        }
        p {
            color: rgb(57,57,57);
            font-size: 16px;
        }
        button {
            margin-top: 10px;
            padding: 10px;
            border-radius: 5px;
            border: none;
            outline: none;        
            padding: 12px 15px;
            box-shadow: 0 7px 15px -6px rgba(57, 57, 57, .5);
            cursor: pointer;
            background: rgb(255, 115, 0);     
            a{
                text-decoration: none;
                color: rgb(57, 57, 57);
                font-weight: 500;
                color: white;
                font-size: 16px;
                &:hover {
                    text-decoration: underline;
                }
            }
        }
    }
</style>