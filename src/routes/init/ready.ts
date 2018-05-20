/************************************************************
 * This file is part of Webelexis(tm)
 * Copyright (c) 2018 by G. Weirich
 * 
 * Webelexis is licensed under the terms of the included
 * LICENSE file.
 *************************************************************/
import { autoinject, noView } from 'aurelia-framework'
import { FhirService } from '../../services/fhirservice'
import { Session,User } from '../../services/session'
import { Router } from 'aurelia-router';

@autoinject
@noView
export class Ready {
  private loggedin = "no";

  constructor(private fhir: FhirService, private session:Session, private router:Router ) { 
    console.log("auth/ready consttructed")
  }

  async activate(): Promise<any> {
    console.log("auth activated")
    try {
      let result = await this.fhir.getSmartclient();
      this.session.login(new User("Testuser",["user"]),result)
      this.router.navigate("patient")      
      window.location.reload()

    } catch (err) {
      alert("Login failed")

    }
  }
}