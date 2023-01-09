import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { FancyAlert } from 'react-native-expo-fancy-alerts';

const fancyPopup = () => {
  const [visible, setVisible] = React.useState(false);
  const toggleAlert = React.useCallback(() => {
    setVisible(!visible);
  }, [visible]);

  return (
    <View>
      <TouchableOpacity onPress={toggleAlert}>
        <Text>Tap me</Text>
      </TouchableOpacity>

      <FancyAlert
        visible={visible}
        icon={<View style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'red',
          borderRadius: 50,
          width: '100%',
        }}><Text>🤓</Text></View>}
        style={{ backgroundColor: 'white' }}
      >
        <Text style={{ marginTop: -16, marginBottom: 32 }}>Hello there</Text>
      </FancyAlert>
    </View>
  )
}

export default fancyPopup;