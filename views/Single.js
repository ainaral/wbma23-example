import React from 'react';
import {StyleSheet, SafeAreaView, Text, Image} from 'react-native';
import PropTypes from 'prop-types';
import {uploadsUrl} from '../utils/variables';

const Single = ({route}) => {
  console.log(route.params);
  const {title, description, filename, time_added: timeAdded} = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Image style={styles.image} source={{uri: uploadsUrl + filename}} />
      <Text style={styles.text}>{timeAdded}</Text>
      <Text style={styles.description}>{description}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'powderblue',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
  image: {
    width: 200,
    height: 300,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    paddingBottom: 5,
  },
  timeAdded: {
    fontSize: 14,
  },
  description: {
    paddingTop: 10,
    fontSize: 20,
    padding: 20,
  },
});

Single.propTypes = {
  route: PropTypes.object,
};

export default Single;
