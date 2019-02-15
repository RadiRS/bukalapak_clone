import React, { PureComponent } from 'react';
import { Text, View } from 'react-native';
import { Input } from 'native-base';
import { HeaderBackButton } from 'react-navigation';

export class Search extends PureComponent {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: (
        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
          <HeaderBackButton
            tintColor="#E40044"
            onPress={() => {
              navigation.goBack();
            }}
          />
          <Input
            style={{ backgroundColor: 'red', flex: 1 }}
            // onChangeText={() => {}
          />
        </View>
      )
      // headerTintColor: '#fff'
    };
  };

  render() {
    return (
      <View>
        <Text> textInComponent </Text>
      </View>
    );
  }
}

export default Search;
