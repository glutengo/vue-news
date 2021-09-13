<template>
  <div class="row justify-content-center">
    <div class="col-md-12 d-flex align-items-center flex-column" v-if="post">
      <button type="submit" v-on:click.prevent="previousState()" class="btn mr-2 align-self-start" data-cy="entityDetailsBackButton">
        <font-awesome-icon icon="arrow-left"></font-awesome-icon>
      </button>
      <h2 class="display-4 text-center my-4">{{post.title}}</h2>
      <div class="row align-self-stretch">
        <img class="mt-4" width="100%" height="400px" :src="post.coverImageUrl">
      </div>
      <div class="post-detail-meta my-4 text-center">
        <span class="post-item-author" v-if="post.author">published by <i>{{post.author.login}}</i></span>
        <span class="post-item-category" v-if="post.category">in <i>{{post.category.name}}</i></span>
      </div>
      <div class="post-detail-content text-justify col-md-8" v-text="post.content"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  img {
    object-fit: cover;
    object-position: center;
  }

  .post-detail-content {
    line-height: 1.8em;
    white-space: pre-line;
  }
</style>

<script lang="ts" src="./post-details.component.ts"></script>
