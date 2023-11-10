<script setup>
import { RouterLink, RouterView } from "vue-router";
import { ref, onBeforeMount, computed, onMounted } from "vue";
import { useStore } from "vuex";
import axios from "axios";
const cart = ref({
  items: [],
});
const showMobileMenu = ref(false);
const store = useStore();
onBeforeMount(() => {
  store.commit("initializeStore");
  const token = store.state.token;
  if (token) {
    axios.defaults.headers.common["Authorization"] = "Token " + token;
  } else {
    axios.defaults.headers.common["Authorization"] = "";
  }
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
</script>

<template>
  <div id="wrapper">
    <nav class="navbar is-dark">
      <div class="navbar-brand">
        <router-link to="/" class="navbar-item"
          ><strong>Djackets</strong></router-link
        ><a
          class="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbar-menu"
          href=""
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div
        class="navbar-menu"
        id="navbar-menu"
        :class="{ 'is-active': showMobileMenu }"
      >
        <div class="navbar-start">
          <div class="navbar-item">
            <form action="/search" method="get">
              <div class="field has-addons">
                <div class="control">
                  <input
                    type="text"
                    class="input"
                    placeholder="what are you looking for?"
                    name="query"
                  />
                </div>
                <div class="control">
                  <button class="button is-success">
                    <span class="icon">
                      <i class="fas fa-search"></i>
                    </span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div class="navbar-end">
          <router-link to="/summer" class="navbar-item">Summer</router-link>
          <router-link to="/winter" class="navbar-item">Winter</router-link>
          <div class="navbar-item">
            <div class="buttons">
              <template v-if="$store.state.isAuthenticated">
                <router-link to="/my-account" class="button is-light"
                  >My account</router-link
                >
              </template>

              <template v-else>
                <router-link to="/log-in" class="button is-light"
                  >Log in</router-link
                >
              </template>
              <router-link to="/cart" class="button is-success">
                <span class="icon">
                  <i class="fas fa-shopping-cart"></i>
                </span>
                <span>Cart {{ cartTotalLength }}</span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <div
      class="is-loading-bar has-text-centered"
      :class="{ 'is-loading': store.state.isLoading }"
    >
      <div class="lds-dual-ring"></div>
    </div>
    <section class="section">
      <router-view></router-view>
    </section>
    <footer>
      <p class="has-text-centered">Copyright (c) 2021</p>
    </footer>
  </div>
</template>

<style>
@import "../node_modules/bulma/css/bulma.css";
i {
  font-family: "Font Awesome 5 Free";
}
.image {
  margin-top: -1.25rem;
  margin-left: -1.25rem;
  margin-right: -1.25rem;
}
.lds-dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid #ccc;
  border-color: #ccc transparent #ccc transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.is-loading-bar {
  height: 0;
  overflow: hidden;

  -webkit-transition: all 0.3s;
  transition: all 0.3s;

  &.is-loading {
    height: 80px;
  }
}
</style>
