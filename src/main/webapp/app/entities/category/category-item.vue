<template>
  <div class="category-item">
    <h3 class="category-item-name"><router-link :to="{ name: 'CategoryView', params: { categoryId: category.id }}">{{category.name}}</router-link></h3>
    <div class="category-item-posts d-flex py-2">
      <div class="col-lg-4 col-md-6 mb-4 d-flex align-items-stretch flex-shrink-0" v-for="post in category.posts" :key="post.id">
        <post-item :post="post"></post-item>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .category-item {
    display: block;

    .category-item-posts {
      overflow-x: auto;
    }
  }
</style>

<script lang="ts" src="./category-item.component.ts"></script>
