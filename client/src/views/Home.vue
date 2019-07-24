
<template>
  <div class="products container">
    <div class="row">
      <div class="col-12 title">
        <img id="logo" alt="Vue logo" src="../assets/logo.png" />
        <h1>Bay</h1>
      </div>
      <!-- <p>
        <em>Your one stop shop for Nefarious Needs</em>
      </p>-->
      <div class="col-12">
        <router-link :to="{name: 'create'}" v-if="$route.name == 'home'">create</router-link>
        <router-view />
      </div>
    </div>
    <div class="row">
      <div
        v-for="product in products"
        :key="product._id"
        class="product col-3 mb-3 border rounded border-secondary"
      >
        <h4>
          <b>{{product.title}}</b>
        </h4>
        <p>
          <em>{{product.description}}</em>
        </p>
        <img :src="product.imgUrl" />
        <p>Price: {{product.price}}</p>
        <button class="btn btn-info mb-3" @click="bid(product)">Bid {{product.price+1}}</button>
        <button class="btn btn-danger mb-3" @click="deleteProduct(product)">Hide fromm the FBI</button>
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
    },
    deleteProduct(product) {
      this.$store.dispatch("delete", product);
    }
  }
};
</script>


<style scoped>
img {
  max-height: 200px;
  max-width: 100%;
}

.title {
  display: flex;
  justify-content: center;
}

.products {
  align-content: center;
  justify-content: center;
}
h4 {
  margin-top: 0.4rem;
}

#logo {
  height: 3rem;
  animation-duration: 1s;
  animation-name: changefilter;
  animation-timing-function: steps(2);
  animation-iteration-count: infinite;
  animation-direction: alternate;
  /* filter: hue-rotate(0deg); */
}
@keyframes changefilter {
  from {
    filter: hue-rotate(0deg);
  }
  to {
    filter: hue-rotate(400deg);
  }
}
</style>