<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <div>
    <div mb-5>
      <p text-xl mb-2>
        Webshop Admin
      </p>
    </div>

    <router-link to="/admin/products" btn>
      {{ t('login') }}
    </router-link>
  </div>
</template>

<route lang="yaml">
meta:
  layout: admin
</route>
