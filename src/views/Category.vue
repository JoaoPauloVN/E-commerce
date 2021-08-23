<template>
    <div id="category">
        <div class="center" v-if="products.length">
            <div class="sidebar">
                <div class="filter_wrapper">
                    <h3>Preço</h3>
                    <div class="price_field"> 
                        <input type="range" min="0" max="500" :value="minVal" id="min" @input="minChange">
                        <input type="range" min="0" max="500" :value="maxVal" id="max" @input="maxChange">
                        
                    </div>
                    <div class="price_show">
                        <p>{{ 'R$ ' + minVal }} </p>
                        <p>{{ 'R$ ' + maxVal }} </p>
                    </div>
                </div>
                
            </div>
            <div class="main">
                <CategoryProducts :products="products" />
            </div>
        </div>
        <div class="error" v-else>
            <h2>Nenhum produto encontrado</h2>
            <p>clique <router-link to="/">aqui</router-link> para volta a Home</p>
        </div>
    </div>
</template>

<script>
import axios from "axios"
import CategoryProducts from "@/components/CategoryProducts.vue"
export default {
    name: "Category",
    data(){
        return {
            category: {},
            products: [],
            slug: this.$route.params.slug,
            page: null,
            minVal: 0,
            maxVal: 500
        }
    },
    components: {
        CategoryProducts
    },
    created() {
        this.getCategory()
    },
    watch: {
        $route(){
            this.slug = this.$route.params.slug
            this.getCategory()
        }
    }, 
    methods: {
        getCategory(){
            if(this.slug){
                axios.get(`categories?slug=${this.slug}&_embed=products`)
                .then(res=> {
                    this.category = res.data[0]
                    if(this.category.products !== undefined)
                        this.products = this.category.products
                })
            }
            
        },
        minChange() {
            let elMin = document.querySelector('#min')
            let elMax = document.querySelector('#max')
            let min = parseInt(elMin.value)
            let max = parseInt(elMax.value)
            this.minVal = min
            if(min > max - 10)
                this.minVal = max - 10
        },
        maxChange() {
            let min = parseInt(document.querySelector('#min').value)
            let max = parseInt(document.querySelector('#max').value)
            this.maxVal = max
            if(max <= min + 10)
                this.maxVal = min + 10
        }
    }
}
</script>

<style lang="scss" scoped>
    #category {
        margin-top: 40px;
        min-height: calc(100vh - 125px - 160px);
        .center {
            display: flex;
            .sidebar {
                width: 250px;
            }
            .main {
                width: calc(100% - 250px);
                padding: 0 20px;
            }
        }
        .error {
            text-align: center;
            h2 {
                display: block;
                font-size: 32px;
                color: rgb(57,57,57);
            }
            p {
                display: block;
                color: rgb(57,57,57);
                a {
                    color: rgb(32, 32, 32);
                    text-decoration: none;
                    &:hover {
                        text-decoration: underline;
                    }
                }
            }
        }
        .filter_wrapper {
            padding: 15px 0;
            border-bottom: 1px solid rgba(57, 57, 57, 0.319);
            h3 {
                color: rgb(57,57,57);
            }
            .price_field {
                position: relative;
                input[type=range] {
                    position: absolute;
                    top: 45px;
                    width: 100%;
                    pointer-events: none;
                    -webkit-appearance: none;
                    height: 3px;
                    background: rgb(57,57,57);
                    outline: none;
                    &::-ms-track {
                        width: 188px;
                        height: 2px; 
                        pointer-events: none;
                        background: transparent;
                    }
                    &::-webkit-slider-thumb {
                        position: relative;
                        -webkit-appearance: none;
                        border-radius: 50%;
                        height: 20px;
                        width: 20px;
                        background-color: rgb(255, 115, 0);
                        cursor: pointer;
                        pointer-events: all;
                        z-index: 100;
                    }
                }
                
            }
            .price_show {
                display: flex;
                justify-content: space-between;
                margin: 10px 0 25px 0;
                p {
                    font-weight: 500;
                    color: rgb(57,57,57);
                }
            }
        }
        
    }
</style>