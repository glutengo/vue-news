<template>

  <div class="col-md-10 m-auto">
  <div class="row justify-content-center">
    <h1 class="display-4" v-text="$t('home.title')">Welcome, Java Hipster!</h1>
  </div>
  <div>
    <h2 class="display-5 mb-4" v-text="$t('home.latest')">Latest posts</h2>
    <div class="row px-2 d-flex align-items-stretch">
      <div class="col-lg-4 col-md-6 mb-4 d-flex align-items-stretch" v-for="post in posts" :key="post.id">
        <post-item :post="post"></post-item>
      </div>
    </div>
  </div>
  <hr />
  <div>
    <h2 class="display-5" v-text="$t('home.categories')">Categories</h2>
    <div>
      <category-item v-for="category in categories" :key="category.id" :category="category"></category-item>
    </div>
  </div>
</div>
</template>

<script lang="ts" src="./home.component.ts"></script>
