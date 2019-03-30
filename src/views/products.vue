<template>
  <div class="products-page">

    <!-- list of products -->
    <div class="wrapper" v-if="products.length">
      <div
        class="product"
        v-for="product in products"
        :key="product.id"
      >
        <img :src="product.url">

        <hr>

        <div class="details">
          <div>{{ product.title }}</div>

          <div class="bottom">
            <h4 class="price">{{product.price}}.00€</h4>

            <v-btn class="add" @click="addToCart(product)" icon flat>
              <v-icon color="green">add_shopping_cart</v-icon>
            </v-btn>
          </div>
        </div>

      </div>
    </div>

    <!-- loader -->
    <div class="loader" v-else>
      <v-progress-circular
        indeterminate
        size="64"
        color="primary"
      ></v-progress-circular>
    </div>

  </div>
</template>

<script>
import EventBus from '@/utils/event-bus'

export default {
  name: 'products',
  data () {
    return {
      products: []
    }
  },
  created () {
    // get data from the jsonplaceholder API
    fetch('https://jsonplaceholder.typicode.com/photos')
      .then(response => response.json())
      .then(products => {
        let tmp = products.slice(0, 100) // the api doesnt have a limit filter...
        tmp.forEach(e => e.price = this.randomInt())
        this.products = tmp
      })
      .catch(console.error)
  },
  methods: {
    randomInt() {
      return Math.floor(Math.random() * 100) + 10 
    },
    addToCart(item) {
      this.$store.dispatch('addToCart', item)
        .then(EventBus.$emit('showSnackbar', 'Le produit a été ajouté au panier.'))
    }
  },
}
</script>

<style lang="scss" scoped>
  .products-page {
    height: 100%;
    padding: 40px;

    > .wrapper {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;

      > .product {
        display: flex;
        flex-direction: row;

        width: 414px;
        background: #fff;
        margin: 10px;
        padding: 16px;

        > img {
          height: 150px;
          width: 150px;
          object-fit: contain;
          padding: 12px;
        }

        hr {
          min-height: 100%;
          max-height: 100%;
          max-width: 0;
          width: 0;
          vertical-align: text-bottom;
          margin-left: 10px;
          margin-right: 10px;
          border-color: rgba(0,0,0,.12);
        }

        > .details {
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          padding: 12px;

          > .bottom {
            display: flex;
            justify-content: space-between;
            align-items: center;

            justify-self: flex-end;

            > .price {
              font-size: 22px;
            }

            > .add {
              align-self: flex-end;
            }
          }

        }

      }
    }

    > .loader {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;

      text-align: center;
      height: 100%;
    }
  }
</style>
