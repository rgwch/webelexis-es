
export class Session{
    private currentUser: User;
    private loginTime:Date;
    private smart:any;

    constructor(){
        let raw=sessionStorage.getItem('currentUser')
        if(raw){
            this.currentUser=JSON.parse(raw);
            this.login(this.currentUser,null);
        }else{
            this.login(new User("guest",[]),null);
        }
    }
    public login(user:User, smartclient:any):Session{
        this.currentUser=user;
        this.loginTime=new Date();
        this.smart=smartclient;
        sessionStorage.setItem('currentUser',JSON.stringify(user))
        return this;
    }

    public hasRole(role:string):boolean{
        let givenRoles=this.getRoles() || [];
        let isOk=(givenRoles.findIndex((elem:string)=>elem===role) !=-1)
        return isOk
    }
    
    public getRoles():Array<string>{
        return this.currentUser.roles;
    }
    public getSmartClient(){
        return this.smart;
    }
}

export class User{
    constructor(username:string, roles:Array<string>){
        this.username=username;
        this.roles=roles;
    }
    public username:string;
    public roles:Array<string>
}