import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import MenuBar from './components/page-component/MenuBar';
import router from '@/router';


@Component({ components: { MenuBar } })
export default class App extends Vue {

}
