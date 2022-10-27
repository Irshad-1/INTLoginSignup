import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Button,
  Text,
  AsyncStorage,
} from 'react-native';
import {DataTable} from 'react-native-paper';

export const Details = ({navigation}) => {
  const [data, setData] = React.useState({});
  const [userData, setUserData] = React.useState([]);
  const [isProjectManager, setIsProjectManager] = React.useState(false);

  async function getUser(token) {
    try {
      let res = await fetch('https://int-signup-login.herokuapp.com/getuser', {
        method: 'GET',
        headers: {
          token,
        },
      });
      res = await res.json();
      console.log(res);
      setData(res);
      if (res.role === 'project manager') {
        console.log('Hello');
        setIsProjectManager(true);
        getUsersData(token);
      }
    } catch (error) {
      console.log(error);
    }
  }
  const handleLogout = async () => {
    await AsyncStorage.removeItem('intechnology');

    navigation.navigate('Login');
  };
  const getUsersData = async token => {
    try {
      let res = await fetch('https://int-signup-login.herokuapp.com/getall', {
        method: 'GET',
        headers: {
          token,
        },
      });
      res = await res.json();
      console.log(res);
      setUserData(res);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    (async () => {
      let token = await AsyncStorage.getItem('intechnology');

      if (!token) navigation.navigate('Login');
      else {
        getUser(token);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <ScrollView>
      <View styles={styles.profileDetails}>
        <Button styles={styles.button} onPress={handleLogout} title="LOGOUT" />
        <Text styles={styles.details}>{`Name:    ${data.name}`}</Text>
        <Text styles={styles.details}>{`Age:    ${data.age}`}</Text>
        <Text styles={styles.details}>{`Gender:    ${data.gender}`}</Text>
        <Text styles={styles.details}>{`Role:    ${data.role}`}</Text>
        <Text styles={styles.details}>{`Email:    ${data.email}`}</Text>
      </View>
      <ScrollView>
        {isProjectManager && (
          <View styles={styles.table}>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>Id</DataTable.Title>
                <DataTable.Title>Name</DataTable.Title>
                <DataTable.Title>Age</DataTable.Title>
                <DataTable.Title>Gender</DataTable.Title>
                <DataTable.Title>Role</DataTable.Title>
                <DataTable.Title>Email</DataTable.Title>
              </DataTable.Header>
              {userData.map((ele, index) => {
                return (
                  <DataTable.Row key={index}>
                    <DataTable.Cell>{index + 1}</DataTable.Cell>
                    <DataTable.Cell>{ele.name}</DataTable.Cell>
                    <DataTable.Cell>{ele.age}</DataTable.Cell>
                    <DataTable.Cell>{ele.gender}</DataTable.Cell>
                    <DataTable.Cell>{ele.role}</DataTable.Cell>
                    <DataTable.Cell>{ele.email}</DataTable.Cell>
                  </DataTable.Row>
                );
              })}
            </DataTable>
          </View>
        )}
      </ScrollView>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  profileDetails: {
    width: '80%',
    margin: '40 auto',
  },
  formWrapper: {
    width: '80%',
    margin: 'auto',
    backgroundColor: 'green',
  },
  table: {
    width: '100%',
    margin: '40 auto',
  },
  button: {
    position: 'absolute',
    right: '0',
    top: '0',
    backgroundColor: 'red',
  },
  details: {
    size: 'lg',
    color: '#256D85',
  },
});
