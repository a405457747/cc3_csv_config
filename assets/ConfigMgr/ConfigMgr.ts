import { _decorator, Component, Node, find,JsonAsset, resources, sys } from 'cc';
const { ccclass, property,executionOrder } = _decorator;


@ccclass('ConfigMgr')
@executionOrder(-1)
export class ConfigMgr extends Component {

    private static inst: ConfigMgr | null = null;

    static get Inst() {
        /*
        if (ConfigMgr.inst === null) {
            let n = new Node("ConfigMgr");
            let i = n.addComponent(ConfigMgr);
            find("Canvas")?.addChild(n);
            ConfigMgr.inst = i;
        }
        */

        return ConfigMgr.inst;
    }
    protected onLoad(): void {
        ConfigMgr.inst=this;
    }

    loadUserConfig(key:string,obj={}){
       let str= sys.localStorage.getItem(key);
       if(str==null){
            return obj;
       }else {
             return JSON.parse(str);
       }
    }

    saveUserConfig(key:string,obj){
        sys.localStorage.setItem(key,JSON.stringify(obj));
    }

    removeUserConfig(key:string){
        sys.localStorage.removeItem(key)
    }

    test(){

        /*
        let obj=ConfigMgr.Inst.loadUserConfig("nihao",{a:3});
        obj.a+=1;
        ConfigMgr.Inst.saveUserConfig("nihao",obj);
        console.log(obj);
        */

        this.getData("config/main",(d:any)=>{   
            console.log("d",d);
        });
    }

    getJson(filePath:string,func:Function){
        resources.load(filePath,JsonAsset,(err,data)=>{
            if(err) return;
            let res =data.json;
            func(res);
        })
    }

    getDatas(filePath:string,func:Function) {
        this.getJson(filePath,(js:any)=>{
            func(js.datas);
        });
    }

    getData(filePath:string,func:Function) {
        this.getDatas(filePath,(d:any)=>{
            func(d[0]);
        });
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

}


