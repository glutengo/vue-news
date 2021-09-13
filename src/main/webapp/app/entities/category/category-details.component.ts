import { Component, Vue, Inject } from 'vue-property-decorator';

import { ICategory } from '@/shared/model/category.model';
import CategoryService from './category.service';
import PostService from '../post/post.service';
import { IPost } from '@/shared/model/post.model';

@Component
export default class CategoryDetails extends Vue {
  @Inject('categoryService') private categoryService: () => CategoryService;
  @Inject('postService') private postService: () => PostService;
  public category: ICategory = {};
  public posts: IPost[] = [];

  public itemsPerPage = 24;
  public page = 1;
  public previousPage = 1;
  public totalItems = 0;

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.categoryId) {
        vm.retrieveCategory(to.params.categoryId);
        vm.retrievePosts(to.params.categoryId);
      }
    });
  }

  public retrieveCategory(categoryId) {
    this.categoryService()
      .find(categoryId)
      .then(res => {
        this.category = res;
      });
  }

  public retrievePosts(categoryId) {
    this.postService()
      .retrieve({page: this.page - 1, size: this.itemsPerPage, category: categoryId})
      .then(res => {
        this.posts = res.data;
        this.totalItems = Number(res.headers['x-total-count']);
      });
  }

  public loadPage(page: number): void {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.retrievePosts(this.category.id);
    }
  }

  public previousState() {
    this.$router.go(-1);
  }
}
