import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Bk')
export class Bk extends Component {
    start() {

    }

    update(deltaTime: number) {
        
    }

    static add(a,b){
        return a+b;
    }
}


