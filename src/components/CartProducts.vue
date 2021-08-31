<template>
    <tr class="product_single">
        <td>
            <div class="img">
                <img :src="'/assets/products/' + product.image[0]" alt="">
            </div>
        </td>
        <td><h3>{{ product.name }}</h3></td>
        <td><input type="number" v-model="product.qnt" min="0" @keyup="ChangeQnt" @change="ChangeQnt"></td>
        <td>R$ {{ product.price }} <p v-show="product.qnt > 1">Total R$ {{total}}</p></td>
        <td><i class="fas fa-trash" @click="Remove(product.id)"></i></td>
        
    </tr>
</template>

<script>
export default {
    name: 'CartProducts',
    data() {
        return {
            total: ''
        }
    },
    props: {
        product: {
            type: Object
        }
    },
    mounted() {
        this.getTotal()
    },
    methods: {
        Remove(id) {
            if(JSON.parse(localStorage.getItem('cart')) !== null) {
                const cart = JSON.parse(localStorage.getItem('cart'))
                let result = cart.filter(i=>{
                    if(i.id != parseInt(id)) return true
                })
                localStorage.setItem('cart', JSON.stringify(result))
                this.$store.dispatch('upgradeCartQnt')
                this.$emit('changeCart', result)
            }
        },
        ChangeQnt() {
            if(JSON.parse(localStorage.getItem('cart')) !== null) {
                const payload = {
                    'id' : this.product.id,
                    'qnt' : this.product.qnt
                }
                const cart = JSON.parse(localStorage.getItem('cart'))
                const productExists = cart.find(i=> i.id === payload.id)
                if(productExists) {
                    productExists.qnt = payload.qnt
                    localStorage.setItem('cart', JSON.stringify(cart))
                    this.$emit('changeTotal')
                    this.getTotal()
                }
            }
        },
        getTotal() {
            const product = this.product
            this.total = (+parseFloat(product.price.replace(',','.')).toFixed(2) * +parseInt(product.qnt)).toFixed(2).replace('.',',')
        },
        close () {
            console.log('asd')
        
        }
    }
}
</script>

<style lang="scss" scoped>
    .product_single {
        width: 100%;
        .img {
            width: 80px;
            height: 80px;
            img {
                width: 100%;
                height: 100%;
            }
        }
        td {
            padding: 10px;
            border-bottom: 1px solid rgb(228, 224, 224);
            border-collapse: collapse;
            &:first-of-type {
                width: 90px;
            }
            &:nth-of-type(3) {
                input {
                    width: 80px;
                    font-weight: 500;
                    padding: 5px;
                }
            }
            &:nth-of-type(4) {
                width: 150px;
                text-align: center
            }
        }
    }
</style>