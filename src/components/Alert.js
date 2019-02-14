import { Alert } from 'react-native';

const AlertComponent = () => {
  Alert.alert(
    'Hapus Barang',
    'Apa kamu yakin ingin menghapus barang yang terpilih ?',
    [
      {
        text: 'Batal',
        onPress: () => false,
        style: 'cancel'
      },
      { text: 'Hapus', onPress: () => true }
    ],
    { cancelable: false }
  );
};

export default AlertComponent;
