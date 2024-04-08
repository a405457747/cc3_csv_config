import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Bk')
export class Bk extends Component {


    @property
    speed:number=1;

    start() {

    }

    update(deltaTime: number) {
        let node =this.node;
        let offsetX =this.speed*deltaTime;
        node.setPosition(node.position.x + offsetX, node.position.y + offsetX);
    }

    static add(a:number,b:number){
        return a+b;
    }


    go(a:number[],b:number){
        for(let i in a){
            if(b===a[i]){
                return i;
            }
        }
        return -1;
    }

}


