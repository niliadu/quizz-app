import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';

import 'verifyEmailPage.dart';

class SignUp extends StatefulWidget {
  @override
  _SignUpState createState() => new _SignUpState();
}

class _SignUpState extends State<SignUp> {
  String _name, _email, _password;
  bool _showEmailUsedError = false;
  final _formKey = GlobalKey<FormState>();

  void signup() {
    final formState = _formKey.currentState;
    setState(() {
      _showEmailUsedError = false;
    });
    if (formState.validate()) {
      formState.save();
      FirebaseUser user;
      FirebaseAuth.instance
          .createUserWithEmailAndPassword(email: _email, password: _password)
          .then((result) {
        user = result.user;
        final newUser = new UserUpdateInfo();
        newUser.displayName = _name;
        return user.updateProfile(newUser);
      }).then((result) {
        return user.sendEmailVerification();;
      }).then((result) {
        Navigator.of(context).pop();
        Navigator.pushReplacement(
          context,
          MaterialPageRoute(builder: (context) => VerifyEmail(user: user)),
        );
      }).catchError((e) {
        print(e);
        if (e.code == "ERROR_EMAIL_ALREADY_IN_USE") {
          setState(() {
            _showEmailUsedError = true;
          });
        }
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("Criar Conta")),
      body: Form(
        key: _formKey,
        child: SafeArea(
          child: Center(
            child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: <Widget>[
                  TextFormField(
                    decoration: InputDecoration(labelText: "Nome"),
                    validator: (value) {
                      if (value.isEmpty) {
                        return "Nome não pode ficar em branco";
                      }

                      if (value.length < 3)
                        return 'Seu nome precisa de pelo menos 3 caracteres';
                      else
                        return null;
                    },
                    onSaved: (value) => _name = value,
                  ),
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
                    onChanged: (value) {
                      setState(() {
                        _showEmailUsedError = false;
                      });
                    },
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
                  ),
                  Visibility(
                    visible: _showEmailUsedError,
                    child: Text("Este Email já foi cadastrado."),
                  ),
                  RaisedButton(
                    child: Text("Salvar"),
                    onPressed: signup,
                  ),
                ]),
          ),
        ),
      ),
    );
  }
}
