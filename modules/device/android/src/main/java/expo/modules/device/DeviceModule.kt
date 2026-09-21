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
  }
}
