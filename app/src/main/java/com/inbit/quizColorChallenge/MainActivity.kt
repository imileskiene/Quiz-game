package com.inbit.quizColorChallenge

import android.annotation.SuppressLint
import android.app.Activity
import android.app.AlertDialog
import android.content.ActivityNotFoundException
import android.content.Context
import android.content.Intent
import android.media.AudioAttributes
import android.media.MediaPlayer
import android.net.ConnectivityManager
import android.net.Network
import android.net.NetworkCapabilities
import android.net.NetworkRequest
import android.os.Build
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.util.Log
import android.view.View
import android.view.WindowInsets
import android.view.WindowInsetsController
import android.webkit.JavascriptInterface
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.Toast
import androidx.activity.ComponentActivity
import androidx.activity.OnBackPressedCallback
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.core.tween
import androidx.compose.animation.fadeOut
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.navigationBarsPadding
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.statusBarsPadding
import androidx.compose.material3.MaterialTheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.mutableStateOf
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.compose.ui.viewinterop.AndroidView
import androidx.core.splashscreen.SplashScreen.Companion.installSplashScreen
import com.google.android.gms.ads.AdError
import com.google.android.gms.ads.AdListener
import com.google.android.gms.ads.AdRequest
import com.google.android.gms.ads.AdSize
import com.google.android.gms.ads.AdView
import com.google.android.gms.ads.FullScreenContentCallback
import com.google.android.gms.ads.LoadAdError
import com.google.android.gms.ads.MobileAds
import com.google.android.gms.ads.interstitial.InterstitialAd
import com.google.android.gms.ads.interstitial.InterstitialAdLoadCallback
import com.google.android.gms.ads.rewarded.RewardedAd
import com.google.android.gms.ads.rewarded.RewardedAdLoadCallback
//import com.example.testbanner.R


class MainActivity : ComponentActivity() {
    private var webView: WebView? = null
    private var loopMediaPlayer: MediaPlayer? = null
    private var quizMediaPlayer: MediaPlayer? = null
    private var interstitialAd: InterstitialAd? = null
    private var rewardedAd: RewardedAd? = null
    private var isLoopSoundPlaying = false
    private var isQuizSoundPlaying = false
    private var currentSound: String? = null
    private var isBannerVisibleState = mutableStateOf(true)
    private lateinit var connectivityManager: ConnectivityManager


    private companion object {
        const val TAG = "MainActivity"
    }

    private fun initPlayers() {
        val attrs = AudioAttributes.Builder()
            .setUsage(AudioAttributes.USAGE_GAME)
            .setContentType(AudioAttributes.CONTENT_TYPE_MUSIC)
            .build()

        // Inicijuojame loop garso playerį
        val loopFd = resources.openRawResourceFd(R.raw.loop)
        loopMediaPlayer = MediaPlayer().apply {
            setAudioAttributes(attrs)
            setDataSource(loopFd.fileDescriptor, loopFd.startOffset, loopFd.length)
            isLooping = true
            prepare()
        }
        loopFd.close()

        // Inicijuojame quiz garso playerį
        val quizFd = resources.openRawResourceFd(R.raw.quiz)
        quizMediaPlayer = MediaPlayer().apply {
            setAudioAttributes(attrs)
            setDataSource(quizFd.fileDescriptor, quizFd.startOffset, quizFd.length)
            isLooping = true
            prepare()
        }
        quizFd.close()
    }

