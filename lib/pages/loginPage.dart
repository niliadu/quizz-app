import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';

import 'resetPasswordPage.dart';
import 'signUpPage.dart';
import 'verifyEmailPage.dart';

class LoginPage extends StatefulWidget {
  @override
  _LoginPageState createState() => new _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  String _email, _password;
  bool _showErrorMessage = false;
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();

  void signIn() async {
    setState(() {
      _showErrorMessage = false;
    });

    final formState = _formKey.currentState;
    if (formState.validate()) {
      formState.save();

      FirebaseAuth.instance
          .signInWithEmailAndPassword(email: _email, password: _password)
          .then((result) {
        Navigator.of(context).pop();
        Navigator.pushReplacement(
          context,
          MaterialPageRoute(
              builder: (context) => VerifyEmail(user: result.user)),
        );
      }).catchError((e) {
        if (e.code == "ERROR_USER_NOT_FOUND" ||
            e.code == "ERROR_WRONG_PASSWORD") {
          setState(() {
            _showErrorMessage = true;
          });
        }
      });
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
                    onChanged: (value) => setState(() {
                      _showErrorMessage = false;
                    }),
                  ),
                  TextFormField(
                    decoration: InputDecoration(labelText: "Senha"),
                    validator: (value) {
                      if (value.isEmpty) return "Senha não poe ficar em branco";
                      if (value.length < 6) {
                        return "Senha precisa ter pelo menos 6 caracteres";
                      }
                      return null;
                    },
                    onSaved: (value) => _password = value,
                    obscureText: true,
                    onChanged: (value) => setState(() {
                      _showErrorMessage = false;
                    }),
                  ),
                  Visibility(
                    visible: _showErrorMessage,
                    child: Text("Usuário ou Senha incorretos"),
                  ),
                  RaisedButton(
                    child: Text("ENTRAR"),
                    onPressed: signIn,
                  ),
                  RaisedButton(
                    child: Text("Criar Conta"),
                    onPressed: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) => SignUp(),
                          fullscreenDialog: true,
                        ),
                      );
                    },
                  ),
                  RaisedButton(
                    child: Text("Esqueci minha Senha"),
                    onPressed: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) => ResetPassword(),
                          fullscreenDialog: true,
                        ),
                      );
                    },
                  )
                ]),
          ),
        ),
      ),
    );
  }
}
