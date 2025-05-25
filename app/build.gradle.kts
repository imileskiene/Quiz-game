plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.android)
    alias(libs.plugins.kotlin.compose)

    id("com.google.gms.google-services")
    id("com.google.firebase.crashlytics")
}

android {
    namespace = "com.inbit.quizColorChallenge"
    compileSdk = 35

    signingConfigs {
        create("release") {
            // Nuskaitykite savybes, kaip darėte
            val storeFileProperty = project.findProperty("MYAPP_RELEASE_STORE_FILE")?.toString()
            val storePasswordProperty = project.findProperty("MYAPP_RELEASE_STORE_PASSWORD")?.toString()
            val keyAliasProperty = project.findProperty("MYAPP_RELEASE_KEY_ALIAS")?.toString()
            val keyPasswordProperty = project.findProperty("MYAPP_RELEASE_KEY_PASSWORD")?.toString()

            if (
                storeFileProperty != null &&
                storePasswordProperty != null &&
                keyAliasProperty != null &&
                keyPasswordProperty != null &&
                file(storeFileProperty).exists()
            ) {
                storeFile = file(storeFileProperty)
                storePassword = storePasswordProperty
                keyAlias = keyAliasProperty
                keyPassword = keyPasswordProperty
            } else {
                println("⚠️ Warning: Incomplete or missing signing config or keystore file doesn't exist.")
            }
        }
    }

    defaultConfig {
        applicationId = "com.inbit.quizColorChallenge"
        minSdk = 26
        targetSdk = 35
        versionCode = 1
        versionName = "1.0"

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
    }

    buildTypes {
        release {
            isMinifyEnabled = true
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
            val releaseSigningConfig = signingConfigs.findByName("release")
            if (releaseSigningConfig?.storeFile?.exists() == true &&
                !releaseSigningConfig.storePassword.isNullOrEmpty() &&
                !releaseSigningConfig.keyAlias.isNullOrEmpty() &&
                !releaseSigningConfig.keyPassword.isNullOrEmpty()) {
                signingConfig = releaseSigningConfig
            } else {
                throw GradleException("Release signing configuration is incomplete or missing. " +
                        "Please ensure MYAPP_RELEASE_STORE_FILE, MYAPP_RELEASE_STORE_PASSWORD, " +
                        "MYAPP_RELEASE_KEY_ALIAS, and MYAPP_RELEASE_KEY_PASSWORD are correctly defined in local.properties " +
                        "and the storeFile exists.")
            }
        }
        debug {
//            applicationIdSuffix = ".debug"
            versionNameSuffix = "-debug"
            isDebuggable = true
            isMinifyEnabled = false
        }
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_11
        targetCompatibility = JavaVersion.VERSION_11
    }
    kotlinOptions {
        jvmTarget = "11"
    }
    buildFeatures {
        compose = true
    }
    composeOptions {
        kotlinCompilerExtensionVersion = "1.5.14"
    }
}

dependencies {
    implementation ("com.google.android.gms:play-services-ads:23.0.0")
    implementation(platform(libs.firebase.bom))
    implementation (libs.firebase.database.ktx)
    implementation(libs.firebase.analytics.ktx)
    implementation(libs.firebase.crashlytics.ktx)

    implementation (libs.androidx.core.splashscreen)
    implementation(libs.androidx.core.ktx)
    implementation(libs.androidx.lifecycle.runtime.ktx)
    implementation(libs.androidx.activity.compose)
    implementation(platform(libs.androidx.compose.bom))
    implementation(libs.androidx.ui)
    implementation(libs.androidx.ui.graphics)
    implementation(libs.androidx.ui.tooling.preview)
    implementation(libs.androidx.material3)
    testImplementation(libs.junit)
    androidTestImplementation(libs.androidx.junit)
    androidTestImplementation(libs.androidx.espresso.core)
    androidTestImplementation(platform(libs.androidx.compose.bom))
    androidTestImplementation(libs.androidx.ui.test.junit4)
    debugImplementation(libs.androidx.ui.tooling)
    debugImplementation(libs.androidx.ui.test.manifest)
}