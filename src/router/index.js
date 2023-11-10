import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ProductView from "../views/Product.vue";
import CategoryView from "../views/Category.vue";
import SearchView from "../views/Search.vue";
import CartView from "../views/Cart.vue";
import SignupView from "../views/Signup.vue";
import LoginView from "../views/Login.vue";
import MyAccountView from "../views/MyAccount.vue";
import CheckoutView from "../views/Checkout.vue";
import SuccessView from "../views/Success.vue";
import store from "../store";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about/",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/:category_slug/:product_slug",
      name: "product",
      component: ProductView,
    },
    {
      path: "/:category_slug/",
      name: "category",
      component: CategoryView,
    },
    {
      path: "/search",
      name: "search",
      component: SearchView,
    },
    {
      path: "/log-in",
      name: "LogIn",
      component: LoginView,
    },
    {
      path: "/my-account",
      name: "MyAccount",
      component: MyAccountView,
      meta: {
        requireLogin: true,
      },
    },
    {
      path: "/sign-up",
      name: "signup",
      component: SignupView,
    },
    {
      path: "/cart",
      name: "cart",
      component: CartView,
    },
    {
      path: "/cart/checkout",
      name: "checkout",
      component: CheckoutView,
      meta: {
        requireLogin: true,
      },
    },
    {
      path: "/cart/success",
      name: "success",
      component: SuccessView,
      meta: {
        requireLogin: true,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (
    to.matched.some(
      (record) => record.meta.requireLogin && !store.state.isAuthenticated
    )
  ) {
    next({ name: "LogIn", query: { to: to.path } });
  } else {
    next();
  }
});
export default router;
