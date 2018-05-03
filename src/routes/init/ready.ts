import { autoinject, noView } from 'aurelia-framework'
import { FhirService } from '../../services/fhirservice'
import { Session,User } from '../../services/session'
import { Router } from 'aurelia-router';

@autoinject
@noView
export class Ready {
  private loggedin = "no";

  constructor(private fhir: FhirService, private session:Session, private router:Router ) { }

  async activate(): Promise<any> {
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