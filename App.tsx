import React, {useRef} from 'react';
import {View, Button, SafeAreaView, Text, StyleSheet} from 'react-native';
import Modalception, {ModalceptionMethods} from './Modalception';

const App = () => {
  const modalceptionRef = useRef<ModalceptionMethods | null>(null);

  const customContent3 = (
    <SafeAreaView
      style={{
        flex: 1,
        borderColor: 'green',
        borderWidth: 1,
        backgroundColor: 'white',
      }}>
      <Text style={{fontSize: 100, fontWeight: 'bold'}}>
        This is a custom UI for Modal 3
      </Text>
      <Button
        title="Close Modal 3"
        onPress={() => {
          modalceptionRef.current?.hide();
        }}
      />
    </SafeAreaView>
  );

  const customContent2 = (
    <SafeAreaView
      style={{
        flex: 1,
        borderColor: 'yellow',
        borderWidth: 1,
        backgroundColor: 'white',
      }}>
      <Text style={{fontSize: 100, fontWeight: 'bold'}}>
        This is a custom UI for Modal 2
      </Text>
      <Button
        title="Open Modal 3"
        onPress={() => {
          modalceptionRef.current?.show(customContent3);
        }}
      />
      <Button
        title="Close Modal 2"
        onPress={() => {
          modalceptionRef.current?.hide();
        }}
      />
    </SafeAreaView>
  );

  const customContent1 = (
    <SafeAreaView
      style={{
        flex: 1,
        borderColor: 'red',
        borderWidth: 1,
        backgroundColor: 'white',
      }}>
      <Text style={{fontSize: 100, fontWeight: 'bold'}}>
        This is a custom UI for Modal 1
      </Text>
      <Button
        title="Open Modal 2"
        onPress={() => {
          modalceptionRef.current?.show(customContent2);
        }}
      />
      <Button
        title="Close Modal 1"
        onPress={() => {
          modalceptionRef.current?.hide();
        }}
      />
    </SafeAreaView>
  );

  const openModalWithText = () => {
    modalceptionRef.current?.show(customContent1);
  };

  return (
    <View style={styles.container}>
      <Button title="Open Modal 1" onPress={openModalWithText} />
      <Modalception ref={modalceptionRef} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
