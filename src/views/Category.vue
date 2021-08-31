<template>
    <div id="category">
        <div class="filter_blur" @click.stop.prevent="filterToggle"></div>
        <div class="center">
            <div class="sidebar">
                <div class="btn_mobile" @click.stop.prevent="filterToggle">
                    Filtro <i class="fas fa-chevron-down"></i>
                </div>
                <div class="filterBox">
                    
                    <div class="filter_wrapper">
                        <h3>Preço</h3>
                        <div class="price_field"> 
                            <input type="range" min="0" max="500" :value="minVal" id="min" @input="minChange">
                            <input type="range" min="0" max="250" :value="maxVal" id="max" @input="maxChange">                    
                        </div>
                        <div class="price_show">
                            <p>{{ 'R$ ' + minVal }} </p>
                            <p>{{ 'R$ ' + maxVal }} </p>
                        </div>
                        <div class="btn_filter">
                            <button @click.stop.prevent="filterProducts">Filter</button>
                            <button @click.stop.prevent="clearFilter"><i class="fas fa-times"></i></button>
                        </div>
                    </div>
                    <div class="filter_wrapper search">
                        <h3>Busca</h3>
                        <input type="text" v-model="search" @keyup.enter="sendSearch" @click.stop.prevent="openSearch">
                        <button @click.stop.prevent="filterProducts">Filter</button>
                        <button @click.stop.prevent="clearSearch"><i class="fas fa-times"></i></button>
                    </div>
                </div>
            </div>
            <div class="main">
                <CategoryProducts :products="products" v-if="products.length" />
                <div class="error" v-else>
                    <h2>Nenhum produto encontrado</h2>
                </div>
            </div>
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
            maxVal: 250,
            search: ''
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
            elMin.style.zIndex = "101"
            elMax.style.zIndex = "100"
            elMin.style.background = "transparent"
            elMax.style.background = "rgb(57,57,57)"
            this.minVal = min
            if(min > max)
                this.minVal = max
        },
        maxChange() {
            let elMin = document.querySelector('#min')
            let elMax = document.querySelector('#max')
            let min = parseInt(elMin.value)
            let max = parseInt(elMax.value)
            elMin.style.zIndex = "100"
            elMax.style.zIndex = "101"
            elMin.style.background = "rgb(57,57,57)"
            elMax.style.background = "transparent"
            this.maxVal = max 
            if(max <= min)
                this.maxVal = min
        }, 
        filterProducts() {
            let min = parseInt(document.querySelector('#min').value)
            let max = parseInt(document.querySelector('#max').value)
            let search = (this.search != "") ? true : false
            axios.get(`categories?slug=${this.slug}&_embed=products`)
            .then(res=> {
                this.category = res.data[0]
                if(this.category.products !== undefined) {
                    this.products = this.category.products
                    this.products = this.products.filter((e)=>{
                        if(parseInt(e.price) > min && parseInt(e.price) < max) {
                            if(search) {
                                
                                let myReg = new RegExp(".*" + this.search.toUpperCase() + ".*")
                                console.log(e.name.toUpperCase().match(myReg), e.name)
                                    if(e.name.toUpperCase().match(myReg) != null)
                                        return true
                            } else 
                                return true
                            
                        }
                    })
                }   
            })
        },
        clearFilter() {
            this.minVal = 0,
            this.maxVal = 250
            this.getCategory()
        },
        clearSearch() {
            this.search = ''
            if(this.minVal != 0 || this.maxVal != 250)
                this.filterProducts()
            else
                this.getCategory()
        },
        filterToggle() {
            const el = document.querySelector('.filterBox')
            const blur = document.querySelector('.filter_blur')
            
            if(el.classList.contains('active')) {
                el.classList.remove('active')
                blur.style.display = 'none'
            } else {
                el.classList.add('active')
                blur.style.display = 'block'
            }
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
                .btn_mobile {
                    display: none;
                }
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
                    &:last-child {
                        background: transparent;
                    }
                        
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
                        transition: all 300ms;
                        &:hover {
                            transform: scale(1.2)
                        }
                        &:after {
                            content: '';
                            background: red;
                            width: 100px;
                            height: 5px;
                            margin-top: 10px;
                            padding: 5px;
                        }
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
            button {
                margin-top: 10px;
                padding: 10px;
                border-radius: 5px;
                border: none;
                outline: none;        
                padding: 8px 15px;
                box-shadow: 0 7px 15px -6px rgba(57, 57, 57, .5);
                cursor: pointer;
                background: rgb(255, 115, 0);     
                font-weight: 500;
                color: white;
                font-size: 15px;
                &:hover {
                    text-decoration: underline;
                }
            }
            .btn_filter {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            &.search {
                display: flex;
                align-items: center;
                justify-content: space-between;
                flex-wrap: wrap;
                input {
                    width: 100%;
                    padding: 10px 12px;
                    outline: none;
                    background: rgb(255, 255, 255);
                    border: 1px solid  rgb(57,57,57);
                    border-radius: 10px;
                    color: rgb(57,57,57);
                    margin: 0 auto;
                }
            }
        }
    }
    @media screen and (max-width: 960px) {
        #category {
            margin-top: 0;
            min-height: calc(100vh - 240px);
            position: relative;
            .filter_blur {
                position: absolute;
                width: 100%;
                background: rgba(0, 0, 0, 0.129);
                height: calc(100% - 20px);
                z-index: 3;
                top: 40px;
                display: none;
            }
            .center {
                position: relative;
                overflow-x: hidden;
                .sidebar {
                    position: absolute;
                    top: 10px;
                    left: 0;
                    width: 100%;
                    z-index: 4;
                    .btn_mobile {
                        display: block;
                        width: 100%;
                        text-align: center;
                        font-size: 16px;
                        border-bottom: 1px solid rgba(57,57,57,.2);
                        padding-bottom: 10px;
                    }
                    
                    .filterBox {
                        width: 100%;   
                        background: white;
                        position: absolute;
                        left: 0; 
                        top: -350px;
                        transition: all 2s;
                        z-index: 100;
                        padding: 5%;
                        &.active {
                            top: 30px;
                            
                        }
                    }
                }
                
                .main {
                    margin-top: 60px;
                    padding: 0 1%;
                    width: 100%;
                    min-height: calc(100vh - 280px);
                }
            }
        }
    }
</style>