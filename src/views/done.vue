<template>
  <div class="done">
    <div class="order-placed">
      <img src="@/assets/order_placed.png">
      Votre commande a bien été passée !
      <v-btn flat color="primary" :to="{ name: 'products' }">Retour à la boutique</v-btn>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .done {
    padding: 40px 20%;

    .order-placed {
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
      }
    }
  }
</style>
