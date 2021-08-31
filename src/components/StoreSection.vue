<template>
    <div class="store_section">
        <div class="center">
            <div class="title">
                <i class="fas fa-bolt"></i>
                <h2>PRODUCTS AN OFFER</h2>
            </div>   
        </div>
        <div class="products">
            <div class="arrows arrow_left" @click="leftCarrouseu">
                <i class="fas fa-chevron-left"></i>
            </div>
            <div class="products_box">
                <div class="center asdas">
                    <div class="product_single" @click="ClickProduct(product.id)" v-for="product in products" :key="product.id"> 
                        <ProductSingle :product="product" />
                    </div>
                </div>
            </div>
            <div class="arrows arrow_right" @click="RightCarrouseu">
                <i class="fas fa-chevron-right"></i>
            </div>
        </div>
        <div class="show_more">
            <h3>SHOW MORE</h3>
        </div>
    </div>
</template>

<script>
    import axios from "axios"
    import ProductSingle from "./ProductSingle.vue"

export default {
    name: "StoreSection",
    data(){
        return {
            products: []
        }
    },
    methods: {
        ClickProduct(id) {
            this.$router.push(`/produto/${id}`)
        },
        getProducts() {
            axios.get('products').then(res=> this.products = res.data).catch(er=> console.log(er))
        },
        RightCarrouseu() {
            let pro = document.querySelector('.products_box')
            let box = document.querySelector('.asdas')
            let boxWidth = box.attributes[0].ownerElement.scrollWidth
            let children = box.attributes[0].ownerElement.children
            pro.scrollLeft += boxWidth / children.length
        },
        leftCarrouseu() {
            let pro = document.querySelector('.products_box')
            let box = document.querySelector('.asdas')
            let boxWidth = box.attributes[0].ownerElement.scrollWidth
            let children = box.attributes[0].ownerElement.children
            pro.scrollLeft -= boxWidth / children.length
        }
    },
    mounted() {
        this.getProducts()
    },
    components: {
        ProductSingle
    }
}
</script>

<style lang="scss" scoped>
    .store_section {
        max-width: 1350px;
        margin: 0 auto;
        background: rgb(240, 240, 240);
        border-bottom: 1px solid rgb(226, 226, 226);
        .title {
            display: flex;
            align-items: center;
            padding: 30px 0;
            h2 {
                margin-left: 10px;
                font-size: 18px;
                font-weight: 700;
                color: rgb(61, 61, 61);
            }
            i {
                color: rgb(255, 115, 0);
            }
        }
        .products {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .arrows {
                width: 20px;
                i {
                    font-size: 24px;
                    color: rgb(57, 57, 57);
                    cursor: pointer;
                }
            }
            .arrow_left {
                margin-left: 15px;
            }
            .arrow_right {
                margin-right: 15px;
                i {
                    margin-left: 5px;
                }
            }
            .center {
                    padding: 0;
                }
            .products_box {
                width: 100%;
                height: 100%;
                overflow: auto;
                white-space: nowrap;
                transition: all 2s;
                .product_single {
                    display: inline-block;
                    padding: 5px;
                    width: 215px;
                    background: rgb(247, 247, 247);                  
                    cursor: pointer;
                }
                &::-webkit-scrollbar {
                    height: 0px;
                }
            }      
        }
        .show_more {
            text-align: right;
            padding: 20px 15px;
            h3 {
                display: inline-block;
                font-size: 16px;
                font-weight: 700;
                cursor: pointer;
                color: rgb(57, 57, 57);
                &:hover {
                    text-decoration: underline;
                }
            }
        } 
    }
</style>