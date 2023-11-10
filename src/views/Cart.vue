<script setup>
import axios from "axios";
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import CartItem from "../components/CartItem.vue";
const store = useStore();
const cart = ref({
  items: [],
});
onMounted(() => {
  cart.value = store.state.cart;
});
const cartTotalLength = computed(() => {
  let totalLength = 0;
  for (let i = 0; i < cart.value.items.length; i++) {
    totalLength += cart.value.items[i].quantity;
  }
  return totalLength;
});
const cartTotalPrice = computed(() => {
  let totalPrice = 0;
  for (let i = 0; i < cart.value.items.length; i++) {
    totalPrice +=
      cart.value.items[i].quantity * cart.value.items[i].product.price;
  }
  return totalPrice;
});
const RemoveFromCart = (item) => {
  cart.value.items = cart.value.items.filter(
    (i) => i.product.id !== item.product.id
  );
};
</script>
<template>
  <div class="page-cart">
    <div class="columns is-multiline">
      <div class="column is-12">
        <h1 class="title">Cart</h1>
      </div>
      <div class="column is-12 box">
        <table class="table is-fullwidth" v-if="cartTotalLength">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <CartItem
              v-for="item in cart.items"
              :key="item.product.id"
              :item="item"
              v-on:RemoveFromCart="RemoveFromCart"
            />
          </tbody>
        </table>
        <p v-else>You don't have any products in your Cart...</p>
        <div class="column is-12 box">
          <h2 class="subtitle">Summary</h2>
          <strong>${{ cartTotalPrice }}</strong
          >,{{ cartTotalLength }} items
          <hr />
          <router-link to="/cart/checkout" class="button is-dark"
            >Proceed to checkout</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>
