import React from 'react';
import PropTypes from 'prop-types';
import {uploadsUrl} from '../utils/variables';
import {Text, Card, ListItem} from '@rneui/themed';

const Single = ({route}) => {
  console.log(route.params);
  const {
    title,
    description,
    filename,
    time_added: timeAdded,
    user_id: userId,
  } = route.params;
  return (
    <Card>
      <Card.Title>{title}</Card.Title>
      <Card.Divider />
      <Card.Image source={{uri: uploadsUrl + filename}} />
      <ListItem>
        <Text>{description}</Text>
      </ListItem>
      <ListItem>
        <Text>uploaded at: {new Date(timeAdded).toLocaleString('fi-FI')}</Text>
      </ListItem>
      <ListItem>
        <Text>by user: {userId}</Text>
      </ListItem>
    </Card>
  );
};

Single.propTypes = {
  route: PropTypes.object,
};

export default Single;
