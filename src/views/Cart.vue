<template>
    <div id="cart">
        <div class="center">
           <table class="products">
                <tr>
                    <td>Produto</td>
                    <td></td>
                    <td>Qnt</td> 
                    <td>Preço</td>
                    <td></td>
                </tr>
                <CartProducts v-for="product in cart" :key="product.id" :product="product" v-on:changeTotal="getTotalCart" v-on:changeCart="ResetCart"/>
            </table>
            <div class="sidebar">
                <h2>Resumo</h2>
                <h3>Subtotal</h3>
                <p>{{ totalCart }}</p>
                <h3>Total</h3>
            </div>
        </div>
        
    </div>
</template>

<script>
import CartProducts from '@/components/CartProducts.vue'
export default {
    name: 'Cart',
    data() {
        return {
            cart: [],
            totalCart: ''
        }
    },
    components: {
        CartProducts
    },
    methods: {
        getTotalCart() {
            if(JSON.parse(localStorage.getItem('cart')).length > 0) {
                const cart = JSON.parse(localStorage.getItem('cart'))
                this.cart = cart
                if(cart.length > 1) {
                    const total = cart.reduce((prev, next)=> {
                        return prev + +parseFloat(next.price.replace(',','.')).toFixed(2) * +parseInt(next.qnt)
                    }, 0)
                    this.totalCart = total.toFixed(2).replace('.',',')
                } else {
                     this.totalCart = (+parseFloat(cart[0].price.replace(',','.')).toFixed(2) * +parseInt(cart[0].qnt)).toFixed(2).replace('.',',')
                }
            }
        },
        moneyConverter(payload){
            return parseInt(payload.replace(',','.')).toFixed(2)
        },
        ResetCart(arr) {
            this.cart = arr
            this.getTotalCart()
        }
    },
    mounted() {
        this.getTotalCart()
    },
    computed: {
        total() {
            this.getTotalCart()
        }
    }
}
</script>

<style lang="scss" scoped>
    #cart {
        .center {
            display: flex;
            justify-content: space-between;
            padding: 20px 2%;
            table.products {
                width: 69%;
                tr {
                    td {
                        padding: 10px;
                        border-bottom: 1px solid rgb(228, 224, 224);
                        border-collapse: collapse;
                        &:first-of-type {
                            width: 90px;
                        }
                        &:nth-of-type(3) {
                            width: 100px;
                        }
                        &:nth-of-type(4) {
                            width: 150px;
                            text-align: center
                        }
                        &:last-of-type {
                            width: 10px;
                        }
                    }
                }
            
            }
            .sidebar {
                border: 1px solid red;
                width: 30%;
            }
        }
    }
</style>