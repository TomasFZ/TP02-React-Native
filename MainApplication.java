import com.rt2zz.reactnativecontacts.ReactNativeContacts;  // Importa el paquete

@Override
protected List<ReactPackage> getPackages() {
  return Arrays.<ReactPackage>asList(
      new MainReactPackage(),
      new ReactNativeContacts()  // Añádelo aquí
  );
}
