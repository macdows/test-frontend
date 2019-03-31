<template>
  <div class="cart-page">

    <v-btn flat small :to="{ name: 'products'}">
      <v-icon>arrow_left</v-icon>
      <span>Retour</span>
    </v-btn>

    <v-list v-if="cart.length && !done" class="cart-items" subheader two-line>
      <v-subheader><h2>Mon panier</h2></v-subheader>
      <v-list-tile
        class="item-row"
        v-for="(item, index) in cart"
        :key="index"
      >
        <img class="product-preview" :src="item.url">

        <v-list-tile-content>
          <v-list-tile-title>{{item.title}}</v-list-tile-title>
          <v-list-tile-sub-title>{{item.price}}.00€</v-list-tile-sub-title>
        </v-list-tile-content>

        <v-list-tile-action>
          <v-btn icon ripple @click="removeItem(index)">
            <v-icon color="grey">delete</v-icon>
          </v-btn>
        </v-list-tile-action>
      </v-list-tile>
      <div class="total">
        <h3>Total: {{total}}.00€</h3>
        <v-btn
          flat
          color="primary"
          :disabled="showDialog"
          :loading="showDialog"
          @click="showDialog = true"
        >
          Passer la commande
        </v-btn>
      </div>
    </v-list>

    <div class="empty" v-if="!cart.length && !done">
      <img src="@/assets/empty_cart.png">
      Panier vide
      <v-btn flat color="primary" :to="{ name: 'products' }">Parcourir les produits</v-btn>
    </div>

    <done v-if="done" />

    <v-dialog
      v-model="showDialog"
      hide-overlay
      persistent
      width="300"
    >
      <v-card
        color="primary"
        dark
      >
        <v-card-text>
          Veuillez patienter
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Done from '@/components/done'
import { mapGetters } from 'vuex'

export default {
  name: 'cart',
  components: {
    Done,
  },
  data () {
    return {
      showDialog: false,
      done: false,
    }
  },
  watch: {
    showDialog (val) {
      if (!val) return
      setTimeout(() => {
        this.$store.dispatch('emptyCart')
          .then(() => {
            this.showDialog = false
            this.done = true
          })
      }, 3000)
    }
  },
  computed: {
    ...mapGetters(['cart', 'total'])
  },
  methods: {
    removeItem (index) {
      this.$store.dispatch('removeFromCart', index)
    }
  }
}
</script>

<style lang="scss" scoped>
  .cart-page {
    padding: 40px 20%;

    .product-preview {
      height: 54px;
      margin: 2px;
      margin-right: 10px;
    }

    .total {
      margin-top: 20px;
      text-align: right;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-left: 40px;
    }

    .empty {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background: #fff;
      width: 100%;
      color: grey;
      font-size: 18px;
      padding: 40px;

      img {
        height: 200px;
        object-fit: contain;
        margin-left: -46px;
      }
    }
  }
</style>
