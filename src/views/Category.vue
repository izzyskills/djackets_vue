<script setup>
import { ref, onMounted, watch } from "vue";
import axios from "axios";
import ProductBox from "../components/ProductBox.vue";
import { toast } from "bulma-toast";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
const route = useRoute();
const store = useStore();
const category = ref({
  products: [],
});
const categorySlug = ref(route.params.category_slug);
const getCategory = async () => {
  store.commit("setIsLoading", true);
  axios
    .get(`api/v1/products/${categorySlug.value}/`)
    .then((response) => {
      category.value = response.data;
      document.title = category.value.name + " | Djackets";
    })
    .catch((error) => {
      console.log(error);
      toast({
        message: "Something went wrong please try again",
        type: "is-danger",
        dismissible: true,
        pauseOnHover: true,
        duration: 2000,
        position: "bottom-right",
      });
    });
  store.commit("setIsLoading", false);
};
watch(route, () => {
  categorySlug.value = route.params.category_slug;
  getCategory();
});
onMounted(() => {
  getCategory();
});
</script>
<template>
  <div class="page-category">
    <div class="columns is-multiline">
      <div class="column is-12">
        <h2 class="is-size-2 has-text-centered">{{ category.name }}</h2>
      </div>
      <ProductBox
        v-for="product in category.products"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>
