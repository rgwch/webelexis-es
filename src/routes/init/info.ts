/************************************************************
 * This file is part of Webelexis(tm)
 * Copyright (c) 2018 by G. Weirich
 * 
 * Webelexis is licensed under the terms of the included
 * LICENSE file.
 *************************************************************/

import {Config,AppData} from '../../config'
import { autoinject } from 'aurelia-framework';
import {FhirService} from '../../services/fhirservice'

@autoinject
export class Info{
    private server={}
    private open=-1
    constructor(private cfg:Config,private fs:FhirService){}

    activate(){
        console.log("Info")
        const appdata:AppData=this.cfg.loadStore()
        return this.fs.metadata(appdata.server_url).then(meta=>{
            this.server=meta; 
        })
       }

    show(index){
      this.open=index;
    
    }   

    detail(res){
      let ret= JSON.stringify(res,null,2)
      return ret;
    }
}