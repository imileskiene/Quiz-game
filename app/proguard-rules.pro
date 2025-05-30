# Add project specific ProGuard rules here.
# You can control the set of applied configuration files using the
# proguardFiles setting in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# If your project uses WebView with JS, uncomment the following
# and specify the fully qualified class name to the JavaScript interface
# class:
-keepclassmembers class com.inbit.quizColorChallenge.MainActivity$WebAppInterface {
  public *;
}

# Uncomment this to preserve the line number information for
# debugging stack traces.
#-keepattributes SourceFile,LineNumberTable

# If you keep the line number information, uncomment this to
# hide the original source file name.
#-renamesourcefileattribute SourceFile

# Google Play Services Ads SDK - Neleidžia obfiskuoti ar pašalinti svarbių klasių
-keep class com.google.android.gms.** { *; }
    -keep class com.google.ads.** { *; }
    -dontwarn com.google.ads.**
    -dontwarn com.google.android.gms.**

    # Firebase
    -keep class com.google.firebase.** { *; }
    -dontwarn com.google.firebase.**

    # Crashlytics
    -keep class com.google.firebase.crashlytics.** { *; }
    -dontwarn com.google.firebase.crashlytics.**

    # Jetpack Compose
    -keep class androidx.compose.runtime.** { *; }
    -keep class androidx.compose.ui.** { *; }
    -keep class androidx.compose.material3.** { *; }
    -dontwarn androidx.compose.**

    # Kotlin
    -keep class kotlin.** { *; }
    -dontwarn kotlin.**

    # Coroutines
    -keep class kotlinx.coroutines.** { *; }
    -dontwarn kotlinx.coroutines.**

    # Crashlytics obfuscation support
    -keepattributes SourceFile,LineNumberTable