import {Session} from '../../services/session'
import { autoinject } from 'aurelia-framework';
import {Validator} from '../../services/validator'
import { FhirBundle } from '../../models/fhir';
import { Patient, PatientFactory} from '../../models/patient'

@autoinject
export class Search{
    searchexpr="";
    searchterm="Name oder Vorname"
    patients=[]
    actPatient:Patient;

    constructor(private pf:PatientFactory, private session:Session){
        
    }
    doSearch(){
        console.log("looking for "+this.searchexpr)
        this.session.getSmartClient().api.search({type: "Patient", query: {name: this.searchexpr}}).then(results=>{
            let result=Validator.checkFHIRBundle(results.data as FhirBundle, this.pf)
            this.patients=result.values
        })
    }

    selectPatient(index:number){
        this.actPatient=this.patients[index]
    }

}