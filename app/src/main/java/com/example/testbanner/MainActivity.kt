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
import com.google.android.gms.ads.interstitial.InterstitialAd
import com.google.android.gms.ads.interstitial.InterstitialAdLoadCallback
import com.google.android.gms.ads.FullScreenContentCallback
import com.google.android.gms.ads.AdError
import com.google.android.gms.ads.rewarded.RewardedAd
import com.google.android.gms.ads.rewarded.RewardedAdLoadCallback

class MainActivity : ComponentActivity() {
    private lateinit var webView: WebView
    private var loopMediaPlayer: MediaPlayer? = null
    private var interstitialAd: InterstitialAd? = null
    private var rewardedAd: RewardedAd? = null
    private companion object {
        const val TAG = "MainActivity" // Teisingas būdas: constant kintamasis companion objekte
    }

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

        loadInterstitialAd()
        loadRewardedAd()

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
                            WebViewScreen(mainActivity = this@MainActivity)
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

    // FUNKCIJA: užkrauti tarpinę reklamą
    private fun loadInterstitialAd() {
        val adRequest = AdRequest.Builder().build()
        InterstitialAd.load(
            this,
            "ca-app-pub-3940256099942544/1033173712",  // Testinis interstitial ID
            adRequest,
            object : InterstitialAdLoadCallback() {
                override fun onAdLoaded(ad: InterstitialAd) {
                    interstitialAd = ad
                    Log.d(TAG, "Interstitial loaded")

                    interstitialAd?.fullScreenContentCallback = object : FullScreenContentCallback() {
                        override fun onAdDismissedFullScreenContent() {
                            Log.d(TAG, "Interstitial closed")
                            interstitialAd = null
                            loadInterstitialAd() // Pakraunam kitai kartai
                        }

                        override fun onAdFailedToShowFullScreenContent(adError: AdError) {
                            Log.e(TAG, "Failed to show interstitial: ${adError.message}")
                            interstitialAd = null
                        }
                    }
                }

                override fun onAdFailedToLoad(adError: LoadAdError) {
                    Log.e(TAG, "Interstitial failed to load: ${adError.message}")
                    interstitialAd = null
                }
            }
        )
    }

    private fun loadRewardedAd() {
        val adRequest = AdRequest.Builder().build()
        RewardedAd.load(
            this,
            "ca-app-pub-3940256099942544/5224354917", // Testinis Rewarded Ad ID
            adRequest,
            object : RewardedAdLoadCallback() {
                override fun onAdLoaded(ad: RewardedAd) {
                    rewardedAd = ad
                    Log.d(TAG, "Rewarded ad loaded")

                    rewardedAd?.fullScreenContentCallback = object : FullScreenContentCallback() {
                        override fun onAdDismissedFullScreenContent() {
                            Log.d(TAG, "Rewarded ad dismissed")
                            rewardedAd = null
                            loadRewardedAd() // Pakraunam kitai kartai
                        }

                        override fun onAdFailedToShowFullScreenContent(adError: AdError) {
                            Log.e(TAG, "Failed to show rewarded ad: ${adError.message}")
                            rewardedAd = null
                        }
                    }
                }

                override fun onAdFailedToLoad(adError: LoadAdError) {
                    Log.e(TAG, "Rewarded ad failed to load: ${adError.message}")
                    rewardedAd = null
                }
            }
        )
    }

    private fun showRewardedAd() {
        if (rewardedAd != null) {
            rewardedAd?.fullScreenContentCallback = object : FullScreenContentCallback() {
                override fun onAdDismissedFullScreenContent() {
                    Log.d(TAG, "Rewarded ad dismissed.")
                    // Reklama buvo uzdaryta.
                    rewardedAd = null // Pašalinam seną reklamą
                    loadRewardedAd() // Uzkraunam nauja
                    // Iškviečiam JavaScript funkciją
                    webView.evaluateJavascript("javascript:enableMobileHelpAfterReward()", null)
                }
                override fun onAdFailedToShowFullScreenContent(adError: AdError) {
                    Log.e(TAG, "Rewarded ad failed to show: ${adError.message}")
                    rewardedAd = null // Pašalinam seną reklamą
                }
                override fun onAdShowedFullScreenContent() {
                    Log.d(TAG, "Rewarded ad showed.")
                }
            }

            rewardedAd?.show(this) { rewardItem ->
                // Kol kas čia nieko nedarom. Paliekame tuščią, bet privalomas metodas.
                val rewardAmount = rewardItem.amount
                val rewardType = rewardItem.type
                Log.d(TAG, "User earned reward: $rewardAmount $rewardType")
            }
        } else {
            Log.d(TAG, "Rewarded ad is not ready")
            Toast.makeText(this, "Ad not ready", Toast.LENGTH_SHORT).show()
        }
    }


    // FUNKCIJA: parodyti tarpinę reklamą
    fun showInterstitialAd() {
        if (interstitialAd != null) {
            interstitialAd?.show(this)
        } else {
            Log.d("TAG", "Interstitial not ready yet")
        }
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
class WebAppInterface(private val mContext: Context,
                      private val activity: MainActivity,
                      private val webView: WebView) {

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
    fun showInterstitial() {
        (mContext as Activity).runOnUiThread {
            (mContext as MainActivity).showInterstitialAd()
        }
    }


    @JavascriptInterface
    fun showRewardAd() {
        (mContext as Activity).runOnUiThread {
            (mContext as MainActivity).showRewardedAd() // čia teisingai
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
    fun WebViewScreen(modifier: Modifier = Modifier, mainActivity: MainActivity) {
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
                            evaluateJavascript(js, null)
                        }
                    }
                    setBackgroundColor(0)

                    // Sukuriame WebAppInterface objekta
                    val webAppInterface = WebAppInterface(context, mainActivity, this)
                    // pridedame Javascript interface
                    addJavascriptInterface(webAppInterface, "Android")
                    // paleidziama index.html
                    loadUrl("file:///android_asset/index.html")
                    mainActivity.webView = this
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
