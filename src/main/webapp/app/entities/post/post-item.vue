<template>
  <div class="post-item">
    <img class="post-item-image" :src="post.coverImageUrl"/>
    <div class="post-data">
      <h4 class="post-item-title"><router-link :to="{ name: 'PostView', params: { postId: post.id }}">{{post.title}}</router-link></h4>
      <span class="post-item-category" v-if="post.author">published by {{post.author.login}}</span>
      <span class="post-item-category" v-if="post.category">in <i>{{post.category.name}}</i></span>
      <p class="post-item-excerpt">{{post.excerpt}}...</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .post-item {
    display: block;
    border-radius: 8px;
    box-shadow: 0 3px 8px 2px rgba(0, 0, 0, 0.1);
    overflow: hidden;

    img {
      height: 200px;
      width: 100%;
      object-fit: cover;
      object-position: center;
    }

    .post-data {
      padding: 8px;

      span {
        opacity: .7;
      }
    }

  }
</style>

<script lang="ts" src="./post-item.component.ts"></script>
