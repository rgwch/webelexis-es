import { autoinject } from 'aurelia-framework'
import { FhirService } from '../../services/fhirservice'
import { DialogService } from "aurelia-dialog";
import { Config } from '../../config';

const SERVER_URL = "ch.webelexis.v3.server"

@autoinject
export class Login {

  constructor(private fhir: FhirService, private dialog: DialogService, private cfg: Config) { }

  async login() {
    console.log("login");
    let server = localStorage.getItem(SERVER_URL)
    this.checkServer(server).then(valid => {
      if (valid) {
        console.log(this.cfg.globals.server)
        this.fhir.init(server)
      } else {
        this.dialog.open({ viewModel: "dialogs/select_server", model: { url: server } }).whenClosed(async response => {
          if (response.wasCancelled) {
            alert("Keine Server Verbindung")
            localStorage.removeItem(SERVER_URL)
            return;
          } else {
            server = response.output
            localStorage.setItem(SERVER_URL, server)
            this.login();
          }
        })
      }
    })

  }

  async checkServer(uri: string): Promise<boolean> {
    
    if (!uri || !/^https?:\/\/.+/.test(uri)) {
      return false;
    }
    try {
      let metadata = await this.fhir.metadata(uri);
      if (metadata) {
        this.cfg.globals.server = metadata
        return true
      }
    } catch (err) {
      return false;
    }
  }
}