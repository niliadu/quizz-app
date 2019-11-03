import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';

import 'homePage.dart';
import 'loginPage.dart';

class VerifyEmail extends StatefulWidget {
  final FirebaseUser user;

  VerifyEmail({Key key, @required this.user}) : super(key: key);

  @override
  _VerifyEmailState createState() => _VerifyEmailState();
}

class _VerifyEmailState extends State<VerifyEmail> {
  FirebaseUser _user;
  bool _hidePage = true;
  @override
  initState() {
    super.initState();

    widget.user
        .reload()
        .then((res) => FirebaseAuth.instance.currentUser())
        .then((user) {
      if (user.isEmailVerified) {
        goToHome();
      } else {
        _user = user;
        _hidePage = false;
      }
    });
  }

  void goToHome() {
    Navigator.of(context).pop();
    Navigator.pushReplacement(
      context,
      MaterialPageRoute(builder: (context) => Home()),
    );
  }

  @override
  Widget build(BuildContext context) {
    if (_hidePage) return Scaffold();

    return Scaffold(
      appBar: AppBar(title: Text("Confirmar Email")),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text(
                "Voce ainda nao confirmou seu email.\nCheck sua caixa de SPAM antes de solicitar o reenvio do email de verificação."),
            RaisedButton(
              child: Text("Reenviar email de verificação"),
              onPressed: () => _user.sendEmailVerification(),
            ),
            RaisedButton(
              child: Text("Já verifiquei. Checar novamente."),
              onPressed: () {
                _user
                    .reload()
                    .then((res) => FirebaseAuth.instance.currentUser())
                    .then((user) {
                  if (user.isEmailVerified) goToHome();
                });
              },
            ),
            RaisedButton(
              child: Text("Sair"),
              onPressed: () {
                FirebaseAuth.instance.signOut();
                Navigator.of(context).pop();
                Navigator.pushReplacement(
                  context,
                  MaterialPageRoute(builder: (context) => LoginPage()),
                );
              },
            ),
          ],
        ),
      ),
    );
  }
}
