import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

ThemeData appTheme() {
  final Color primary = Colors.lightGreen;

  SystemChrome.setSystemUIOverlayStyle(
      SystemUiOverlayStyle(statusBarColor: primary));

  return ThemeData(
    primarySwatch: primary,
  );
}
