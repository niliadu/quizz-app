import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';

class ResetPassword extends StatefulWidget {
  @override
  _ResetPasswordState createState() => new _ResetPasswordState();
}

class _ResetPasswordState extends State<ResetPassword> {
  String _email, _message="";
  final _formKey = GlobalKey<FormState>();

  void _sendResetEmail() {
    final formState = _formKey.currentState;
    setState(() {
      _message = "";
    });
    if (formState.validate()) {
      formState.save();
      FirebaseAuth.instance
          .sendPasswordResetEmail(email: _email)
          .then((r) {
            setState(() {
            _message = "Email enviado com sucesso.";
          });
          })
          .catchError((e) {
        print(e);
        if (e.code == "ERROR_USER_NOT_FOUND") {
          setState(() {
            _message = "Este email não está cadastrado.";
          });
        }
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("Redefinir Senha")),
      body: Form(
        key: _formKey,
        child: SafeArea(
          child: Center(
            child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: <Widget>[
                  TextFormField(
                    decoration: InputDecoration(labelText: "Email"),
                    keyboardType: TextInputType.emailAddress,
                    validator: (value) {
                      if (value.isEmpty) {
                        return "Email não pode ficar em branco";
                      }
                      Pattern pattern =
                          r'^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$';
                      RegExp regex = new RegExp(pattern);
                      if (!regex.hasMatch(value))
                        return 'Insira um Email válido';
                      else
                        return null;
                    },
                    onSaved: (value) => _email = value,
                    onChanged: (e) {
                      setState(() {
                        _message = "";
                      });
                    },
                  ),
                  Text(_message),
                  RaisedButton(
                    child: Text("Enviar email de redefinição de senha"),
                    onPressed: _sendResetEmail,
                  ),
                ]),
          ),
        ),
      ),
    );
  }
}
