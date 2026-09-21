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
  }
}
