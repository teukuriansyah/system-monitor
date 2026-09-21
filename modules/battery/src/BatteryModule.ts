import { NativeModule, requireNativeModule } from 'expo';

declare class BatteryModule extends NativeModule<{}> {}

export default requireNativeModule<BatteryModule>('Battery');
