import {Router, RouterConfiguration,Redirect, Next, NavigationInstruction} from 'aurelia-router'
import {Session,User} from './services/session'
import 'bootstrap'
import { autoinject } from 'aurelia-framework';

export class App {
  public router:Router;

  public configureRouter(config:RouterConfiguration, router: Router){
    this.router=router
    config.addAuthorizeStep(AuthorizeStep)
    config.map([
      {
        route: ["","login"],
        name: "login",
        moduleId: 'routes/init/login',
        title: "Log in",
        nav: false
      },{
        route: "auth",
        moduleId: "routes/init/ready",
        name:"auth",
        title: "Ready"
      },{
        route:"patient",
        moduleId: "routes/patients/search",
        name: "patients",
        title: "Patienten",
        nav: true,
        settings: {authRole:"user"}
      },
      {
        route: "info",
        moduleId: "routes/init/info",
        name: "info",
        title: "Info",
        nav: true,
        settings: {authRole:"user"}
      }
    ])
  }
}

@autoinject
class AuthorizeStep{
 
  constructor(private session:Session){}
  run(navigationInstruction: NavigationInstruction, next:Next): Promise<any>{
    console.log(navigationInstruction.config.name)
    if(navigationInstruction.config.name === 'login'){
      return next();
    }
    let mustBeAuthorized = navigationInstruction.config.settings ? navigationInstruction.config.settings.auth : null
    if(mustBeAuthorized){
      if(this.session.getSmartClient()){
        console.log("isAuthorized")
        return next()
      }else{
        console.log("not authorized")
        return  next.cancel(new Redirect("login"))
     
      }
    }else{
      console.log("no authentication needed")
      return next() 
      
    }
  }
}