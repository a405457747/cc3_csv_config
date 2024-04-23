import { _decorator, Component, Node } from 'cc';
import { ConfigMgr } from '../../ConfigMgr/ConfigMgr';
const { ccclass, property } = _decorator;


@ccclass('TestConfigMgr')
export class TestConfigMgr extends Component {
    start() {

        ConfigMgr.Inst.test();

    }

    update(deltaTime: number) {
        
    }
}


