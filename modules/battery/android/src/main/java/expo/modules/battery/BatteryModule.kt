package expo.modules.battery

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import android.content.Intent
import android.content.IntentFilter
import android.os.BatteryManager
import android.content.Context

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
          tempInTenths / 10.0f // Konversi ke Celsius (°C)
      } else {
          null // Suhu tidak tersedia
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
  }
}
