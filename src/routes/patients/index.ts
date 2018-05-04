/************************************************************
 * This file is part of Webelexis(tm)
 * Copyright (c) 2018 by G. Weirich
 * 
 * Webelexis is licensed under the terms of the included
 * LICENSE file.
 *************************************************************/

import {ItemList,ItemListDef,SELECTED} from '../../components/itemlist'
import { autoinject } from 'aurelia-framework';
import { PatientFactory, Patient } from '../../models/patient';
import * as moment from 'moment'
import { I18N } from 'aurelia-i18n';
import { EventAggregator } from 'aurelia-event-aggregator';

@autoinject
export class Index{
    
    plist:ItemListDef={
        fields:[{
            field:"firstName",
            name: this.t.tr("patients.firstname"),
            sorter: (a,b)=>a.firstName[0].localeCompare(b.firstName[0])
        },{
            field:"lastName",
            name: this.t.tr("patients.lastname"),
            sorter: (a,b)=>a.lastName[0].localeCompare(b.lastName[0])
        },{
            field:"birthDate",
            name: this.t.tr("patients.birthdate"),
            sorter: (a,b)=>moment(a.birthDate,this.dateformat).unix()-moment(b.birthDate,this.dateformat).unix()
        }],
        placeholder: this.t.tr("patients.placeholder"),
        factory: this.factory,
        label: (p =>this.getLabel(p)),
        query: (search)=>{return {"name": search}}
    }
    private dateformat="YYYYMMDD"
    private selectedPatient:Patient

    constructor(private factory:PatientFactory, private t:I18N, private ea:EventAggregator){
        this.dateformat=t.tr('adapters.date_format')
        this.ea.subscribe(SELECTED,(element)=>{
            this.selectedPatient=element as Patient
        })
    }

    getLabel(fhir):string{
        let p=fhir as Patient
        return p.lastName+" "+p.firstName+" ("+p.gender+"), "+p.birthDate
    }
}