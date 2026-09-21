import { NativeModule, requireNativeModule } from 'expo';

declare class BatteryModule extends NativeModule<{}> {
    getBatteryLevel:() => number;
    getTemp:() => number;
    getVoltage:() => number;
    getBatteryType:() => string;
}

export default requireNativeModule<BatteryModule>('Battery');
