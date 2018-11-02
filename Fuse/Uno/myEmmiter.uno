using Uno;
using Uno.Collections;
using Fuse;
using Fuse.Scripting;
using Uno.UX;

[UXGlobalModule]
public class myEmitter : NativeEventEmitterModule
{
    static readonly myEmitter _instance;


    public myEmitter()
    : base(true, "Call")
    {
        // Make sure we're only initializing the module once
        if (_instance != null) return;

        _instance = this;
        Uno.UX.Resource.SetGlobalKey(_instance, "myEmitter");
        AddMember(new NativeFunction("call", (NativeCallback)call));
    }

    object call(Context c, object[] args){
        var a = c.NewArray(args);
        Emit("Call", a);
        return null;
    }
}