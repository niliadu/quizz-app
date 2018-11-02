using Fuse;
using Fuse.Scripting;
using Fuse.Reactive;
using Uno.UX;

[UXGlobalModule]
public class userState : NativeEventEmitterModule
{
    static readonly userState _instance;


    public userState()
    : base(
        true,
        "userDataChange",
        "isLoggedChange",
        )
    {
        // Make sure we're only initializing the module once
        if (_instance != null) return;

        _instance = this;
        Uno.UX.Resource.SetGlobalKey(_instance, "userState");
        AddMember(new NativeFunction("userData", (NativeCallback)userData));
        AddMember(new NativeFunction("isLogged", (NativeCallback)isLogged));
    }

    Fuse.Scripting.Array _userData;
    bool logged;

    object isLogged(Context c, object[] args){
    	if(args.Length > 0){
    		logged = Marshal.ToType<bool>(args[0]);
    		Emit("isLoggedChange", logged);
    	}
    	return logged;
    }

   object userData(Context c, object[] args){
    	if(args.Length > 0){
    		var a = c.NewArray(args);
    		_userData = a;
    		Emit("userDataChange", _userData[0]);
    	}
    	return _userData[0];
    }    

}