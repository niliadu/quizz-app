using Uno;
using Uno.Collections;
using Fuse;
using Fuse.Scripting;
using Uno.UX;

[UXGlobalModule]
public class confirmPopup : NativeEventEmitterModule
{
    static readonly confirmPopup _instance;


    public confirmPopup()
    : base(true, "showConfirm")
    {
        // Make sure we're only initializing the module once
        if (_instance != null) return;

        _instance = this;
        Uno.UX.Resource.SetGlobalKey(_instance, "confirmPopup");
        AddMember(new NativeFunction("show", (NativeCallback)show));
    }

    object show(Context c, object[] args){
        var a = c.NewArray(args);
        Emit("showConfirm", a);
        return null;
    }
}