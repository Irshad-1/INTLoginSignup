import React from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {TextInput, Button, StyleSheet, View, Text} from 'react-native';
import {AsyncStorage} from 'react-native';

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
      if (res.token) {
        await AsyncStorage.setItem('intechnology', res.token);
        // eslint-disable-next-line no-alert
        alert(
          JSON.stringify({
            title: 'Log In successful',
            description: 'Logged In successfully redirecting to homepage',
            status: 'success',
            duration: 4000,
            isClosable: true,
          }),
        );
        navigation.navigate('Details');
      } else {
        // eslint-disable-next-line no-alert
        alert(
          JSON.stringify({
            title: 'Invalid details',
            description: 'Wrong Login Details',
            status: 'error',
            duration: 4000,
            isClosable: true,
          }),
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    (async () => {
      let token = await AsyncStorage.getItem('intechnology');

      if (token) navigation.navigate('Details');
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
            <Text>{touched.email && errors.email}</Text>
            <TextInput
              placeholder="Enter password"
              onBlur={handleBlur('password')}
              value={values.password}
              onChangeText={handleChange('password')}
              style={styles.inputTag}
            />
            <Text>{touched.password && errors.password}</Text>
            <View styles={styles.buttonWrapper}>
              <Button onPress={handleSubmit} title="Submit" />
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
    fontSize: 20,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  formWrapper: {
    width: '50%',
  },
  buttonWrapper: {
    flexDirection: 'row',
    padding: '5',
    width: '30',
  },
});