    // 👇 FUNKCIJA: tikrina ar yra internetas
    private fun isInternetAvailable(): Boolean {
//        Log.d(TAG, "isInternetAvailable: Checking for internet...")
        val connectivityManager = getSystemService(Context.CONNECTIVITY_SERVICE) as ConnectivityManager
        try {
            val network = connectivityManager.activeNetwork
            if (network == null) {
//                Log.d(TAG, "isInternetAvailable: activeNetwork is null. Returning false.")
                return false
            }
//            Log.d(TAG, "isInternetAvailable: activeNetwork found.")
            val capabilities = connectivityManager.getNetworkCapabilities(network)
            if (capabilities == null) {
//                Log.d(TAG, "isInternetAvailable: getNetworkCapabilities is null. Returning false.")
                return false
            }
            val hasInternet = capabilities.hasCapability(NetworkCapabilities.NET_CAPABILITY_INTERNET)
//            Log.d(TAG, "isInternetAvailable: hasCapability(NET_CAPABILITY_INTERNET) = $hasInternet. Returning $hasInternet.")
            return hasInternet
        } catch (e: SecurityException) {
            // Apdorojame SecurityException - jei trūksta leidimų, laikome, kad interneto NĖRA
//            Log.e(TAG, "isInternetAvailable: SecurityException checking network state. Assuming no internet.", e)
            return false // Svarbu: grąžinti false, jei trūksta leidimų
        } catch (e: Exception) {
            // Apdorojame kitas galimas klaidas
//            Log.e(TAG, "isInternetAvailable: Exception checking network state. Assuming no internet.", e)
            return false
        }
    }

    // 👇 FUNKCIJA: rodo dialogą, jei nėra interneto
    private fun showNoInternetDialog() {
//        Log.d(TAG, "showNoInternetDialog() pradžia.")
        AlertDialog.Builder(this)
            .setTitle("Error")
            .setMessage("No internet connection available. Please check your connection and try again.")
            .setCancelable(false) // Neleidžiame uždaryti dialogo paspaudus ne jo zoną ar "Atgal" mygtuką
            .setPositiveButton("Close") { dialog, _ ->
//                Log.d(TAG, "Dialogo 'Close' mygtukas paspaustas. Uždariamas dialogas ir Activity.")
                dialog.dismiss() // Uždaro dialogą
                finishAffinity() // Uždaro visas susijusias programos veiklas ir išeina iš programos
            }
            .show()
    }

    // Tinklo pokyčių sekimas
    private val networkCallback = object : ConnectivityManager.NetworkCallback() {
        override fun onLost(network: Network) {
            super.onLost(network)
            runOnUiThread {
                Toast.makeText(this@MainActivity, "Network connection lost.", Toast.LENGTH_SHORT).show()
                Handler(Looper.getMainLooper()).postDelayed({
                    showNoInternetDialog()
                }, 3000)
            }
        }
    }


    override fun onCreate(savedInstanceState: Bundle?) {
        installSplashScreen()
        super.onCreate(savedInstanceState)
// Inicializuojame tinklo stebėjimą
        connectivityManager = getSystemService(CONNECTIVITY_SERVICE) as ConnectivityManager

        // Ijungiamas Edge To Edge
        enableEdgeToEdge()

        // *** Check internet connection ***
        if (!isInternetAvailable()) {
            // Pakeitimas: Kviečiamas dialogas tiesiogiai
            showNoInternetDialog()
            return // Nutraukia onCreate vykdymą
        } else {
//            Log.d(TAG, "Interneto ryšys PASIEKIAMAS paleidžiant.")
        }
        // *** PABAIGA ***

        // Jei internetas yra, tęsiame programos paleidimą




        MobileAds.initialize(this) {}

        initPlayers()

        webView = WebView(this)

        loadInterstitialAd()
        loadRewardedAd()

        setContent {
            MaterialTheme {
                Column(
                    modifier = Modifier
                        .fillMaxSize()
                        .background(
                            Brush.horizontalGradient(
                                colors = listOf(
                                    Color(0xFF3C3CCD),
                                    Color(0xFF8A2BE2)
                                )
                            )
                        )
                ) {
                    // Pridedam padding virsuje
                    Spacer(modifier = Modifier.statusBarsPadding())

                    // WebView viršuje, užima visą likusį aukštį
                    Box(modifier = Modifier.weight(1f)) {
                        WebViewScreen(mainActivity = this@MainActivity, webViewInstance = webView!!)
                    }
                    // Banner reklamos konteineris (Perkeliame i Column)
                    AnimatedVisibility(
                        visible = isBannerVisibleState.value,
                        exit = fadeOut(animationSpec = tween(durationMillis = 80))
                    ) {
                        Box(
                            modifier = Modifier
                                .fillMaxWidth()
                                .navigationBarsPadding() // Pridedam padding apacioje
                                .padding(bottom = 10.dp)
                        ) {
                            BannerAdView(
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .height(55.dp)
                            )
                        }
                    }
                }
            }
        }


        // Suaktyvuojam callback'a
        val callback = object : OnBackPressedCallback(true) {
            override fun handleOnBackPressed() {
                // Patikriname, ar webView yra inicializuotas prieš jį naudojant
                if (webView != null) { // Patikriname, ar webView nėra null
                    webView!!.evaluateJavascript("window.dispatchEvent(new Event('backbutton'))", null)
                } else {
                    // Jei webView nebuvo inicializuotas (pvz., dėl interneto nebuvimo),
                    // galima atlikti numatytą veiksmą arba nieko nedaryti
                    finish() // Pavyzdys: tiesiog uždaryti activity
                }
            }
        }

        // Pridedam callback'a prie onBackPressedDispatcher
        onBackPressedDispatcher.addCallback(this, callback)
    }

