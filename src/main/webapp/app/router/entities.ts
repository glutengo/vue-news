import { Authority } from '@/shared/security/authority';
/* tslint:disable */
// prettier-ignore

// prettier-ignore
const Post = () => import('@/entities/post/post.vue');
// prettier-ignore
const PostUpdate = () => import('@/entities/post/post-update.vue');
// prettier-ignore
const PostDetails = () => import('@/entities/post/post-details.vue');
// prettier-ignore
const Category = () => import('@/entities/category/category.vue');
// prettier-ignore
const CategoryUpdate = () => import('@/entities/category/category-update.vue');
// prettier-ignore
const CategoryDetails = () => import('@/entities/category/category-details.vue');
// jhipster-needle-add-entity-to-router-import - JHipster will import entities to the router here

export default [
  {
    path: '/post',
    name: 'Post',
    component: Post,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/post/new',
    name: 'PostCreate',
    component: PostUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/post/:postId/edit',
    name: 'PostEdit',
    component: PostUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/post/:postId/view',
    name: 'PostView',
    component: PostDetails
  },
  {
    path: '/category',
    name: 'Category',
    component: Category,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/category/new',
    name: 'CategoryCreate',
    component: CategoryUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/category/:categoryId/edit',
    name: 'CategoryEdit',
    component: CategoryUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/category/:categoryId/view',
    name: 'CategoryView',
    component: CategoryDetails
  },
  // jhipster-needle-add-entity-to-router - JHipster will add entities to the router here
];
