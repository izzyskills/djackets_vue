<script setup>
import axios from "axios";
import { toast } from "bulma-toast";
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const submitForm = () => {
  errors.value = [];
  if (username.value === "") {
    errors.value.push("The username is missing");
  }
  if (password.value.length <= 8) {
    errors.value.push("The Password is too short (minimum 8 words)");
  }
  if (password.value !== password2.value) {
    errors.value.push("The passwords doesn't match");
  }
  if (!errors.value.length) {
    const formData = {
      username: username.value,
      password: password.value,
    };

    axios
      .post("/api/v1/users/", formData)
      .then((response) => {
        toast({
          message: "Account created, please log in!",
          type: "is-success",
          dismissible: true,
          pauseOnHover: true,
          duration: 2000,
          position: "bottom-right",
        });
        router.push("/log-in");
      })
      .catch((error) => {
        if (error.response) {
          for (const property in error.response.data) {
            errors.value.push(`${property}: ${error.response.data[property]}`);
          }
          console.log(JSON.stringify(error.response.data));
        } else if (error.message) {
          errors.value.push("something went wrong. Please try again");
          console.log(JSON.stringify(error));
        }
      });
  }
};
const username = ref("");
const password = ref("");
const password2 = ref("");
const errors = ref([]);
</script>
<template>
  <div class="page-sign-up">
    <div class="column is-4 is-offset-4">
      <h2 class="title">Sign up</h2>
      <form @submit.prevent="submitForm">
        <div class="field">
          <label for="">Username</label>
          <div class="control">
            <input type="text" class="input" v-model="username" />
          </div>
        </div>
        <div class="field">
          <label for="">password</label>
          <div class="control">
            <input type="password" class="input" v-model="password" />
          </div>
        </div>
        <div class="field">
          <label for="">confirm password</label>
          <div class="control">
            <input type="password" class="input" v-model="password2" />
          </div>
        </div>
        <div class="notification is-danger" v-if="errors.length">
          <p v-for="error in errors" :key="error">{{ error }}</p>
        </div>
        <div class="field">
          <div class="control">
            <button type="submit" class="button is-dark">Sign Up</button>
          </div>

          <hr />
          Or <router-link to="/login">Click here</router-link> to log in!
        </div>
      </form>
    </div>
  </div>
</template>
