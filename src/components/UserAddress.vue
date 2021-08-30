<template>
    <div class="address">
        <h2><i class="fas fa-map-marked-alt"></i> Meus Endereços</h2>
        <div class="address_wrapper">
            <h3>Endereço Padrão</h3>
            <p>{{address.address}}</p>
            <p>{{address.city}} - {{address.state}}</p>
            <p>{{address.phone}}</p>
        </div>
        <button @click.stop.prevent="newAddress">Editar Endereço</button>
    </div>
</template>

<script>
export default {
    name: 'UserAddress',
    data() {
        return {
            address: this.$store.state.user.address[0]
        }
    },
    methods: {
        newAddress() {
            this.$router.push({'name': 'NewUserAddress'});
        }
    }
}
</script>   

<style lang="scss" scoped>
    .address {
        padding-bottom: 20px;
        i {
            font-size: 18px;
        }
        h2 {
            font-size: 20px;
            color: rgb(57,57,57);
            margin-bottom: 10px;
        }
        .address_wrapper {
            padding: 5px;
            h3 {
                font-size: 18px;
                color: rgb(81, 81, 81);
                margin: 5px 0;
            }
            p {
                color: rgb(57,57,57);
                font-size: 16px;
                margin: 2px 0;
            }
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
            font-weight: 500;
            color: white;
            font-size: 16px;   
            &:hover {
                text-decoration: underline;
            }
        }
    }
</style>