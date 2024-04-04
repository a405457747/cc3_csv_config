import { _decorator, Component, Node, TextAsset } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ConfigFile')
export class ConfigFile extends Component {

    @property(TextAsset)
    csvText:TextAsset=null;

    start() {
       let dataObj=  this.csvTojson(this.csvText.text);
       console.log(dataObj.data,dataObj.datas);
    }

    csvTojson(data:string){
        const csvLines: string[] = data.split(/\r\n|\n|\r/);
        let csvFixedLines=[];
        for(let i=0;i<csvLines.length;i++){
            let item =csvLines[i].split(",");
            for(let j =0;j<item.length;j++){
                item[j] =item[j].trim();
            }
            csvFixedLines[i]=item;
        }

        let keys =csvFixedLines[0];

        let res={datas:[],data:null};

        for(let i =1;i<csvFixedLines.length;i++){
            let csvFixedLines_item  =csvFixedLines[i];
            let jsObj ={};
            //console.log(csvFixedLines[i]);

            for(let j =0;j<keys.length;j++){
                let key =keys[j];
                let val =csvFixedLines_item[j];
                jsObj[key]=val;
            }

            res.datas.push(jsObj);
        }

        res.data=res.datas[0];
        return res;
    }

    update(deltaTime: number) {
        
    }
}


