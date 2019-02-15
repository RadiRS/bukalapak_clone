import { Alert } from 'react-native';
import React from 'react';
import AwesomeAlert from 'react-native-awesome-alerts';

const AlertComponent = props => {
  const { show } = props;

  return (
    <AwesomeAlert
      alertContainerStyle={{
        justifyContent: 'center',
        alignItems: 'center',
        heigth: '100%'
      }}
      titleStyle={{ fontSize: 35, marginHorizontal: 30 }}
      messageStyle={{ fontSize: 25, textAlign: 'center' }}
      confirmButtonTextStyle={{ fontSize: 25, width: 100, textAlign: 'center' }}
      cancelButtonTextStyle={{ fontSize: 25, width: 100, textAlign: 'center' }}
      show={show}
      showProgress={false}
      title="Hapus Barang"
      message="Apa kamu yakin ingin menghapus barang yang terpilih ?"
      closeOnTouchOutside={true}
      closeOnHardwareBackPress={false}
      showCancelButton={true}
      showConfirmButton={true}
      cancelText="Batal"
      confirmText="Hapus"
      confirmButtonColor="#DD6B55"
      onCancelPressed={() => {
        this.hideAlert();
      }}
      onConfirmPressed={() => {
        this.hideAlert();
      }}
    />
  );
};

export default AlertComponent;
