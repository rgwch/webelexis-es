import {Config} from '../../config'
import { autoinject } from 'aurelia-framework';
import {Validator} from '../../services/validator'
import { FhirBundle } from '../../models/fhir';
import { Patient, PatientFactory} from '../../models/patient'

@autoinject
export class Search{
    searchexpr="";
    patients=[]
    actPatient:Patient;

    constructor(private cfg:Config, private pf:PatientFactory){}
    doSearch(){
        console.log("looking for "+this.searchexpr)
        this.cfg.globals.smart.api.search({type: "Patient", query: {name: this.searchexpr}}).then(results=>{
            let result=Validator.checkFHIRBundle(results.data as FhirBundle, this.pf)
            this.patients=result.values
        })
    }

    selectPatient(index:number){
        this.actPatient=this.patients[index]
    }

}