    override fun onWindowFocusChanged(hasFocus: Boolean) {
        super.onWindowFocusChanged(hasFocus)
        if (hasFocus) {
            hideSystemUI()
        }
    }

    private fun hideSystemUI() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            // API 30+
            window.insetsController?.let { controller ->
                controller.hide(WindowInsets.Type.systemBars())
                controller.systemBarsBehavior =
                    WindowInsetsController.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE
            }
        } else {
            // API < 30 (senesni metodai)
            @Suppress("DEPRECATION")
            window.decorView.systemUiVisibility = (
                    View.SYSTEM_UI_FLAG_FULLSCREEN
                            or View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
                            or View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY
                            or View.SYSTEM_UI_FLAG_LAYOUT_STABLE
                            or View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
                            or View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
                    )
        }
    }



    // FUNKCIJA: užkrauti tarpinę reklamą
    private fun loadInterstitialAd() {
        val adRequest = AdRequest.Builder().build()
        InterstitialAd.load(
            this,
            "ca-app-pub-3940256099942544/1033173712",
            adRequest,
            object : InterstitialAdLoadCallback() {
                override fun onAdLoaded(ad: InterstitialAd) {
                    interstitialAd = ad
//                    Log.d(TAG, "Interstitial loaded")
                }

                override fun onAdFailedToLoad(adError: LoadAdError) {
//                    Log.e(TAG, "Interstitial failed to load: ${adError.message}")
                    interstitialAd = null
                }
            }
        )
    }

    private fun loadRewardedAd() {
        val adRequest = AdRequest.Builder().build()
        RewardedAd.load(
            this,
            "ca-app-pub-3940256099942544/5224354917",
            adRequest,
            object : RewardedAdLoadCallback() {
                override fun onAdLoaded(ad: RewardedAd) {
                    rewardedAd = ad
//                    Log.d(TAG, "Rewarded ad loaded")

                    rewardedAd?.fullScreenContentCallback =
                        object : FullScreenContentCallback() {
                            override fun onAdShowedFullScreenContent() {
//                                Log.d(TAG, "Rewarded ad showed")
                                stopAllSounds()
                                webView?.evaluateJavascript("javascript:onRewardStarted()", null)
                            }

                            override fun onAdDismissedFullScreenContent() {
//                                Log.d(TAG, "Rewarded ad dismissed")
                                val soundToPlay = currentSound
                                stopAllSounds()
                                webView?.evaluateJavascript(
                                    "javascript:enableMobileHelpAfterReward('$soundToPlay')",
                                    null
                                )
                                webView?.evaluateJavascript(
                                    "javascript:onRewardEnded('$soundToPlay')",
                                    null
                                )
                                rewardedAd = null
                                // Parodome banner reklamą
                                isBannerVisibleState.value = true
                                loadRewardedAd()
                            }

                            override fun onAdFailedToShowFullScreenContent(adError: AdError) {
//                                Log.e(TAG, "Failed to show rewarded ad: ${adError.message}")
                                rewardedAd = null
                                // Parodome banner reklamą (jei reklama nepavyko parodyti)
                                isBannerVisibleState.value = true
                                // Rodyti pranešimą apie klaidą
                                webView?.evaluateJavascript("javascript:showAdError()", null)
                                //Jei nepavyko paleist reklamos vistiek paleidziame funkcija
                                webView?.evaluateJavascript("javascript:onRewardEnded('')", null)
                            }
                        }
                }

                override fun onAdFailedToLoad(adError: LoadAdError) {
//                    Log.e(TAG, "Rewarded ad failed to load: ${adError.message}")
                    rewardedAd = null
                    // Parodome banner reklamą (jei reklama nepavyko parodyti)
                    isBannerVisibleState.value = true
                    // Rodyti pranešimą apie klaidą
                    webView?.evaluateJavascript("javascript:showAdError()", null)
                    //Jei nepavyko paleist reklamos vistiek paleidziame funkcija
                    webView?.evaluateJavascript("javascript:onRewardEnded('')", null)

                }
            }
        )
    }


    private fun showRewardedAd() {
        if (rewardedAd != null) {
            // Paslepiame banner reklamą
            isBannerVisibleState.value = false
            rewardedAd?.fullScreenContentCallback = object : FullScreenContentCallback() {
                override fun onAdShowedFullScreenContent() {
//                    Log.d(TAG, "Rewarded ad showed")
                    stopAllSounds()
                    webView?.evaluateJavascript("javascript:onRewardStarted()", null)
                }

                override fun onAdDismissedFullScreenContent() {
//                    Log.d(TAG, "Rewarded ad dismissed")
                    val soundToPlay = currentSound
                    stopAllSounds()
                    Handler(Looper.getMainLooper()).postDelayed({
                    webView?.evaluateJavascript(
                        "javascript:enableMobileHelpAfterReward('$soundToPlay')",
                        null
                    )
                    webView?.evaluateJavascript("javascript:onRewardEnded('$soundToPlay')", null)
                    }, 150)
                    rewardedAd = null
                    // Parodome banner reklamą
                    Handler(Looper.getMainLooper()).postDelayed({
                        isBannerVisibleState.value = true
                    }, 300)
                    loadRewardedAd()
                }

                override fun onAdFailedToShowFullScreenContent(adError: AdError) {
//                    Log.e(TAG, "Failed to show rewarded ad: ${adError.message}")
                    rewardedAd = null
                    // Parodome banner reklamą (jei reklama nepavyko parodyti)
                    isBannerVisibleState.value = true
                    // Rodyti pranešimą apie klaidą
                    webView?.evaluateJavascript("javascript:showAdError()", null)
                    //Jei nepavyko paleist reklamos vistiek paleidziame funkcija
                    webView?.evaluateJavascript("javascript:onRewardEnded('')", null)
                }
            }
            rewardedAd?.show(this) { rewardItem ->
                val rewardAmount = rewardItem.amount
                val rewardType = rewardItem.type
//                Log.d(TAG, "User earned reward: $rewardAmount $rewardType")
            }
        } else {
//            Log.d(TAG, "Rewarded ad is not ready")
            // Rodyti pranešimą apie klaidą
            webView?.evaluateJavascript("javascript:showAdError()", null)
            //Jei nepavyko paleist reklamos vistiek paleidziame funkcija
            webView?.evaluateJavascript("javascript:onRewardEnded('')", null)

        }
    }


    // FUNKCIJA: parodyti tarpinę reklamą
    fun showInterstitialAd() {
        if (interstitialAd != null) {
            isBannerVisibleState.value = false
            interstitialAd?.fullScreenContentCallback = object : FullScreenContentCallback() {
                override fun onAdDismissedFullScreenContent() {
//                    Log.d(TAG, "Interstitial closed")
                    stopAllSounds()
                    // Pašalinam overlay
                    Handler(Looper.getMainLooper()).postDelayed({
                        // Pašalinam overlay ir paleidžiam sekančią JS funkciją su delay
                        webView?.evaluateJavascript("javascript:removeOverlay();", null)
                        webView?.evaluateJavascript("javascript:callNextContainer();", null)
                    }, 150)
                    interstitialAd = null
                    Handler(Looper.getMainLooper()).postDelayed({
                        isBannerVisibleState.value = true
                    }, 300)
                    loadInterstitialAd()
                }

                override fun onAdFailedToShowFullScreenContent(adError: AdError) {
//                    Log.e(TAG, "Failed to show interstitial: ${adError.message}")
                    interstitialAd = null
                    // Pašalinam overlay
                    webView?.evaluateJavascript("javascript:removeOverlay();", null)
                    // Kadangi reklama nepavyko parodyti, kviečiam nextContainer
                    webView?.evaluateJavascript("javascript:callNextContainer();", null)
                    isBannerVisibleState.value = true
                }

                override fun onAdShowedFullScreenContent() {
//                    Log.d(TAG, "Interstitial showed")
                    stopAllSounds()
                    webView?.evaluateJavascript("javascript:onInterstitialStarted()", null)
                }
            }
            interstitialAd?.show(this)
        } else {
//            Log.d(TAG, "Interstitial not ready yet")
            // Pašalinam overlay
            webView?.evaluateJavascript("javascript:removeOverlay();", null)
            // Jei reklama negalima parodyti, kviečiame nextContainer
            webView?.evaluateJavascript("javascript:callNextContainer();", null)
        }
    }

    fun sendSupportEmail() {
        val recipient = "inbit.dev@gmail.com"
        val subject = "Quizly: Color Challenge"

        // Gauti programėlės versiją
        val packageInfo = packageManager.getPackageInfo(packageName, 0)
        val versionName = packageInfo.versionName

        // Gauti OS ir įrenginio info
        val androidVersion = Build.VERSION.RELEASE
        val deviceModel = "${Build.MANUFACTURER} ${Build.MODEL}"

        // Paruošti laiško turinį
        val body = """
        
        --- App Info ---
        App Version: $versionName
        Android Version: $androidVersion
        Device: $deviceModel
    """.trimIndent()

        val emailIntent = Intent(Intent.ACTION_SEND).apply {
            type = "message/rfc822" // apriboti tik el. pašto appsams
            putExtra(Intent.EXTRA_EMAIL, arrayOf(recipient))
            putExtra(Intent.EXTRA_SUBJECT, subject)
            putExtra(Intent.EXTRA_TEXT, body)
        }

        try {
            startActivity(Intent.createChooser(emailIntent, "Choose Email App"))
        } catch (e: ActivityNotFoundException) {
            Toast.makeText(this, "No email app found.", Toast.LENGTH_SHORT).show()
        }
    }


    fun closeGame() {
        finish() // Uždaro žaidimą
    }

    // Uzdaro zaidima
    fun stopGame() {
        stopAllSounds()
        finish()
    }

    private fun stopAllSounds() {
        stopLoopSound()
        stopQuizSound()
        currentSound = null
    }

    fun stopLoopSound() {
        if (isLoopSoundPlaying) {
            loopMediaPlayer?.pause()
            loopMediaPlayer?.seekTo(0)
            isLoopSoundPlaying = false
            currentSound = null
        }
    }

    fun playLoopSound() {
        if (!isLoopSoundPlaying) {
            stopAllSounds()
            loopMediaPlayer?.start()
            isLoopSoundPlaying = true
            currentSound = "loop"
        }
    }

    fun stopQuizSound() {
        if (isQuizSoundPlaying) {
            quizMediaPlayer?.pause()
            quizMediaPlayer?.seekTo(0)
            isQuizSoundPlaying = false
            currentSound = null
        }
    }

    fun playQuizSound() {
        if (!isQuizSoundPlaying) {
            stopAllSounds()
            quizMediaPlayer?.start()
            isQuizSoundPlaying = true
            currentSound = "quiz"
        }
    }

    private fun playSoundBasedOn(sound: String) {
        when (sound) {
            "loop" -> {
                if (loopMediaPlayer != null && !isLoopSoundPlaying) {
                    playLoopSound()
                }
            }

            "quiz" -> {
                if (quizMediaPlayer != null && !isQuizSoundPlaying) {
                    playQuizSound()
                }
            }

            else -> {
                // Jei currentSound null arba netikėta reikšmė, nieko nedaryti.
            }
        }
    }

    override fun onDestroy() {
        super.onDestroy()
        loopMediaPlayer?.release()
        loopMediaPlayer = null
        quizMediaPlayer?.release()
        quizMediaPlayer = null
        // Svarbu: paleisti WebView resursus, jei jis buvo inicializuotas
        webView?.destroy()
        webView = null
    }

    override fun onResume() {
        super.onResume()
        // Registruojame atskambinimo funkciją TIK jei internetas yra
        if (isInternetAvailable()) { // Naudojame atnaujintą isInternetAvailable su try-catch
//            Log.d(TAG, "onResume: Registering network callback.")
            val request = NetworkRequest.Builder()
                .addCapability(NetworkCapabilities.NET_CAPABILITY_INTERNET)
                .build()
            try {
                connectivityManager.registerNetworkCallback(request, networkCallback)
            } catch (e: SecurityException) {
//                Log.e(TAG, "onResume: SecurityException registering network callback. Permission denied.", e)
                // Čia galite nieko nedaryti, nes be leidimo vis tiek nepavyks
            }
        } else {
//            Log.d(TAG, "onResume: Internet not available. Not registering network callback.")
        }
    }

    override fun onPause() {
        super.onPause()
        // Išregistruojame atskambinimo funkciją TIK jei ji buvo registruota (t.y. jei internetas buvo)
        // Geresnis būdas yra tikrinti, ar isInternetAvailable() buvo true onCreate metu,
        // bet paprastumo dėlei galime bandyti išregistruoti ir apdoroti SecurityException.
        try {
            connectivityManager.unregisterNetworkCallback(networkCallback)
//            Log.d(TAG, "onPause: Unregistered network callback.")
        } catch (e: IllegalArgumentException) {
            // Ši išimtis gali atsirasti, jei atskambinimo funkcija nebuvo registruota
//            Log.d(TAG, "onPause: Network callback was not registered. No need to unregister.", e)
        } catch (e: SecurityException) {
//            Log.e(TAG, "onPause: SecurityException unregistering network callback. Permission denied.", e)
        }
    }


    // Klase kuri bus susieta su Javascript.
    class WebAppInterface(
        private val mContext: Context,
        private val activity: MainActivity,
        private val webView: WebView?
    ) {

        private fun isSafe(): Boolean {
            return !activity.isFinishing && !activity.isDestroyed
        }

        @JavascriptInterface
        fun getSoundPath(soundName: String): String {
            return when (soundName) {
                "press" -> "file:///android_asset/sounds/press.wav"
                "inactive" -> "file:///android_asset/sounds/inactive.mp3"
                "correct" -> "file:///android_asset/sounds/correct.mp3"
                "incorrect" -> "file:///android_asset/sounds/incorrect.mp3"
                "winning" -> "file:///android_asset/sounds/winning.mp3"
                "loop" -> "android.resource://com.example.testbanner/raw/loop"
                "quiz" -> "android.resource://com.example.testbanner/raw/quiz"
                "loose" -> "file:///android_asset/sounds/loose.mp3"
                else -> ""
            }
        }



        @JavascriptInterface
        fun showInterstitial() {
            if (!isSafe()) return
            (mContext as Activity).runOnUiThread {
                (mContext as MainActivity).showInterstitialAd()
            }
        }

        @JavascriptInterface
        fun onInterstitialStarted() {
            if (!isSafe()) return
//            Log.d("WebAppInterface", "onInterstitialStarted() called from JavaScript")
            activity.runOnUiThread {
                activity.stopAllSounds()
            }
        }

        @JavascriptInterface
        fun onInterstitialEnded(soundToPlay: String?) {
            if (!isSafe()) return
//            Log.d("WebAppInterface", "onInterstitialEnded() called from JavaScript")
            activity.runOnUiThread {
                // Cia JavaScript turi paduoti koki garsa reikia groti
            }
        }

        @JavascriptInterface
        fun onRewardStarted() {
            if (!isSafe()) return
//            Log.d("WebAppInterface", "onRewardStarted() called from JavaScript")
            activity.runOnUiThread {
                activity.stopAllSounds()
            }
        }

        @JavascriptInterface
        fun onRewardEnded(soundToPlay: String?) {
            if (!isSafe()) return
//            Log.d("WebAppInterface", "onRewardEnded() called from JavaScript")
            activity.runOnUiThread {
                activity.playSoundBasedOn(soundToPlay ?: "")
            }
        }

        @JavascriptInterface
        fun stopAllSounds() {
            if (!isSafe()) return
            activity.runOnUiThread {
                activity.stopAllSounds()
            }
        }

        @JavascriptInterface
        fun showRewardAd() {
            if (!isSafe()) return
            (mContext as Activity).runOnUiThread {
                (mContext as MainActivity).showRewardedAd()
            }
        }

        @JavascriptInterface
        fun showToast(toast: String) {
            if (!isSafe()) return
            Toast.makeText(mContext, toast, Toast.LENGTH_SHORT).show()
        }

        @JavascriptInterface
        fun playLoopSound() {
            if (!isSafe()) return
            activity.runOnUiThread {
                activity.playLoopSound()
            }
        }

        @JavascriptInterface
        fun stopLoopSound() {
            if (!isSafe()) return
            activity.runOnUiThread {
                activity.stopLoopSound()
            }
        }

        @JavascriptInterface
        fun playQuizSound() {
            if (!isSafe()) return
            activity.runOnUiThread {
                activity.playQuizSound()
            }
        }

        @JavascriptInterface
        fun stopQuizSound() {
            if (!isSafe()) return
            activity.runOnUiThread {
                activity.stopQuizSound()
            }
        }

        @JavascriptInterface
        fun sendSupportEmail() {
            if (!isSafe()) return
            // Iškviečiame metodą iš MainActivity
            (mContext as Activity).runOnUiThread {
                (mContext as MainActivity).sendSupportEmail()
            }
        }

        @JavascriptInterface
        fun goBack() {
            if (!isSafe()) return
            // Rodo patvirtinimo langą
            (mContext as Activity).runOnUiThread {
                // Isaugome currentSound reiksme
                AlertDialog.Builder(mContext)
                    .setTitle("Exit game")
                    .setMessage("Are you sure want to exit?")
                    .setPositiveButton("Yes") { _, _ ->
                        activity.stopAllSounds()
                        // Iškviečia stopGame metodą MainActivity
                        (mContext as MainActivity).stopGame()
                    }
                    .setNegativeButton("No") { _, _ ->
                    }
                    .show()
            }
        }

    }



    //Cia sukuriamas webview ir suteikiami jam nustatymai
    @SuppressLint("SetJavaScriptEnabled")
    @Composable
    fun WebViewScreen(modifier: Modifier = Modifier, mainActivity: MainActivity, webViewInstance: WebView) {
        AndroidView(
            factory = { context ->
                webViewInstance.apply {
                    settings.javaScriptEnabled = true
                    settings.allowFileAccess = true
                    settings.allowContentAccess = true
                    settings.domStorageEnabled = true
                    settings.useWideViewPort = true
                    settings.loadWithOverviewMode = true
                    webViewClient = object : WebViewClient() {
                        override fun onPageFinished(view: WebView?, url: String?) {
                            super.onPageFinished(view, url)

                        }
                    }
                    setBackgroundColor(0)

                    // Sukuriame WebAppInterface objekta
                    val webAppInterface = WebAppInterface(context, mainActivity, this)
                    // pridedame Javascript interface
                    addJavascriptInterface(webAppInterface, "Android")
                    // paleidziama index.html
                    if (mainActivity.isInternetAvailable()) {
                        loadUrl("file:///android_asset/index.html")
                    } else {
                        Toast.makeText(context, "No internet connection.", Toast.LENGTH_SHORT).show()
                    }
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
//                            Log.d("AdMob", "Ad loaded successfully")
                        }

                        override fun onAdFailedToLoad(error: LoadAdError) {
//                            Log.e("AdMob", "Ad failed to load: ${error.message}")
                        }
                    }

                    loadAd(AdRequest.Builder().build())
                }
            }
        )
    }
}
