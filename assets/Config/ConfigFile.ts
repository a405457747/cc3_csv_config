import { _decorator, Component, instantiate, JsonAsset, Node, Prefab, TextAsset } from 'cc';
const { ccclass, property } = _decorator;


@ccclass('ConfigFile')
export class ConfigFile extends Component {

    @property(TextAsset)
    csvText: TextAsset = null;

    @property(Prefab)
    ps: Prefab = null;

    @property(JsonAsset)
    jsonText:JsonAsset=null;

    start() {
        let prety_girl={
            age:33,
            name:"andy"
        }
        let dataObj = this.csvTojson(this.csvText.text);
        // console.log(JSON.parse("22"),JSON.parse("false"));
        console.log(dataObj.data, dataObj.datas);
        console.log("hello world",this.getsum(3,2),prety_girl);
        console.log("nihaoma");
        console.log(this.getJson(this.jsonText));
    }

    getsum(a,b){
        return a+b;
    }

    getJson(data:JsonAsset) {
        let json =data.json;
        json.data=json.datas[0];
        return json;
    }

    //这个方法是初步解析，需要深度解析还需自制呢
    csvTojson(data: string):any {
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

        let res = { datas: [], data: null };

        for (let i = 1; i < csvFixedLines.length; i++) {
            let csvFixedLines_item = csvFixedLines[i];
            let jsObj = {};
            //console.log(csvFixedLines[i]);

            for (let j = 0; j < keys.length; j++) {
                let key = keys[j];
                let val = csvFixedLines_item[j];
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


