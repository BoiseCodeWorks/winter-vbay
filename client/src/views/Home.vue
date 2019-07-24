
<template>
  <div class="products container">
    <h1>
      <img alt="Vue logo" src="../assets/logo.png" />BAY
    </h1>
    <router-link :to="{name: 'create'}" v-if="$route.name == 'home'">create</router-link>
    <router-view />
    <div class="row">
      <div
        v-for="product in products"
        :key="product._id"
        class="product col-4 border rounded border-secondary"
      >
        <h4>{{product.title}}</h4>
        <p>
          <em>{{product.description}}</em>
        </p>
        <img :src="product.imgUrl" />
        <p>Price: {{product.price}}</p>
        <button class="btn btn-info" @click="bid(product)">Bid {{product.price+1}}</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "products",
  data() {
    return {
      newCar: {}
    };
  },
  mounted() {
    this.$store.dispatch("getProducts");
  },
  computed: {
    // this references the collection on our store's state
    products() {
      return this.$store.state.products;
    }
  },
  methods: {
    bid(product) {
      product.price += 1;
      this.$store.dispatch("bid", product);
    }
  }
};
</script>


<style scoped>
img {
  height: 200px;
}
h1 img {
  height: 1.2rem;
}
</style>