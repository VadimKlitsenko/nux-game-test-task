<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'

import { RouteNames } from '@/consts/router'
import { useUserStore } from '@/stores/userStore'

import UiInput from '@/components/ui/UiInput.vue'
import UiButton from '@/components/ui/UiButton.vue'

const router = useRouter()
const userStore = useUserStore()
const {
  userFilters,
  areUsersLoading
} = storeToRefs(userStore)

const isLoginError = ref<boolean>(false)

const enableToSubmit = computed<boolean>(() => {
  return !!userFilters.value.name && !!userFilters.value.phone
})

const login = async (): Promise<void> => {
  if (areUsersLoading.value || !enableToSubmit.value) return

  const loggedIn: boolean = await userStore.login()

  if (loggedIn) {
    userStore.clearUserFilters()
    void router.push({ name: RouteNames.INDEX })
  } else {
    isLoginError.value = !loggedIn
  }
}

</script>

<template>
  <form
    class="login-form"
    @focusin="isLoginError = false"
    @submit.prevent="login"
  >
    <h2 class="login-form__title">description</h2>

    <fieldset class="login-form__fieldset">
      <legend class="login-form__legend">description</legend>

      <UiInput
        v-model.letters="userFilters.name"
        :disable="areUsersLoading"
        placeholder="Username"
        class="login-form__input"
      />

      <UiInput
        v-model.phone="userFilters.phone"
        :disabled="areUsersLoading"
        placeholder="Phone Number"
        class="login-form__input"
      />

      <UiButton
        :disabled="areUsersLoading || !enableToSubmit"
        type="submit"
        class="login-form__submit"
      >
        Register
      </UiButton>

      <div
        v-show="isLoginError"
        class="login-form__error"
      >
        login error
      </div>
    </fieldset>
  </form>
</template>

<style scoped lang="scss">
@import "@/assets/styles/variables";

.login-form {
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  background-color: $color-grey-06;
  width: 447px;
  overflow: hidden;

  &__title {
    padding: 15px;
    background-color: $color-grey-05;
    color: $color-grey-04;
    font-size: 17px;
    font-weight: 400;
    text-align: center;
  }

  &__fieldset {
    margin: 15px 25px 30px;
  }

  &__legend {
    margin-bottom: 14px;
    color: $color-grey-04;
    font-size: 15px;
  }

  &__input {
    margin-bottom: 20px;
  }

  &__submit {
    margin-top: 5px;
  }

  &__error {
    margin-top: 10px;
    color: $color-red-01;
  }
}
</style>