import {Config,AppData} from '../../config'
import { autoinject } from 'aurelia-framework';
import {FhirService} from '../../services/fhirservice'

@autoinject
export class Info{
    private server={}
    constructor(private cfg:Config,private fs:FhirService){}

    activate(){
        console.log("Info")
        const appdata:AppData=this.cfg.loadStore()
        return this.fs.metadata(appdata.server_url).then(meta=>{
            this.server=meta; 
        })
       }
}