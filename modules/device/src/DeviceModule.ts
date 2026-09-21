import { requireNativeModule } from 'expo-modules-core';

interface DeviceModuleType {
  getOsVersion(): string;
  getSdkVersion(): string;
  getProduct(): string;
  getBoard(): string;
  getBrand(): string;
  getManufacture(): string;
  getModel(): string;
}

export default requireNativeModule<DeviceModuleType>('Device');