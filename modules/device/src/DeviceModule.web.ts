import { registerWebModule, NativeModule } from 'expo';

// DeviceModule is not available on the web platform.
class DeviceModule extends NativeModule<{}> {}

export default registerWebModule(DeviceModule, 'DeviceModule');
