<template>
    <div>
        <div class="img">
            <img :src="'/assets/products/'+product.image[0]" :alt="product.name">
        </div>
        <div class="content">
            <h3>{{ product.name }}</h3>  
            <p>R$ {{ product.price }} </p>
            <h2>R$ {{ product.price }}</h2>
            <button>Comprar</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "ProductSingle",
    props: {
        product: {
            type: Object
        }
    }
}
</script>

<style lang="scss" scoped>
.img {
    width: 100%;
    height: 200px;
    img {
        width: 100%;
        height: 100%;
    }
}  
.content {
    padding: 5px;
    h3 {
        color: rgb(57, 57, 57);
        font-size: 16px;
        margin-bottom: 5px;
    }
    p {
        color: rgb(113, 113, 113);
        font-size: 13px;
        text-decoration: line-through;
    }
    h2 {
        color: rgb(255, 115, 0);
    }
    button {
        width: 100%;
        border: none;
        background: rgb(255, 115, 0);
        padding: 10px 0;
        margin-top: 10px;
        border-radius: 5px;
        color: white;
        font-size: 16px;
        font-weight: 500;
        transition: 200ms;
        &:hover {                               
            cursor: pointer;
            transform: scale(1.01, 1.01);
        }
    }
}
</style>