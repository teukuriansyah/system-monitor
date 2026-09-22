import { NativeModule, requireNativeModule } from 'expo';

declare class BatteryModule extends NativeModule<{}> {
    getBatteryLevel:() => number;
    getTemp:() => number;
    getVoltage:() => number;
    getBatteryType:() => string;
    getBatterySoc:() => number;
    getDisplayRefreshRate:() => number;
}

export default requireNativeModule<BatteryModule>('Battery');
