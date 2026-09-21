import { registerWebModule, NativeModule } from 'expo';

// BatteryModule is not available on the web platform.
class BatteryModule extends NativeModule<{}> {}

export default registerWebModule(BatteryModule, 'BatteryModule');
