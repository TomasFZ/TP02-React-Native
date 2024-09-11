import com.rt2zz.reactnativecontacts.ReactNativeContacts;  // Importa el paquete
import com.zoontek.rnpermissions.RNPermissionsPackage;
@Override
protected List<ReactPackage> getPackages() {
  packages.add(new RNPermissionsPackage());
  return Arrays.<ReactPackage>asList(
      new MainReactPackage(),
      new ReactNativeContacts()  // Añádelo aquí
  );
}

