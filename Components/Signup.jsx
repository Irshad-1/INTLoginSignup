import React from 'react';

import {Formik, Field} from 'formik';
import {TextInput, Button, StyleSheet, View, Text} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

import * as Yup from 'yup';

export const Signup = () => {
  const handleSignUp = async ({name, age, gender, role, email, password}) => {
    try {
      let res = await fetch(
        'https://int-signup-login.herokuapp.com/createuser',
        {
          method: 'POST',
          body: JSON.stringify({name, age, role, gender, email, password}),
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      let data = await res.json();
      if (data.message) {
        // eslint-disable-next-line no-alert
        alert(
          JSON.stringify({
            title: 'Email already Exist',
            description: 'User already exist with this email ID',
            status: 'error',
            duration: 4000,
            isClosable: true,
          }),
        );
      } else {
        // eslint-disable-next-line no-alert
        alert(
          JSON.stringify({
            title: 'Account created',
            description: 'Account created successfully going to login Page',
            status: 'success',
            duration: 4000,
            isClosable: true,
          }),
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View styles={styles.formWrapper}>
      <Formik
        initialValues={{
          name: '',
          age: 0,
          gender: 'male',
          role: 'developer',
          email: '',
          password: '',
        }}
        onSubmit={values => {
          handleSignUp(values);
        }}
        validationSchema={Yup.object({
          name: Yup.string().required('Required'),
          age: Yup.number()
            .min(1, 'Age must be greater than 0')
            .required('Required'),
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
        }) => {
          return (
            <View>
              {console.log(values)}
              <TextInput
                placeholder="Enter name"
                onBlur={handleBlur('name')}
                value={values.name}
                onChangeText={handleChange('name')}
                style={styles.inputTag}
              />
              <Text>{touched.name && errors.name}</Text>
              <TextInput
                placeholder="Enter age"
                onBlur={handleBlur('age')}
                value={values.age}
                onChangeText={handleChange('age')}
                style={styles.inputTag}
                keyboardType="numeric"
              />
              <Text>{touched.age && errors.age}</Text>

              {/* <RNPickerSelect
                onValueChange={handleChange('gender')}
                items={[
                  {label: 'Male', value: 'male'},
                  {label: 'Female', value: 'female'},
                ]}
              />
              <RNPickerSelect
                onValueChange={handleChange('role')}
                items={[
                  {label: 'Developer', value: 'developer'},
                  {label: 'Project Manager', value: 'project manager'},
                  {label: 'Team lead', value: 'team lead'},
                ]}
              /> */}

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
          );
        }}
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
