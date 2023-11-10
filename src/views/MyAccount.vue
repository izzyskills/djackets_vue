<script setup>
import axios from "axios";
import { useStore } from "vuex";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import OrderSummary from "../components/OrderSummary.vue";
const store = useStore();
const router = useRouter();
const orders = ref([]);
const logout = () => {
  axios.defaults.headers.common["Authorization"] = "";
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  localStorage.removeItem("userid");

  store.commit("removeToken");
  router.push("/");
};
onMounted(() => {
  getMyOrders();
});
const getMyOrders = async () => {
  store.commit("setIsLoading", true);

  await axios
    .get("/api/v1/orders/")
    .then((response) => {
      orders.value = response.data;
    })
    .catch((error) => {
      console.log(error);
    });

  store.commit("setIsLoading", false);
};
</script>
<template>
  <div class="page-my-account">
    <div class="columns is-multiline">
      <div class="column is-12">
        <h1 class="title">My account</h1>
      </div>
      <div class="column is-12">
        <button @click="logout()" class="button is-danger">Log Out</button>
      </div>
    </div>
    <hr />

    <div class="column is-12">
      <h2 class="subtitle">My orders</h2>

      <OrderSummary v-for="order in orders" :key="order.id" :order="order" />
    </div>
  </div>
</template>
