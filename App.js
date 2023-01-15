import {StatusBar} from 'expo-status-bar';
import {Platform, SafeAreaView, StyleSheet} from 'react-native';
import List from './components/List';

const App = () => {
  // console.log('App starting!')
  return (
    <SafeAreaView style={styles.container}>
      <List />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? 30 : 0,
  },
});
