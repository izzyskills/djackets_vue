<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { toast } from "bulma-toast";
const route = useRoute();
const Product = ref({});
const quantity = ref(1);
const store = useStore();
const getProducts = async () => {
  store.commit("setIsLoading", true);
  const category_slug = route.params.category_slug;
  const product_slug = route.params.product_slug;
  await axios
    .get(`api/v1/products/${category_slug}/${product_slug}`)
    .then((response) => {
      Product.value = response.data;
      document.title = Product.value.name + " | Djackets";
    })
    .catch((error) => {
      console.log(error);
    });
  store.commit("setIsLoading", false);
};
onMounted(() => {
  getProducts();
});
const addToCart = () => {
  if (isNaN(quantity) || quantity.value < 1) {
    quantity.value = 1;
  }
  const item = {
    product: Product.value,
    quantity: quantity.value,
  };
  store.commit("addToCart", item);
  toast({
    message: "The product was added to the cart",
    type: "is-success",
    dismissible: true,
    pauseOnHover: true,
    duration: 2000,
    position: "bottom-right ",
  });
};
</script>
<template>
  <div class="page-product">
    <div class="columns is-multiline">
      <div class="column is-9">
        <figure class="image mb-6">
          <img :src="Product.get_image" alt="" />
        </figure>
        <h1 class="title">{{ Product.name }}</h1>
        <p>{{ Product.description }}</p>
      </div>
      <div class="column is-3">
        <h2 class="subtitle">Information</h2>
        <p><strong>Price: </strong>${{ Product.price }}</p>

        <div class="field has-addons mt-6">
          <div class="control">
            <input type="number" class="input" min="1" v-model="quantity" />
          </div>
          <div class="control">
            <a class="button is-dark" @click="addToCart"> Add to Cart </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
