import { NativeModule, requireNativeModule } from 'expo';

declare class DeviceModule extends NativeModule<{}> {
  getOsVersion:() => string;
  getSdkVersion:() => string;
  getProduct:() => string;
  getBoard:() => string;
  getBrand:() => string;
  getManufacture:() => string;
  getModel:() => string;
  getDisplayMetrics:() => string[];
}

export default requireNativeModule<DeviceModule>('Device');
