<template>
  <div class="row justify-content-center">
    <div class="col-md-10 m-auto">
      <div v-if="category">
        <div class="row align-items-center">
          <button type="submit" v-on:click.prevent="previousState()" class="btn mr-2 align-self-start" data-cy="entityDetailsBackButton">
            <font-awesome-icon icon="arrow-left"></font-awesome-icon>
          </button>
          <h2 data-cy="categoryDetailsHeading">{{category.name}}</h2>
        </div>
        <hr />
        <div class="row">
          <div class="col-lg-4 col-md-6 mb-4 d-flex align-items-stretch" v-for="post in posts" :key="post.id">
            <post-item :post="post"></post-item>
          </div>
        </div>
      </div>

      <div v-if="posts && posts.length > 0">
          <div class="row justify-content-center">
            <jhi-item-count :page="page" :total="totalItems" :itemsPerPage="itemsPerPage"></jhi-item-count>
          </div>
          <div class="row justify-content-center">
            <b-pagination
              size="md"
              :total-rows="totalItems"
              v-model="page"
              :per-page="itemsPerPage"
              :change="loadPage(page)"
            ></b-pagination>
          </div>
        </div>
    </div>
  </div>
</template>

<script lang="ts" src="./category-details.component.ts"></script>
