const List = () => {
    return {
        <FlatList
        data={mediaArray}
        renderItem={({item}) => {
          return (
            <TouchableOpacity>
              <Image
                style={{width: 100, height: 100}}
                source={{uri: item.thumbnails.w160}}
              />
              <View>
                <Text>{item.title}</Text>
                <Text>{item.description}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    };
}

