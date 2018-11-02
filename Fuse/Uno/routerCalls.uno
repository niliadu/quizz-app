using Fuse;
using Fuse.Scripting;
using Fuse.Reactive;
using Uno.UX;

[UXGlobalModule]
public class routerCalls : NativeEventEmitterModule
{
    static readonly routerCalls _instance;


    public routerCalls()
    : base(
        true,
        "call"
        )
    {
        // Make sure we're only initializing the module once
        if (_instance != null) return;

        _instance = this;
        Uno.UX.Resource.SetGlobalKey(_instance, "routerCalls");
        AddMember(new NativeFunction("send", (NativeCallback)send));
        AddMember(new NativeFunction("setRouter", (NativeCallback)setRouter));
        AddMember(new NativeFunction("getRouter", (NativeCallback)getRouter));
    }

    object send(Context c, object[] args){
        var a = c.NewArray(args);
        Emit("call", a);
        return null;
    }

    object _router = null;
    object setRouter(Context c, object[] args){
        _router  = args[0];
        return null;
    }
    object getRouter(Context c, object[] args){
        return _router;
    }
}