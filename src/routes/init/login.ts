import { autoinject } from 'aurelia-framework'
import { FhirService } from '../../services/fhirservice'
import { DialogService } from "aurelia-dialog";
import { Config, STORAGE, AppData } from '../../config';


@autoinject
export class Login {

  constructor(private fhir: FhirService, private dialog: DialogService, private cfg: Config) { }

  async login() {
    console.log("login");
    let appdata:AppData=this.cfg.loadStore()
    this.checkServer(appdata).then(valid => {
      if (valid) {
        //console.log(this.cfg.globals.server)
        this.fhir.init(appdata.server_url)
      } else {
        this.dialog.open({ viewModel: "dialogs/select_server", model: { url: appdata ? appdata.server_url || "" : ""} }).whenClosed(async response => {
          if (response.wasCancelled) {
            alert("Keine Server Verbindung")
            this.cfg.removeString("server_url")
            delete this.cfg.prefs["server_url"]
            return;
          } else {
            this.cfg.setString("server_url",response.output)
            this.login();
          }
        })
      }
    })

  }

  async checkServer(sp:AppData): Promise<boolean> {
    
    if (!sp || !sp.server_url || !/^https?:\/\/.+/.test(sp.server_url)) {
      return false;
    }
    try {
      let metadata = await this.fhir.metadata(sp.server_url);
      if (metadata) {
        this.cfg.globals.server = metadata
        return true
      }
    } catch (err) {
      return false;
    }
  }
}