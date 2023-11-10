<script setup>
import { useStore } from "vuex";
const store = useStore();
const { item } = defineProps(["item"]);
const emit = defineEmits(["removeFromCart"]);
const getItemTotal = (item) => {
  return item.quantity * item.product.price;
};
const decrementQuantity = (item) => {
  item.quantity -= 1;
  updateCart();
};
const incrementQuantity = (item) => {
  item.quantity += 1;
  if (item.quantity === 0) {
    emit("removeFromCart", item);
    updateCart();
  }
};
const updateCart = () => {
  localStorage.setItem("cart", JSON.stringify(store.state.cart));
};
const removeFromCart = (item) => {
  emit("removeFromCart", item);
  updateCart();
};
</script>
<template>
  <tr>
    <td>
      <router-link :to="item.product.get_absolute_url">{{
        item.product.name
      }}</router-link>
    </td>
    <td>{{ item.product.price }}</td>
    <td>
      {{ item.quantity }}
      <a @click="decrementQuantity(item)">-</a>
      <a @click="incrementQuantity(item)">+ </a>
    </td>
    <td>${{ getItemTotal(item).toFixed(2) }}</td>
    <td><button class="delete" @click="removeFromCart(item)"></button></td>
  </tr>
</template>
