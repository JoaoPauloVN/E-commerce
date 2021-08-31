<template>
    <div id="cart">
        <div class="center" v-if="cart.length > 0">
            <div class="products">
                <table>
                    <tr>
                        <td>Produto</td>
                        <td></td>
                        <td>Qnt</td> 
                        <td>Preço</td>
                        <td></td>
                    </tr>
                    <CartProducts v-for="product in cart" :key="product.id" :product="product" v-on:changeTotal="getTotalCart" v-on:changeCart="ResetCart"/>
                    
                    
                </table>
                <div class="box_complements">
                    <div class="box_wrapper">
                        <label for="inputCoupon" id="labelCoupon">Cupon de desconto</label>
                        <input type="text" id="inputCoupon" v-model="coupon" >
                        <button @click="checkCoupon">Ativar cupon</button>
                        <p>JN23IO23N4IJB23ONJ23N4I32</p>
                    </div>
                    <div class="box_wrapper">
                        <label for="inputFreight" id="labelFreight">Calcular frete</label>  
                        <input type="text" id="inputFreight" v-model="freight">
                        <button>Realizar busca</button>        
                    </div>
                </div>
            </div>
            <div class="sidebar">
                <h2>Resumo</h2>
                <div class="sidebar_wrapper">
                    <h3>Subtotal</h3>
                    <p>{{ subTotal }}</p>
                </div>
                <div class="sidebar_wrapper">
                    <h3>Total</h3>
                    <p>{{ totalCart }}</p>
                </div>
                <div class="sidebar_wrapper">
                    <button>Finalizar Compra</button>
                </div>
            </div>
        </div>
        <div class="notFound" v-else>
            <h2>Nao há produtos no carrinho</h2>
        </div>
        <Notification :class="{'desactive': notification === false}" v-on:close="closeBoxNotification" :progress="progress" :title="'Cupon Valido'" :message="'O Cupon foi inserido com sucesso'"/>
    </div>
</template>

<script>
import CartProducts from '@/components/CartProducts.vue'
import Notification from "@/components/CartNotification.vue"
import axios from 'axios'
export default {
    name: 'Cart',
    data() {
        return {
            cart: [],
            coupons: [],
            totalCart: '',
            subTotal: '',
            coupon: '',
            freight: '',
            discount: 0,
            notification: false,
            progress: 0,
            timeModal: 5000
        }
    },
    components: {
        CartProducts,
        Notification
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
                    if(this.discount > 0) {
                        this.totalCart = (total - this.discount).toFixed(2).replace('.',',')
                        if(parseInt(this.totalCart) < this.discount) {
                            this.totalCart = '0,00'
                        }
                    }
                    else 
                        this.totalCart = total.toFixed(2).replace('.',',')
                    this.subTotal = total.toFixed(2).replace('.',',')
                } else {
                    if(this.discount > 0) {
                         this.totalCart = ((+parseFloat(cart[0].price.replace(',','.')).toFixed(2) * +parseInt(cart[0].qnt)) - this.discount).toFixed(2).replace('.',',')
                         if(parseInt(this.totalCart) < this.discount) {
                            this.totalCart = '0,00'
                         }
                    }
                    else 
                        this.totalCart = (+parseFloat(cart[0].price.replace(',','.')).toFixed(2) * +parseInt(cart[0].qnt)).toFixed(2).replace('.',',')
                    this.subTotal = (+parseFloat(cart[0].price.replace(',','.')).toFixed(2) * +parseInt(cart[0].qnt)).toFixed(2).replace('.',',')
                }
            }
        },
        moneyConverter(payload){
            return parseInt(payload.replace(',','.')).toFixed(2)
        },
        ResetCart(arr) {
            this.cart = arr
            this.getTotalCart()
        },
        getCoupons() {
            axios.get('coupons')
            .then(res=> this.coupons = res.data)
        },
        checkCoupon() {
            const coupons = this.coupons
            let coupon = coupons.find(i => i.coupon === this.coupon)
            if(coupon != null) {
                this.discount = 20
                this.getTotalCart()
                 if(this.notification === false) {
                    this.notification = true
                    let progress = setInterval(()=>{
                        this.progress += (10 / (this.timeModal / 500))
                    }, 50)
                    let timer = setTimeout((e)=> {
                        this.notification = false
                        clearInterval(progress)
                        this.progress = 0
                    }, this.timeModal)
                }
            }
        },
        closeBoxNotification() {
            this.notification = false
        },
    },
    mounted() {
        this.getTotalCart()
        this.getCoupons()
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
        min-height: calc(100vh - 244px);
        .center {
            display: flex;
            justify-content: space-between;
            padding: 20px 2%;
            
            .products {
                width: 69%;
                table {
                    width: 100%;
                }
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
                .box_complements {
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    margin-top: 20px;
                    .box_wrapper {
                        width: 49%;
                        border: 1px solid rgba(57, 57, 57, .2);
                        padding: 15px;
                        border-radius: 5px;
                         input {
                            padding: 10px;
                            width: 100%;
                            font-size: 14px;
                            border-radius: 5px;
                            border: 1px solid rgba(144, 144, 144, 0.803);
                            outline: none;
                            color: rgb(57,57,57);
                        }
                        label {
                            background: rgb(255, 255, 255);
                            display: inline-block;
                            padding: 0 4px;
                            color: rgb(67,67,67);
                            margin: 5px 0;
                            font-size: 16px;
                        }
                        button {
                            text-align: right;
                            margin-top: 10px;
                            padding: 10px 12px;
                        }
                        p {
                            margin-top: 10px;
                            opacity: .5;
                        }
                    }
                }
            
            }
            .sidebar {
                padding: 0 10px;
                width: 30%;
                h2 {
                    font-size: 24px;
                    color: rgb(57, 57, 57);
                }
                .sidebar_wrapper {
                    margin-left: 5px;
                    margin-top: 5px;
                    h3 {
                        font-size: 18px;
                        margin-top: 5px;
                        color: rgb(84, 84, 84);
                    }
                    p{
                        margin-top: 5px;
                        color: rgb(57, 57, 57);
                    }
                    &:last-of-type {
                    border-top: 1px solid rgba(57, 57, 57, 0.177);
                    margin-top: 15px;
                    padding-top: 20px;
                    }
                }
            }
             button {
                padding: 12px 50px;
                border-radius: 20px;
                border: none;
                outline: none;
                font-weight: 700;
                font-size: 16px;
                color: rgb(240, 239, 239);
                background: rgb(255, 115, 0);
                cursor: pointer;
            }
        }
    }
    .notFound {
        text-align: center;
        h2 {
            font-size: 24px;
            color: rgb(57,57,57);
            padding-top: 40px;
            border-bottom: 2px solid rgb(255, 115, 0);
            display: inline-block;
        }
    }
    @media screen and (max-width: 960px) {
        #cart {
            .center {
                flex-wrap: wrap;
                .products {
                    order: 2;
                    width: 100%;
                    .box_complements {
                    flex-wrap: wrap;
                    .box_wrapper {
                        width: 100%;
                        margin: 5px 0;
                    }
                }
                }
                .sidebar {
                    order: 1;
                    width: 100%;
                    text-align: center;
                    margin-bottom: 40px;
                }
                
            }
        }
    }
</style>