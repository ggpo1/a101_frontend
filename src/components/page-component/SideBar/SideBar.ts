import { Component, Prop, Vue } from 'vue-property-decorator';
import ISideBarSource from '@/Models/Form/ISideBarSource';
import router from '@/router';

@Component({ components: {  } })
export default class SideBar extends Vue {
    @Prop() public source!: ISideBarSource[];

    /**
     * exitAction
     */
    public exitAction() {
        localStorage.removeItem('user_auth_status');
        localStorage.removeItem('user');
        document.location.reload();
    }
}