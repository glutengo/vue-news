import { ICategory } from '@/shared/model/category.model';
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class CategoryItem extends Vue {
  @Prop({default: {}})
  public readonly category: ICategory;
}
