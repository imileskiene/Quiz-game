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
import android.net.http.SslError
import android.os.Build
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.util.Log
import android.view.View
import android.view.WindowInsets
import android.view.WindowInsetsController
import android.webkit.JavascriptInterface
import android.webkit.SafeBrowsingResponse
import android.webkit.SslErrorHandler
import android.webkit.WebChromeClient
import android.webkit.WebResourceRequest
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.Toast
import androidx.activity.ComponentActivity
import androidx.activity.OnBackPressedCallback
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.annotation.RequiresApi
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
import org.json.JSONObject
import java.net.HttpURLConnection
import java.net.URL
import com.google.android.ump.*



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


        val loopFd = resources.openRawResourceFd(R.raw.loop)
        loopMediaPlayer = MediaPlayer().apply {
            setAudioAttributes(attrs)
            setDataSource(loopFd.fileDescriptor, loopFd.startOffset, loopFd.length)
            isLooping = true
            prepare()
        }
        loopFd.close()


        val quizFd = resources.openRawResourceFd(R.raw.quiz)
        quizMediaPlayer = MediaPlayer().apply {
            setAudioAttributes(attrs)
            setDataSource(quizFd.fileDescriptor, quizFd.startOffset, quizFd.length)
            isLooping = true
            prepare()
        }
        quizFd.close()
    }

    private fun isInternetAvailable(): Boolean {
        val connectivityManager = getSystemService(Context.CONNECTIVITY_SERVICE) as ConnectivityManager
        try {
            val network = connectivityManager.activeNetwork
            if (network == null) {
                return false
            }
            val capabilities = connectivityManager.getNetworkCapabilities(network)
            if (capabilities == null) {
                return false
            }
            val hasInternet = capabilities.hasCapability(NetworkCapabilities.NET_CAPABILITY_INTERNET)
            return hasInternet
        } catch (e: SecurityException) {
            return false
        } catch (e: Exception) {
            return false
        }
    }
    private fun showNoInternetDialog() {
        AlertDialog.Builder(this)
            .setTitle("Error")
            .setMessage("No internet connection available. Please check your connection and try again.")
            .setCancelable(false)
            .setPositiveButton("Close") { dialog, _ ->
                dialog.dismiss()
                finishAffinity()
            }
            .show()
    }
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
        connectivityManager = getSystemService(CONNECTIVITY_SERVICE) as ConnectivityManager

        enableEdgeToEdge()

        val params = ConsentRequestParameters.Builder()
            .setTagForUnderAgeOfConsent(false)
            .build()

        val consentInformation = UserMessagingPlatform.getConsentInformation(this)
        consentInformation.requestConsentInfoUpdate(
            this,
            params,
            {
                if (consentInformation.isConsentFormAvailable) {
                    UserMessagingPlatform.loadAndShowConsentFormIfRequired(this) { formError ->
                        formError?.let {
//                            Log.w("UMP", "Formos klaida: ${it.message}")
                        }
                    }
                }
            },
            { formError ->
//                Log.w("UMP", "Užklausos klaida: ${formError.message}")
            }
        )


        if (!isInternetAvailable()) {
            showNoInternetDialog()
            return
        }

        if (!isInternetAvailable()) {
            showNoInternetDialog()
            return
        } else {
//            Log.d(TAG, "Interneto ryšys PASIEKIAMAS paleidžiant.")
        }

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
                    Spacer(modifier = Modifier.statusBarsPadding())

                    Box(modifier = Modifier.weight(1f)) {
                        WebViewScreen(mainActivity = this@MainActivity, webViewInstance = webView!!)
                    }
                    AnimatedVisibility(
                        visible = isBannerVisibleState.value,
                        exit = fadeOut(animationSpec = tween(durationMillis = 80))
                    ) {
                        Box(
                            modifier = Modifier
                                .fillMaxWidth()
                                .navigationBarsPadding()
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

        val callback = object : OnBackPressedCallback(true) {
            override fun handleOnBackPressed() {
                if (webView != null) {
                    webView!!.evaluateJavascript("window.dispatchEvent(new Event('backbutton'))", null)
                } else {
                    finish()
                }
            }
        }
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
            window.insetsController?.let { controller ->
                controller.hide(WindowInsets.Type.systemBars())
                controller.systemBarsBehavior =
                    WindowInsetsController.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE
            }
        } else {
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

    private fun loadInterstitialAd() {
        val adRequest = AdRequest.Builder().build()
        InterstitialAd.load(
            this,
            "ca-app-pub-3940256099942544/1033173712",
            adRequest,
            object : InterstitialAdLoadCallback() {
                override fun onAdLoaded(ad: InterstitialAd) {
                    interstitialAd = ad
                }

                override fun onAdFailedToLoad(adError: LoadAdError) {
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

                    rewardedAd?.fullScreenContentCallback =
                        object : FullScreenContentCallback() {
                            override fun onAdShowedFullScreenContent() {
//                                Log.d(TAG, "Rewarded ad showed")
                                stopAllSounds()
                                webView?.evaluateJavascript("javascript:onRewardStarted()", null)
                            }

                            override fun onAdDismissedFullScreenContent() {
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
                                isBannerVisibleState.value = true
                                loadRewardedAd()
                            }

                            override fun onAdFailedToShowFullScreenContent(adError: AdError) {
                                rewardedAd = null
                                isBannerVisibleState.value = true
                                webView?.evaluateJavascript("javascript:removeOverlay();", null)
//                                webView?.evaluateJavascript("javascript:showAdError()", null)
                                webView?.evaluateJavascript("javascript:onRewardEnded('')", null)
                            }
                        }
                }

                override fun onAdFailedToLoad(adError: LoadAdError) {
                    rewardedAd = null
                    isBannerVisibleState.value = true
                    webView?.evaluateJavascript("javascript:removeOverlay();", null)
//                    webView?.evaluateJavascript("javascript:showAdError()", null)
                    webView?.evaluateJavascript("javascript:onRewardEnded('')", null)

                }
            }
        )
    }


    private fun showRewardedAd() {
        if (rewardedAd != null) {
            isBannerVisibleState.value = false
            rewardedAd?.fullScreenContentCallback = object : FullScreenContentCallback() {
                override fun onAdShowedFullScreenContent() {
                    stopAllSounds()
                    webView?.evaluateJavascript("javascript:onRewardStarted()", null)
                }

                override fun onAdDismissedFullScreenContent() {
                    val soundToPlay = currentSound
                    stopAllSounds()
                    Handler(Looper.getMainLooper()).postDelayed({
                        webView?.evaluateJavascript("javascript:removeOverlay();", null)
                    webView?.evaluateJavascript(
                        "javascript:enableMobileHelpAfterReward('$soundToPlay')",
                        null
                    )
                    webView?.evaluateJavascript("javascript:onRewardEnded('$soundToPlay')", null)
                    }, 150)
                    rewardedAd = null
                    Handler(Looper.getMainLooper()).postDelayed({
                        isBannerVisibleState.value = true
                    }, 300)
                    loadRewardedAd()
                }

                override fun onAdFailedToShowFullScreenContent(adError: AdError) {
                    rewardedAd = null
                    isBannerVisibleState.value = true
                    webView?.evaluateJavascript("javascript:removeOverlay();", null)
                    webView?.evaluateJavascript("javascript:showAdError()", null)
                    webView?.evaluateJavascript("javascript:onRewardEnded('')", null)
                }
            }
            rewardedAd?.show(this) { rewardItem ->
                val rewardAmount = rewardItem.amount
                val rewardType = rewardItem.type
            }
        } else {
            webView?.evaluateJavascript("javascript:removeOverlay();", null)
            webView?.evaluateJavascript("javascript:showAdError()", null)
            webView?.evaluateJavascript("javascript:onRewardEnded('')", null)

        }
    }

    fun showInterstitialAd() {
        if (interstitialAd != null) {
            isBannerVisibleState.value = false
            interstitialAd?.fullScreenContentCallback = object : FullScreenContentCallback() {
                override fun onAdDismissedFullScreenContent() {
                    stopAllSounds()

                    Handler(Looper.getMainLooper()).postDelayed({
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
                    interstitialAd = null
                    webView?.evaluateJavascript("javascript:removeOverlay();", null)
                    webView?.evaluateJavascript("javascript:callNextContainer();", null)
                    isBannerVisibleState.value = true
                }

                override fun onAdShowedFullScreenContent() {
                    stopAllSounds()
                    webView?.evaluateJavascript("javascript:onInterstitialStarted()", null)
                }
            }
            interstitialAd?.show(this)
        } else {
            webView?.evaluateJavascript("javascript:removeOverlay();", null)
            webView?.evaluateJavascript("javascript:callNextContainer();", null)
        }
    }

    fun sendSupportEmail() {
        val recipient = "inbit.dev@gmail.com"
        val subject = "Quizly: Color Challenge"

        val packageInfo = packageManager.getPackageInfo(packageName, 0)
        val versionName = packageInfo.versionName

        val androidVersion = Build.VERSION.RELEASE
        val deviceModel = "${Build.MANUFACTURER} ${Build.MODEL}"

        val body = """
        
        --- App Info ---
        App Version: $versionName
        Android Version: $androidVersion
        Device: $deviceModel
    """.trimIndent()

        val emailIntent = Intent(Intent.ACTION_SEND).apply {
            type = "message/rfc822"
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
        finish()
    }

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
            }
        }
    }

    override fun onDestroy() {
        super.onDestroy()
        loopMediaPlayer?.release()
        loopMediaPlayer = null
        quizMediaPlayer?.release()
        quizMediaPlayer = null
        webView?.destroy()
        webView = null
    }

    override fun onResume() {
        super.onResume()
        if (isInternetAvailable()) {
            val request = NetworkRequest.Builder()
                .addCapability(NetworkCapabilities.NET_CAPABILITY_INTERNET)
                .build()
            try {
                connectivityManager.registerNetworkCallback(request, networkCallback)
            } catch (e: SecurityException) {
            }
        } else {
//            Log.d(TAG, "onResume: Internet not available. Not registering network callback.")
        }
        webView?.evaluateJavascript("resumeLastSound()", null)
    }

    override fun onPause() {
        super.onPause()
        try {
            connectivityManager.unregisterNetworkCallback(networkCallback)
        } catch (e: IllegalArgumentException) {
        } catch (e: SecurityException) {
        }
        webView?.evaluateJavascript("pauseAllSounds()", null)
    }

    class WebAppInterface(
        private val mContext: Context,
        private val activity: MainActivity,
        private val webView: WebView?
    ) {

        private fun isSafe(): Boolean {
            return !(activity.isFinishing || activity.isDestroyed || webView == null)
        }

        @JavascriptInterface
        fun getSoundPath(soundName: String): String {
            return when (soundName) {
                "press" -> "file:///android_asset/sounds/press.wav"
                "inactive" -> "file:///android_asset/sounds/inactive.mp3"
                "correct" -> "file:///android_asset/sounds/correct.mp3"
                "incorrect" -> "file:///android_asset/sounds/incorrect.mp3"
                "winning" -> "file:///android_asset/sounds/winning.mp3"
                "loop" -> "android.resource://com.inbit.quizColorChallenge/raw/loop"
                "quiz" -> "android.resource://com.inbit.quizColorChallenge/raw/quiz"
                "loose" -> "file:///android_asset/sounds/loose.mp3"
                else -> ""
            }
        }

        @JavascriptInterface
        fun getQuestionsFromAPI(categoryId: String, difficulty: String, callbackName: String) {
//            Log.d("WebAppInterface", "getQuestionsFromAPI called with categoryId: $categoryId, difficulty: $difficulty, callbackName: $callbackName")
            val apiUrl =
                "https://opentdb.com/api.php?amount=10&category=$categoryId&difficulty=$difficulty&type=multiple"
//            Log.d("WebAppInterface", "API URL: $apiUrl")
            Thread {
                try {
                    val connection = URL(apiUrl).openConnection() as HttpURLConnection
                    connection.requestMethod = "GET"
                    connection.connectTimeout = 5000
                    connection.readTimeout = 5000

                    val responseText = connection.inputStream.bufferedReader().use { it.readText() }
//                    Log.d("WebAppInterface", "API Response: $responseText")

                    if (isSafe()) {
                        (mContext as Activity).runOnUiThread {
//                            Log.d("WebAppInterface", "Calling JS callback: $callbackName with response")
                            webView?.evaluateJavascript(
                                "$callbackName(${JSONObject.quote(responseText)})",
                                null
                            )
                        }
                    }

                } catch (e: Exception) {
//                    Log.e("WebAppInterface", "Error fetching from API: ${e.message}", e)
                    e.printStackTrace()
                    if (isSafe()) {
                        (mContext as Activity).runOnUiThread {
//                            Log.d("WebAppInterface", "Calling JS callback: $callbackName with null due to error")
                            webView?.evaluateJavascript("$callbackName(null)", null)
                        }
                    }
                }
            }.start()
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
            activity.runOnUiThread {
                activity.stopAllSounds()
            }
        }

        @JavascriptInterface
        fun onInterstitialEnded(soundToPlay: String?) {
            if (!isSafe()) return
            activity.runOnUiThread {
            }
        }

        @JavascriptInterface
        fun onRewardStarted() {
            if (!isSafe()) return
            activity.runOnUiThread {
                activity.stopAllSounds()
            }
        }

        @JavascriptInterface
        fun onRewardEnded(soundToPlay: String?) {
            if (!isSafe()) return
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
            (mContext as Activity).runOnUiThread {
                (mContext as MainActivity).sendSupportEmail()
            }
        }

        @JavascriptInterface
        fun goBack() {
            if (!isSafe()) return
            (mContext as Activity).runOnUiThread {
                AlertDialog.Builder(mContext)
                    .setTitle("Exit game")
                    .setMessage("Are you sure want to exit?")
                    .setPositiveButton("Yes") { _, _ ->
                        activity.stopAllSounds()
                        (mContext as MainActivity).stopGame()
                    }
                    .setNegativeButton("No") { _, _ ->
                    }
                    .show()
            }
        }

    }


    @SuppressLint("SetJavaScriptEnabled")
    @Composable
    fun WebViewScreen(modifier: Modifier = Modifier, mainActivity: MainActivity, webViewInstance: WebView) {
        AndroidView(
            factory = { context ->
                webViewInstance.apply {
                    settings.javaScriptEnabled = true
                    settings.safeBrowsingEnabled = true
                    settings.allowFileAccess = false
                    settings.allowContentAccess = true
                    settings.domStorageEnabled = true
                    settings.useWideViewPort = true
                    settings.loadWithOverviewMode = true
                    webViewClient = object : WebViewClient() {
                        override fun shouldOverrideUrlLoading(
                            view: WebView?,
                            request: WebResourceRequest?
                        ): Boolean {
                            val url = request?.url.toString()
                            return if (url.startsWith("https://")) {
                                false
                            } else {
                                Toast.makeText(context, "Blocked insecure content", Toast.LENGTH_SHORT).show()
                                true
                            }
                        }

                        override fun onReceivedSslError(
                            view: WebView?,
                            handler: SslErrorHandler?,
                            error: SslError?
                        ) {
                            handler?.cancel()
                            Toast.makeText(context, "SSL error - page blocked", Toast.LENGTH_SHORT).show()
                        }

                        override fun onPageFinished(view: WebView?, url: String?) {
                            super.onPageFinished(view, url)
//                            Log.d("WebView", "Page loaded: $url")
                        }
                        @RequiresApi(Build.VERSION_CODES.O_MR1)
                        override fun onSafeBrowsingHit(
                            view: WebView,
                            request: WebResourceRequest,
                            threatType: Int,
                            callback: SafeBrowsingResponse
                        ) {
                            Toast.makeText(view.context, "Warning: Potential threat found. This page has been blocked for your safety.", Toast.LENGTH_LONG).show()
                            callback.backToSafety(true)
                        }
                    }

                    webChromeClient = WebChromeClient()
                    setBackgroundColor(0)

                    val webAppInterface = WebAppInterface(context, mainActivity, this)
                    addJavascriptInterface(webAppInterface, "Android")
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
                    adUnitId = "ca-app-pub-3940256099942544/6300978111"
                    setAdSize(AdSize.BANNER)

                    adListener = object : AdListener() {
                        override fun onAdLoaded() {
                        }

                        override fun onAdFailedToLoad(error: LoadAdError) {
                        }
                    }

                    loadAd(AdRequest.Builder().build())
                }
            }
        )
    }
}
