```javascript
// bug.js
import React, { useState, useEffect } from 'react';
import { FlatList, Text, View } from 'react-native';

const DATA = [{
  id: '1',
  title: 'Item 1'
}, {
  id: '2',
  title: 'Item 2'
}];

const MyComponent = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Simulate asynchronous data fetching
    setTimeout(() => {
      setData(DATA);
    }, 1000);
  }, []);

  const renderItem = ({ item }) => {
    // BUG: Accessing item.title before data is loaded can lead to error
    return (
      <View>
        <Text>{item.title}</Text>
      </View>
    );
  };

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
};
export default MyComponent;
```
```javascript
// bugSolution.js
import React, { useState, useEffect } from 'react';
import { FlatList, Text, View, ActivityIndicator } from 'react-native';

const DATA = [{
  id: '1',
  title: 'Item 1'
}, {
  id: '2',
  title: 'Item 2'
}];

const MyComponent = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setData(DATA);
      setLoading(false);
    }, 1000);
  }, []);

  const renderItem = ({ item }) => {
    return (
      <View>
        <Text>{item?.title ?? 'Loading...'}</Text> 
      </View>
    );
  };

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
};
export default MyComponent;
```