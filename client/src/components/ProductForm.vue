<template>
  <div class="car-form">
    <form class="row justify-content-center" @submit.prevent="add">
      <div class="form-group col-3">
        <label for="title">Title</label>
        <input
          type="text"
          name="title"
          class="form-control"
          id="title"
          placeholder="Enter Title"
          v-model="product.title"
        />
      </div>
      <div class="form-group col-3">
        <label for="description">Description</label>
        <input
          type="text"
          class="form-control"
          id="description"
          placeholder="Enter Description"
          v-model="product.description"
        />
      </div>
      <div class="form-group col-3">
        <label for="img">Image</label>
        <input
          type="text"
          class="form-control"
          id="img"
          placeholder="Enter image url"
          v-model="product.imgUrl"
        />
      </div>
      <div class="form-group">
        <label for="price">Price</label>
        <input
          type="number"
          class="form-control"
          id="price"
          v-model="product.price"
          placeholder="Price"
        />
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
      <router-link class="btn btn-danger" :to="{name: 'home'}">Cancel</router-link>
    </form>
  </div>
</template>


<script>
export default {
  name: "carform",
  data() {
    return {
      product: {}
    };
  },
  computed: {},
  methods: {
    add() {
      this.$store.dispatch("add", this.product);
    }
  },
  components: {}
};
</script>


<style scoped>
</style>