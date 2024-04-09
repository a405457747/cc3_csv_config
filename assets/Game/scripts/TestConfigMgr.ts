import { _decorator, Component, Node } from 'cc';
import { ConfigMgr } from '../../ConfigMgr/ConfigMgr';
const { ccclass, property } = _decorator;


@ccclass('TestConfigMgr')
export class TestConfigMgr extends Component {
    start() {
        console.log("Start");
        console.log(ConfigMgr.Inst.test());
    }

    update(deltaTime: number) {
        
    }
}


