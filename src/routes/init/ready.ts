import { autoinject, noView } from 'aurelia-framework'
import { FhirService } from '../../services/fhirservice'
import { Session,User } from '../../services/session'

@autoinject
export class Ready {
  private loggedin = "no";

  constructor(private fhir: FhirService, private session:Session ) { }

  async activate(): Promise<any> {
    try {
      let result = await this.fhir.getSmartclient();
      return this.session.login(new User("Testuser",["user"]),result)

    } catch (err) {
      alert("Login failed")

    }
  }
}