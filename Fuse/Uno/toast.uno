using Fuse;
using Fuse.Scripting;
using Fuse.Reactive;
using Uno.UX;
using Uno;

[UXGlobalModule]
public class toast : NativeEventEmitterModule
{
    static readonly toast _instance;


    public toast()
    : base(true, "show")
    {
        // Make sure we're only initializing the module once
        if (_instance != null) return;

        _instance = this;
        Uno.UX.Resource.SetGlobalKey(_instance, "toast");
        AddMember(new NativeFunction("show", (NativeCallback)show));
    }

    object show(Context c, object[] args){
    	
        var a = c.NewArray(args);
		Emit("show", a);
    	return null;
    }
}