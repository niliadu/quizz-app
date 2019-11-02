import 'package:flutter/material.dart';
import 'package:quizz_app/pages/loginPage.dart';

class Startup extends StatefulWidget {
 @override
  State<StatefulWidget> createState() => new _State();
}

class _State extends State<Startup> {
 @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: LoginPage(),
    );
  }
} 