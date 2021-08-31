<template>
    <div class="box_products" v-if="products.length">
        <div class="product_box_single" v-for="product in products" :key="product.id" @click.stop.prevent="ClickProduct(product.id)">
            <ProductSingle :product="product"/>
        </div>
    </div>
</template>

<script>
import ProductSingle from "./ProductSingle.vue"
export default {
    name: "CategoryProducts",
    props: ['products'],
    components: {
        ProductSingle
    },
    methods: {
        ClickProduct(id) {
            this.$router.push(`/produto/${id}`)
        },
    }
}
</script>

<style lang="scss" scoped>
    .box_products {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    }
    @media screen and (max-width: 864px) {
        .box_products {
            grid-template-columns: 1fr 1fr 1fr 1fr;
        }
    }
    @media screen and (max-width: 740px) {
        .box_products {
            grid-template-columns: 1fr 1fr 1fr;
        }
    }
    @media screen and (max-width: 595px) {
        .box_products {
            grid-template-columns: 1fr 1fr;
        }
    }
</style>