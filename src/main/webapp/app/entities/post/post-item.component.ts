import { IPost } from '@/shared/model/post.model'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class PostItem extends Vue {
  @Prop({default: {}})
  public readonly post: IPost;
}
