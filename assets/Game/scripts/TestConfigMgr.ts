import { _decorator, Component, JsonAsset, Node, resources, Sprite ,assetManager} from 'cc';
import { ConfigMgr } from '../../ConfigMgr/ConfigMgr';
const { ccclass, property } = _decorator;


@ccclass('TestConfigMgr')
export class TestConfigMgr extends Component {

    cache:{ [key: string]: any }={}
    start() {
        console.log("cdk");

        /*
        resources.load("config/main",JsonAsset,(e,a)=>{
            if(e) return;
            this.cache["config/main"]=a.json;

            console.log(a.json);
        })

        this.cache["dk"]=this.node.getComponent(Sprite);
        console.log(this.cache["dk"]);
        */

        /*
        assetManager.loadAny("config/main",JsonAsset,(e,a)=>{
            console.log(a.json);
        })
        */

        // 执行异步操作
this.performAsyncOperations();

    }

    update(deltaTime: number) {
        console.log(this.cache["config/main"]);
    }

// 假设这是第一个异步操作
 asyncOperation1(): Promise<string> {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve("Async operation 1 completed.");
        }, 2000); // 模拟异步操作，这里设置为 2 秒
    });
}

// 假设这是第二个异步操作
 asyncOperation2(): Promise<string> {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve("Async operation 2 completed.");
        }, 3000); // 模拟异步操作，这里设置为 3 秒
    });
}

// 使用 Promise.all 包装异步操作
async  performAsyncOperations() {
    try {
        // 使用 Promise.all 等待所有异步操作完成
        const results = await Promise.all([this.asyncOperation1(), this.asyncOperation2()]);
        
        // 所有异步操作完成后执行下一步操作
        console.log("All async operations completed.");
        console.log("Results:", results);
    } catch (error) {
        // 处理错误
        console.error("Error:", error);
    }
}



    
    
}


