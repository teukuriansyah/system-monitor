package expo.modules.device

import android.content.Context
import android.os.Build
import android.util.DisplayMetrics
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
      val context = appContext.reactContext ?: return@Function Pair(0, 0)
      val windowManager = context.getSystemService(Context.WINDOW_SERVICE) as WindowManager

      return@Function if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
        // Modern approach untuk Android 11 (API 30+)
        val bounds = windowManager.currentWindowMetrics.bounds
        Pair(bounds.width(), bounds.height())
      } else {
        // Fallback untuk versi Android lama
        val displayMetrics = DisplayMetrics()
        @Suppress("DEPRECATION")
        windowManager.defaultDisplay.getMetrics(displayMetrics)
        Pair(displayMetrics.widthPixels, displayMetrics.heightPixels)
      }
    }

    Function("getDpi") {
      val context = appContext.reactContext ?: return@Function 0
      val displayMetrics = context.resources.displayMetrics
      
      // Mengembalikan DPI layar sebagai angka Int (misal: 160, 320, 480 dpi)
      return@Function displayMetrics.densityDpi
    }

  }
}
