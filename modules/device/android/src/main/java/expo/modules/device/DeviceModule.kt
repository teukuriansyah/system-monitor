package expo.modules.device

import android.content.Context
import android.os.Build
import android.util.DisplayMetrics
import androidx.compose.ui.platform.LocalDensity
import android.view.WindowManager
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import kotlin.math.hypot


class DeviceModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("Device")

    Function("getOsVersion") {
      return@Function Build.VERSION.RELEASE
    }
    
    Function("getSdkVersion") {
      return@Function Build.VERSION.SDK_INT
    }
    
    Function("getProduct") {
      return@Function Build.PRODUCT
    }
    
    Function("getBoard") {
      return@Function Build.BOARD
    }
    
    Function("getBrand") {
      return@Function Build.BRAND
    }
    
    Function("getManufacture") {
      return@Function Build.MANUFACTURER
    }
    
    Function("getModel") {
      return@Function Build.MODEL
    }

    Function("getResolution") {
      val windowManager = context.getSystemService(Context.WINDOW_SERVICE) as WindowManager
    
    return@Function if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
        // Modern approach for Android 11 (API 30) and above
        val metrics = windowManager.currentWindowMetrics
        val bounds = metrics.bounds
        Pair(bounds.width(), bounds.height())
    } else {
        // Legacy fallback approach for older Android versions
        val displayMetrics = DisplayMetrics()
        @Suppress("DEPRECATION")
        windowManager.defaultDisplay.getMetrics(displayMetrics)
        Pair(displayMetrics.widthPixels, displayMetrics.heightPixels)
    }
    }

    Function("getDpi") {
      val density = LocalDensity.current
    
    // Convert 16dp to raw pixels (Float)
    val pxValue = with(density) { 16.dp.toPx() }
    
    // Convert 48px back to DP
    val dpValue = with(density) { 48.toDp() }

    return@Function dpValue
    }
  }
}
