import React from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {TextInput, Button, StyleSheet, View, Text} from 'react-native';

export const Login = () => {
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
          handleSubmit,
          values,
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
            <Button onPress={handleSubmit} title="Submit" />
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
  },
  formWrapper: {
    width: '80%',
    margin: 'auto',
    backgroundColor: 'green',
  },
});