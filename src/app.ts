import {Router, RouterConfiguration,Redirect, Next, NavigationInstruction} from 'aurelia-router'
import {Config} from './config'
import 'bootstrap'
import { autoinject } from 'aurelia-framework';

export class App {
  private router:Router;

  public configureRouter(config:RouterConfiguration, router: Router){
    this.router=router
    config.addAuthorizeStep(AuthorizeStep)
    config.map([
      {
        route: ["","login"],
        name: "login",
        moduleId: 'routes/init/login',
        title: "Log in",
        nav:true
      },{
        route: "auth",
        moduleId: "routes/init/ready",
        name:"auth",
        title: "Ready"
      },{
        route: "info",
        moduleId: "routes/init/info",
        name: "info",
        title: "Info",
        nav: true,
        settings: {auth: true}
      }
    ])
  }
}

@autoinject
class AuthorizeStep{
  constructor(private cfg:Config){}

  run(navigationInstruction: NavigationInstruction, next:Next): Promise<any>{
    console.log(navigationInstruction.config.name)
    if(navigationInstruction.config.name === 'login'){
      return next();
    }
    let mustBeAuthorized = navigationInstruction.config.settings ? navigationInstruction.config.settings.auth : null
    if(mustBeAuthorized){
      if(this.cfg.globals.smart){
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