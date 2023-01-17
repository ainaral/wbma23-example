import {
  ImageBackground,
  // Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import List from '../components/List';
import PropTypes from 'prop-types';
import {StatusBar} from 'expo-status-bar';
import {Settings} from 'react-native-feather';

const Home = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar animated={true} backgroundColor="plum" />
      <View style={styles.header}>
        <ImageBackground
          source={require('../assets/picture.jpeg')}
          style={styles.bgImage}
          imageStyle={{borderBottomRightRadius: 65}}
        ></ImageBackground>
        <Settings
          stroke="black"
          width={32}
          height={32}
          style={styles.settings}
        />
        <Text style={styles.hello}>Hello there!</Text>
      </View>
      <List navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'powderblue',
    // paddingTop: Platform.OS === 'android' ? 30 : 0,
  },
  header: {
    height: 250,
    backgroundColor: 'powderblue',
    marginBottom: 15,
  },
  bgImage: {
    width: '100%',
    height: 250,
    paddingBottom: 10,
  },
  hello: {
    padding: 5,
    position: 'absolute',
    bottom: 20,
    left: 15,
    color: 'white',
    // setting the text background color with opacity
    backgroundColor: 'rgba(27,43,49,0.5)',
  },

  settings: {
    position: 'absolute',
    top: 20,
    right: 20,
  },

  buttonsContainer: {
    padding: 10,
  },
  textStyle: {
    textAlign: 'center',
    marginBottom: 8,
  },
});

Home.propTypes = {
  navigation: PropTypes.object,
};

export default Home;
