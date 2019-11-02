import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';

import 'homePage.dart';

class LoginPage extends StatefulWidget {
  @override
  _LoginPageState createState() => new _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  String _email, _password;
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();

  Future<void> signIn() async {
    final formState = _formKey.currentState;
    if (formState.validate()) {
      formState.save();

        FirebaseAuth.instance
            .signInWithEmailAndPassword(email: _email, password: _password)
            .then((user) {
          Navigator.push(
              context, MaterialPageRoute(builder: (context) => Home()));
        }).catchError((e) => print(e.toString()));
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: Form(
            key: _formKey,
            child: SafeArea(
                child: Center(
                    child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: <Widget>[
                  TextFormField(
                    decoration: InputDecoration(labelText: "Email"),
                    validator: (value) {
                      if (value.isEmpty)
                        return "Email não pode ficar em branco";
                    },
                    onSaved: (value) => _email = value,
                  ),
                  TextFormField(
                    decoration: InputDecoration(labelText: "Senha"),
                    validator: (value) {
                      if (value.isEmpty) return "Senha não poe ficar em branco";
                      if (value.length < 6) {
                        return "Senha precisa ter pelo menos 6 caracteres";
                      }
                    },
                    onSaved: (value) => _password = value,
                    obscureText: true,
                  ),
                  RaisedButton(
                    child: Text("ENTRAR"),
                    onPressed: signIn,
                  )
                ])))));
  }
}
