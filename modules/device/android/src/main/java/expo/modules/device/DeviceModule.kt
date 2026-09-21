package expo.modules.device

import android.content.Context
import android.os.Build
import android.util.DisplayMetrics
import android.view.WindowManager
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import kotlin.math.hypot

class DeviceModule : Module() {
  private val context: Context
    get() = requireNotNull(appContext.reactContext)

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

    // --- DISPLAY METRICS ---

    Function("getDisplayMetrics") {
      val windowManager = context.getSystemService(Context.WINDOW_SERVICE) as WindowManager
      val displayMetrics = DisplayMetrics()

      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
        context.display?.getRealMetrics(displayMetrics)
      } else {
        @Suppress("DEPRECATION")
        windowManager.defaultDisplay.getRealMetrics(displayMetrics)
      }

      val widthPixels = displayMetrics.widthPixels
      val heightPixels = displayMetrics.heightPixels
      val densityDpi = displayMetrics.densityDpi

      // Hitung ukuran fisik layar (Inches)
      val widthInches = widthPixels.toDouble() / displayMetrics.xdpi
      val heightInches = heightPixels.toDouble() / displayMetrics.ydpi
      val screenInches = hypot(widthInches, heightInches)

      // Refresh rate saat ini
      val refreshRate = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
        context.display?.refreshRate ?: 60f
      } else {
        @Suppress("DEPRECATION")
        windowManager.defaultDisplay.refreshRate
      }

      // Kategori Density
      val dpiQualifier = when (densityDpi) {
        in 0..120 -> "ldpi"
        in 121..160 -> "mdpi"
        in 161..240 -> "hdpi"
        in 241..320 -> "xhdpi"
        in 321..480 -> "xxhdpi"
        else -> "xxxhdpi"
      }

      // Dukungan HDR
      val hdrTypes = mutableListOf<String>()
      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
        val display = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
          context.display
        } else {
          @Suppress("DEPRECATION")
          windowManager.defaultDisplay
        }

        val hdrCapabilities = display?.hdrCapabilities
        hdrCapabilities?.supportedHdrTypes?.forEach { type ->
          when (type) {
            1 -> hdrTypes.add("HDR10")
            2 -> hdrTypes.add("HLG")
            3 -> hdrTypes.add("Dolby Vision")
            4 -> hdrTypes.add("HDR10+")
          }
        }
      }

      // Return sebagai Map (akan otomatis terkonversi jadi Object di JavaScript)
      return@Function mapOf(
        "widthPixels" to widthPixels,
        "heightPixels" to heightPixels,
        "resolution" to "${widthPixels} x ${heightPixels} pixels",
        "densityDpi" to densityDpi,
        "densityQualifier" to dpiQualifier,
        "refreshRate" to refreshRate.toInt(),
        "physicalSizeInches" to String.format("%.1f", screenInches),
        "hdrCapabilities" to hdrTypes
      )
    }
  }
}
