<template>
  <div class="product">
    <div class="center">
        <div class="box_product">
            <div class="product_img">
                <div class="img">
                    <div class="arrows">
                        <div id="left" class="disable">
                            <i class="fas fa-chevron-left" @click="prevImage"></i>
                        </div>
                        <div id="right">
                            <i class="fas fa-chevron-right" @click="nextImage"></i>
                        </div>
                    </div>
                    <img :src="'/assets/products/'+images[curIndex]" alt="" id="myimage">
                </div>
                
                <div class="box_images">
                        <img v-for="(image, index) in images" 
                             :key="index" 
                             :src="'/assets/products/'+image" 
                             :alt="product.name"
                             :id="'img'+index" 
                             :class="{'selected':index == 0}"
                             @click.stop.prevent="imageClick(index)" 
                        >  
                </div>
            </div>
            <div class="product_info">
                <div class="info_wrapper">
                    <h2 class="name">{{ product.name }} Lorem ipsum dolor sit amet.</h2>
                </div>
                <div class="info_wrapper">
                    <h2 class="price">{{ product.price }}</h2>
                </div>
                <div class="info_wrapper">
                    <img src="../assets\brands\cards.png" alt="cards">
                </div>
                <div class="info_wrapper">
                    <button>Comprar</button>
                </div>
            </div>
        </div>
    </div>
    
  </div>
</template>

<script>
    import axios from "axios"
  export default {
    name: "Product",
    data() {
      return {
          product: [],
          images: [],
          curIndex: 0
      }
    },
    components: {

    },
    mounted(){
        let id = this.$route.params.id
        this.getProduct(id)
    },
    watch: {
        $route(){
            let id = this.$route.params.id
            this.getProduct(id)
        }
    }, 
    methods: {
        getProduct(id) {
            axios.get(`/products/${id}`).then(res=> {
                this.product = res.data
                this.images = res.data.image
            })

        },
        nextImage() {
            let max = this.images.length -1
            let right = document.getElementById('right')
            let left = document.getElementById('left')
            if(this.curIndex < max) {
                left.classList.remove('disable')
                this.curIndex++   
                this.selectImage()
            }    
            if(this.curIndex == max)
                right.classList.add('disable')
        },
        prevImage() {
            let right = document.getElementById('right')
            let left = document.getElementById('left')
            
            if(this.curIndex >= 1) {
                right.classList.remove('disable')
                this.curIndex--
                this.selectImage()
            } 
            if(this.curIndex == 0)
                left.classList.add('disable')
        },
        imageClick(id) {
            this.curIndex = id
            let max = this.images.length -1
            let right = document.getElementById('right')
            let left = document.getElementById('left')
            this.selectImage()
            left.classList.remove('disable')
            right.classList.remove('disable')
            if(this.curIndex == max)
                right.classList.add('disable')
            if(this.curIndex == 0)
                left.classList.add('disable')
        }, 
        selectImage(){
            let images = document.getElementsByClassName('box_images')[0].children
            for(let i = 0; i < images.length; i++){
                images[i].classList.remove('selected')
            }
            images[this.curIndex].classList.add('selected')
        }
    }
  }
</script>

<style lang="scss" scoped>
    .box_product {
        display: flex;
        margin-top: 20px;
        .product_img {
            width: 50%;
            margin-top: 20px;
            
            .img {
                position: relative;
                width: 100%;
                .arrows {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    .disable {
                        i {
                            color: gray;
                            cursor: default;
                        }
                    }
                    i {
                        font-size: 24px;
                        color: rgb(57, 57, 57);
                        cursor: pointer;
                    }
                }
                img {
                    width: 100%;
                }
            }
            
            .box_images {
                width: 100%;
                border-top: 1px solid rgba(57, 57, 57, 0.251);
                display: flex;
                justify-content: left;
                padding: 5px;
                overflow-x: auto;
                white-space: nowrap;
                &::-webkit-scrollbar {
                    height: 7px;
                }
                &::-webkit-scrollbar-thumb {
                    background: rgba(57, 57, 57, 0.347);
                    border-radius: 10px;
                }
                img {
                    width: 20%;
                    cursor: pointer;
                }
                img.selected {
                    border: 2px solid rgba(57, 57, 57, 0.619);
                }
            }
        }
        .product_info {
            width: 50%;
            padding: 0 15px;
            .info_wrapper {
                padding: 20px 5px;
                border-bottom: 1px solid rgba(57, 57, 57, 0.156);
                .name {
                    font-size: 21px;
                    color: rgb(57,57,57);
                    font-weight: 500;
                }
                .price {
                    color: rgb(255, 115, 0);
                }
                img {
                    width: 350px;
                    
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
    }
    
</style>
