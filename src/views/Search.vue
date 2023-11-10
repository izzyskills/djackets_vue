<script setup>
import axios from "axios";
import ProductBox from "../components/ProductBox.vue";
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
const products = ref([]);
const store = useStore();
const query = ref("");
const performSearch = async () => {
  store.commit("setIsLoading", true);
  await axios
    .post("/api/v1/products/search/", { query: query.value })
    .then((response) => {
      products.value = response.data;
    })
    .catch((error) => {
      console.log(error);
    });

  store.commit("setIsLoading", false);
};
onMounted(() => {
  document.title = "Search | Djackets";
  let uri = window.location.search.substring(1);
  let params = new URLSearchParams(uri);
  if (params.get("query")) {
    query.value = params.get("query");
    performSearch();
  }
});
</script>
<template>
  <div class="page-search">
    <div class="columns is-multiline">
      <div class="column is-12">
        <h2 class="is-size has-text-grey">Search term: "{{ query }}"</h2>
      </div>
      <ProductBox
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>
