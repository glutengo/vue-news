import Component from 'vue-class-component';
import { Inject, Vue } from 'vue-property-decorator';
import PostService from '@/entities/post/post.service';
import { IPost } from '@/shared/model/post.model';
import CategoryService from '@/entities/category/category.service';
import { ICategory } from '@/shared/model/category.model';

@Component
export default class Home extends Vue {
  @Inject('postService')
  private postService: () => PostService;

  @Inject('categoryService')
  private categoryService: () => CategoryService;

  public posts: IPost[] = [];
  public categories: ICategory[] = [];

  public mounted() {
    this.postService()
      .retrieve({size: 5})
      .then(res => this.posts = res.data);

    this.categoryService()
      .retrieve({includePosts: 5})
      .then(res => this.categories = res.data);
  }

}
