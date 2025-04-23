package com.example.testbanner

import android.annotation.SuppressLint
import android.app.Activity
import android.app.AlertDialog
import android.content.Context
import android.media.MediaPlayer
import android.os.Bundle
import android.util.Log
import android.webkit.JavascriptInterface
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.Toast
import androidx.activity.ComponentActivity
import androidx.activity.OnBackPressedCallback
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.compose.ui.viewinterop.AndroidView
import com.google.android.gms.ads.*

class MainActivity : ComponentActivity() {
    private lateinit var webView: WebView
    private var loopMediaPlayer: MediaPlayer? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        MobileAds.initialize(this) {}

        // Sukuriame MediaPlayer
        loopMediaPlayer =
            MediaPlayer.create(this, R.raw.loop) // R.raw.loop - jūsų garso failo resursas
        loopMediaPlayer?.isLooping = true // Nustatome loop'ą

        // Ijungiamas Edge To Edge
        enableEdgeToEdge()

        // Suteikiam reiksme webView
        webView = WebView(this)

        setContent {
            MaterialTheme {
                Scaffold { innerPadding ->
                    Column(
                        modifier = Modifier
                            .fillMaxSize()
                            .padding(innerPadding)
                            .background(
                                Brush.horizontalGradient(
                                    colors = listOf(
                                        Color(0xFF3C3CCD),
                                        Color(0xFF8A2BE2)
                                    )
                                )
                            )
                    ) {
                        // WebView viršuje, užima visą likusį aukštį
                        Box(modifier = Modifier.weight(1f)) {
                            WebViewScreen()
                        }

                        // Spacer – tuščias tarpas tarp WebView ir reklamos
                        Spacer(modifier = Modifier.height(16.dp))

                        // Reklama šiek tiek aukščiau nei įprasta
                        BannerAdView(
                            modifier = Modifier
                                .fillMaxWidth()
                                .height(50.dp)
                        )

                        // Jei nori dar šiek tiek atitraukti nuo ekrano apačios
                        Spacer(modifier = Modifier.height(8.dp))
                    }
                }
            }
        }


    // Suaktyvuojam callback'a
    val callback = object : OnBackPressedCallback(true) {
        override fun handleOnBackPressed() {
            webView.evaluateJavascript("window.dispatchEvent(new Event('backbutton'))", null)
        }
    }

    // Pridedam callback'a prie onBackPressedDispatcher
    onBackPressedDispatcher.addCallback(this, callback)
}


fun closeGame() {
    finish() // Uždaro žaidimą
}

// Funkcija sustabdyti garsa
fun stopLoopSound() {
    loopMediaPlayer?.pause() // Sustabdome garsą
    loopMediaPlayer?.seekTo(0) // Gražiname į pradžią
}
// Funkcija paleisti garsa
fun playLoopSound() {
    loopMediaPlayer?.start() // Paleidžiame garsą
}

override fun onDestroy() {
    super.onDestroy()
    // Atlaisviname MediaPlayer resursus, kai veikla uždaroma
    loopMediaPlayer?.release()
    loopMediaPlayer = null
}

// Klase kuri bus susieta su Javascript.
class WebAppInterface(private val mContext: Context,private val activity: com.example.testbanner.MainActivity) {

    @JavascriptInterface
    fun getSoundPath(soundName: String): String {
        return when (soundName) {
            "press" -> "file:///android_asset/sounds/press.wav"
            "inactive" -> "file:///android_asset/sounds/inactive.mp3"
            "correct" -> "file:///android_asset/sounds/correct.mp3"
            "incorrect" -> "file:///android_asset/sounds/incorrect.mp3"
            "winning" -> "file:///android_asset/sounds/winning.mp3"
            "finished" -> "file:///android_asset/sounds/finished.mp3"
            "loop" -> "file:///android_asset/sounds/loop.mp3"
            "quiz" -> "file:///android_asset/sounds/quiz.mp3"
            "loose" -> "file:///android_asset/sounds/loose.mp3"
            else -> ""
        }
    }


    @JavascriptInterface
    fun showToast(toast: String) {
        Toast.makeText(mContext, toast, Toast.LENGTH_SHORT).show()
    }

    @JavascriptInterface
    fun playLoopSound() {
        activity.runOnUiThread {
            activity.playLoopSound()
        }
    }

    @JavascriptInterface
    fun stopLoopSound() {
        activity.runOnUiThread {
            activity.stopLoopSound()
        }
    }

    @JavascriptInterface
    fun goBack() {
        // Rodo patvirtinimo langą
        (mContext as Activity).runOnUiThread {
            AlertDialog.Builder(mContext)
                .setTitle("Exit game")
                .setMessage("Are you sure want to exit?")
                .setPositiveButton("Yes") { _, _ ->
                    // Iškviečia closeGame metodą MainActivity
                    (mContext as MainActivity).closeGame()
                }
                .setNegativeButton("No", null)
                .show()
        }
    }

    // Metodas, kuris uždaro žaidimą
    @JavascriptInterface
    fun stopGame() {
        // Uždaro veiklą, tai iš esmės uždarys žaidimą
        (mContext as Activity).finish()
    }
}

    //Cia sukuriamas webview ir suteikiami jam nustatymai
    @SuppressLint("SetJavaScriptEnabled")
    @Composable
    fun WebViewScreen(modifier: Modifier = Modifier) {
        AndroidView(
            factory = { context ->
                webView.apply {
                    settings.javaScriptEnabled = true
                    settings.allowFileAccess = true
                    settings.allowContentAccess = true
                    settings.domStorageEnabled = true
                    settings.useWideViewPort = true
                    settings.loadWithOverviewMode = true
                    webViewClient = object : WebViewClient() {
                        override fun onPageFinished(view: WebView?, url: String?) {
                            super.onPageFinished(view, url)
                            // Įterpiame JavaScript kodą po to, kai puslapis bus pilnai įkeltas
                            val js = """
                window.addEventListener('backbutton', function(event) {
                        window.Android.goBack();
                     event.preventDefault();
                });
            """.trimIndent()
                            webView.evaluateJavascript(js, null)
                        }
                    }
                    setBackgroundColor(0)

                    // Sukuriame WebAppInterface objekta
                    val webAppInterface = WebAppInterface(context, this@apply.context as MainActivity)
                    // pridedame Javascript interface
                    addJavascriptInterface(webAppInterface, "Android")
                    // paleidziama index.html
                    loadUrl("file:///android_asset/index.html")
                }
            },
            modifier = modifier.fillMaxSize()
        )
    }

    @Composable
    fun BannerAdView(modifier: Modifier) {
        AndroidView(
            modifier = modifier,
            factory = { context ->
                AdView(context).apply {
                    adUnitId = "ca-app-pub-3940256099942544/6300978111" // TEST BANNER ID
                    setAdSize(AdSize.BANNER)

                    adListener = object : AdListener() {
                        override fun onAdLoaded() {
                            Log.d("AdMob", "Ad loaded successfully")
                        }

                        override fun onAdFailedToLoad(error: LoadAdError) {
                            Log.e("AdMob", "Ad failed to load: ${error.message}")
                        }
                    }

                    loadAd(AdRequest.Builder().build())
                }
            }
        )
    }
}
