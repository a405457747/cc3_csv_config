import { _decorator, assert, Component, instantiate, JsonAsset, Node, Prefab, TextAsset } from 'cc';
const { ccclass, property } = _decorator;


let print = console.log;
import { Bk } from './kk/Bk';
@ccclass('ConfigFile')
export class ConfigFile extends Component {

    @property(TextAsset)
    csvText: TextAsset | null = null;

    @property(Prefab)
    ps: Prefab | null = null;

    @property(JsonAsset)
    jsonText: JsonAsset | null = null;

    @property(Prefab)
    nihao: Prefab | null = null;

    start() {

        let k:{ [key: string]: any } ={
            a:32,
            b:"age",
            d:function(){
                console.log(this.a,this.b);
            }
        }

        k.e="woaini";
        console.log(k.e)
        delete k.e;
        console.log(Object.keys(k).length)
        if(k.b){
            console.log("存在")
        }
        k.b=true;
        console.log(k.b)
    }

    getAdd(a:number,b:number){
        let k =a+b;
        return k;
    }

    getsum(a: number, b: number) {
        return a + b;
    }

    ff(f: any) {
        print(f(6, 6));
    }

    getJson(data: JsonAsset) {
        let json: any = data.json;
        json.data = json.datas[0];
        return json;
    }

    //这个方法是初步解析，需要深度解析还需自制呢
    csvTojson(data: string) {
        const csvLines: string[] = data.split(/\r\n|\n|\r/);
        let csvFixedLines = [];
        for (let i = 0; i < csvLines.length; i++) {
            let item = csvLines[i].split(",");
            for (let j = 0; j < item.length; j++) {
                item[j] = item[j].trim();
            }
            csvFixedLines[i] = item;
        }

        let keys = csvFixedLines[0];

        let res:{ [key: string]: any }  = { datas: [], data: null };

        for (let i = 1; i < csvFixedLines.length; i++) {
            let csvFixedLines_item = csvFixedLines[i];
            let jsObj :{ [key: string]: any }  = {};
            //console.log(csvFixedLines[i]);

            for (let j = 0; j < keys.length; j++) {
                let key:string = keys[j];
                let val:any = csvFixedLines_item[j];
                try {
                    val = JSON.parse(val);
                } catch (error) {
                }
                jsObj[key] = val;
            }

            res.datas.push(jsObj);
        }

        res.data = res.datas[0];
        return res;
    }

    update(deltaTime: number) {
        let newPos = this.node.position.clone();
        newPos.x += 1 * deltaTime;
        this.node.setPosition(newPos);
    }
}


