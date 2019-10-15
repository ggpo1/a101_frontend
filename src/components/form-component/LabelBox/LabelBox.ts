import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({ components: {  } })
export default class LabelBox extends Vue {
    @Prop() public title?: string;
}
