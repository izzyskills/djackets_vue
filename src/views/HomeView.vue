<script setup>
import ProductBox from "../components/ProductBox.vue";
import { ref, onMounted } from "vue";
import axios from "axios";
import { useStore } from "vuex";
document.title = "Home |  Djackets";
const latestProducts = ref([]);
const store = useStore();
const getLatestProducts = async () => {
  store.commit("setIsLoading", true);
  await axios
    .get("api/v1/latest-products/")
    .then((response) => {
      latestProducts.value = response.data;
    })
    .catch((error) => {
      console.error("Error fetching latest products: ", error);
    });
  store.commit("setIsLoading", false);
};
onMounted(() => {
  getLatestProducts();
});
</script>

<template>
  <div class="home">
    <section class="hero is-medium is-dark mb-6">
      <div class="hero-body has-text-centered">
        <p class="title mb-6">Welcome to Djacket</p>
        <p class="subtitle">The best jacket store online</p>
      </div>
    </section>
    <div class="columns is-multiline">
      <div class="column is-12">
        <h2 class="is-size-2 has-text-centered">Latest products</h2>
      </div>
      <ProductBox
        v-for="product in latestProducts"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>
