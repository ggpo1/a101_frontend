import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({ components: {  } })
export default class SelectBox extends Vue {
    @Prop() public name!: string;
    @Prop() public selectOptions!: { id: number, title: string };
    @Prop() public value!: any;
}