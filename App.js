import {StatusBar} from 'expo-status-bar';
import {FlatList, StyleSheet, View} from 'react-native';

const App = () => {
  //console.log('App starting!')
  return (
    <>
      <SafeAreaView style={styles.container}>
        <List />
      </SafeAreaView>
      <StatusBar style="auto" />
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
