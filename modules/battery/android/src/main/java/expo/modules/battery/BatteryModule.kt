package expo.modules.battery

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import android.content.Intent
import android.content.IntentFilter
import android.os.BatteryManager
import android.content.Context
import android.view.WindowManager
import android.os.Build

class BatteryModule : Module() {
  private val context: Context
    get() = requireNotNull(appContext.reactContext)
    
  override fun definition() = ModuleDefinition {
    Name("Battery")

    Function("getBatteryLevel") {
      val batteryStatus: Intent? = IntentFilter(Intent.ACTION_BATTERY_CHANGED).let { ifilter ->
        context.registerReceiver(null, ifilter)
      }
      val batteryPct: Float? = batteryStatus?.let { intent ->
        val level: Int = intent.getIntExtra(BatteryManager.EXTRA_LEVEL, -1)
        val scale: Int = intent.getIntExtra(BatteryManager.EXTRA_SCALE, -1)
        level * 100 / scale.toFloat()
      }
      return@Function batteryPct
    }

    Function("getTemp") {
      val batteryStatus: Intent? = IntentFilter(Intent.ACTION_BATTERY_CHANGED).let { ifilter ->
        context.registerReceiver(null, ifilter)
      }

      val tempInTenths = batteryStatus?.getIntExtra(BatteryManager.EXTRA_TEMPERATURE, -1) ?: -1
      return@Function if (tempInTenths != -1) {
          tempInTenths / 10.0f
      } else {
          null
      }
    }

    Function("getVoltage") {
      val batteryStatus: Intent? = IntentFilter(Intent.ACTION_BATTERY_CHANGED).let { ifilter ->
          context.registerReceiver(null, ifilter)
      }
      val voltageMv = batteryStatus?.getIntExtra(BatteryManager.EXTRA_VOLTAGE, -1) ?: -1
        
      val voltageVolts = if (voltageMv != -1) {
        voltageMv / 1000.0f
      } else {
        0.0f
      }
      return@Function voltageVolts
    }

    Function("getBatteryType") {
      val batteryStatus: Intent? = IntentFilter(Intent.ACTION_BATTERY_CHANGED).let { ifilter ->
          context.registerReceiver(null, ifilter)
      }
      val tech = batteryStatus?.getStringExtra(BatteryManager.EXTRA_TECHNOLOGY) ?: "Unknown"
      return@Function tech
    }

    Function("getBatterySoc") {
      val batteryManager = context.getSystemService(Context.BATTERY_SERVICE) as BatteryManager
      return@Function batteryManager.getIntProperty(BatteryManager.BATTERY_PROPERTY_CAPACITY) 
    }

    Function("getDisplayRefreshRate") {
        val currentActivity = appContext.currentActivity 
            ?: throw IllegalStateException("Activity is not available")

        return@Function if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            currentActivity.display?.mode?.refreshRate ?: 60.0f
        } else {
            val windowManager = currentActivity.getSystemService(Context.WINDOW_SERVICE) as WindowManager
            @Suppress("DEPRECATION")
            windowManager.defaultDisplay.refreshRate
        }
    }
  }
}
