<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase" @click="$router.push({ name: 'products' })">
        <span>Lucine</span>
        <span class="font-weight-light">Test Frontend</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        flat
        to="cart"
      >
        <v-icon>shopping_cart</v-icon>
        <span class="mr-2">Mon panier</span>
        <span v-if="itemCount" class="item-count">{{itemCount}}</span>
      </v-btn>
    </v-toolbar>

    <v-content>
      <router-view></router-view>
    </v-content>

    <v-snackbar
      v-model="showSnackbar"
      bottom
      right
      :timeout="4000"
    >
      {{ message }}
      <v-btn
        color="pink"
        flat
        @click="showSnackbar = false"
      >
        OK
      </v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import EventBus from '@/utils/event-bus'
import { mapGetters } from 'vuex'

export default {
  name: 'app',
  data () {
    return {
      showSnackbar: false,
      message: '',
    }
  },
  computed: {
    ...mapGetters(['itemCount']),
  },
  created () {
    EventBus.$on('showSnackbar', message => {
      this.message = message
      this.showSnackbar = true
    })
  },
}
</script>

<style lang="scss" scoped>
  .item-count {
    position: absolute;
    top: -4px;
    left: -6px;
    background-color: #cc9292;
    color: #fff;
    border-radius: 16px;
    height: 15px;
    width: 18px;
    text-align: center;
    line-height: 1.4;
    font-size: 11px;
  }
</style>
