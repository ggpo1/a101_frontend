import { Component, Prop, Vue } from 'vue-property-decorator';
import router from '@/router';
import FormTypeClass from '@/Models/FormTypeClass';

@Component({ components: {  } })
export default class Card extends Vue {
@Prop() public CardSource!: Array<FormTypeClass>;

}