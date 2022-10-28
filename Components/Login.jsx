import React from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {TextInput, Button, StyleSheet, View, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Login = ({navigation}) => {
  const handleLogin = async ({email, password}) => {
    try {
      let res = await fetch('https://int-signup-login.herokuapp.com/login', {
        method: 'POST',
        body: JSON.stringify({email, password}),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      res = await res.json();
      console.log(res.token);
      if (res.token) {
        res = await AsyncStorage.setItem('intechnology', res.token);
        console.log('res', res);
        // eslint-disable-next-line no-alert
        alert(
          JSON.stringify({
            title: 'Log In successful',
            description: 'Logged In successfully redirecting to homepage',
          }),
        );
        navigation.navigate('Details');
      } else {
        // eslint-disable-next-line no-alert
        alert(
          JSON.stringify({
            title: 'Invalid details',
            description: 'Wrong Login Details',
          }),
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    (async () => {
      try {
        let token = await AsyncStorage.getItem('intechnology');

        if (token) navigation.navigate('Details');
      } catch (error) {
        console.log(error);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View styles={styles.formWrapper}>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={values => {
          handleLogin(values);
        }}
        validationSchema={Yup.object({
          email: Yup.string().email().required('Required'),
          password: Yup.string().required('Required'),
        })}>
        {({
          handleChange,
          errors,
          handleBlur,
          values,
          handleSubmit,
          touched,
        }) => (
          <View>
            <TextInput
              placeholder="Enter email"
              onBlur={handleBlur('email')}
              value={values.email}
              onChangeText={handleChange('email')}
              style={styles.inputTag}
            />
            <Text style={styles.error}>{touched.email && errors.email}</Text>
            <TextInput
              placeholder="Enter password"
              onBlur={handleBlur('password')}
              value={values.password}
              onChangeText={handleChange('password')}
              style={styles.inputTag}
            />
            <Text style={styles.error}>
              {touched.password && errors.password}
            </Text>
            <View style={styles.buttonWrapper}>
              <Button
                style={styles.buttonStyle}
                onPress={handleSubmit}
                title="Submit"
              />
              <Button
                onPress={() => {
                  navigation.navigate('Signup');
                }}
                title="Signup"
              />
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  inputTag: {
    fontSize: 25,
    borderWidth: 2,
    borderColor: '#ddd',
    color: 'black',
    backgroundColor: 'white',
  },
  error: {
    color: 'red',
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});
