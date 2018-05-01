export class RouteFilterValueConverter {
    public toView(routes, currentRoles:Array<string>) {
      return routes.filter(route => {
        let authRoleId = route.settings.authRoleId;
        if (authRoleId) {
          if (currentRoles.length==0) {
            return false;
          }
          return (currentRoles.findIndex(authRoleId) !=-1);
        }
        return true;
      });
    }
  }
  