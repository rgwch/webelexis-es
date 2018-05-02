import {Session} from '../services/session'
import { autoinject } from 'aurelia-framework';
/** 
 * Decide whether a route should be displayed in the menu or not.
 * if the Route has an assiciated RoleId: Check, if currentRoles contain this RoleId.
 * If there is no user logged-in, show only routes wizthout RoleId.
*/

@autoinject
export class RouteFilterValueConverter {
   
  constructor(private session:Session){}

    public toView(routes) {
      return routes.filter(route => {
        let authRoleId = route.settings.authRole;
        let currentRoles=this.session.getRoles();
        console.log(currentRoles)
        if (authRoleId) {
          if (currentRoles.length==0) {
            return false;
          }
          return (currentRoles.findIndex((elem:string)=>elem===authRoleId) !=-1);
        }
        let mayDisplay= currentRoles && (currentRoles.length>0);
        console.log("route: "+route.name+" may "+mayDisplay);
        return mayDisplay;
      });
    }
  }
  