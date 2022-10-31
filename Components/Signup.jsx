import React from 'react';

import {Formik, Field} from 'formik';
import {
  TextInput,
  Button,
  StyleSheet,
  View,
  Text,
  ScrollView,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

import * as Yup from 'yup';

export const Signup = ({navigation}) => {
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
          }),
        );
      } else {
        // eslint-disable-next-line no-alert
        alert(
          JSON.stringify({
            title: 'Account created',
            description: 'Account created successfully going to login Page',
          }),
        );
        navigation.navigate('Login');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView style={styles.formWrapper}>
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
          gender: Yup.string().required('Required'),
          role: Yup.string().required('Required'),
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
              {console.log(values, errors, touched)}
              <TextInput
                placeholder="Enter name"
                onBlur={handleBlur('name')}
                value={values.name}
                onChangeText={handleChange('name')}
                style={styles.inputTag}
              />
              <Text style={styles.error}>{touched.name && errors.name}</Text>
              <TextInput
                placeholder="Enter age"
                onBlur={handleBlur('age')}
                value={values.age}
                onChangeText={handleChange('age')}
                style={styles.inputTag}
                keyboardType="numeric"
              />
              <Text style={styles.error}>{touched.age && errors.age}</Text>

              <RNPickerSelect
                style={pickerSelectStyles}
                placeholder={{label: 'Select Gender', value: ''}}
                onBlur={handleBlur('gender')}
                useNativeAndroidPickerStyle={false}
                onValueChange={handleChange('gender')}
                items={[
                  {label: 'Male', value: 'male'},
                  {label: 'Female', value: 'female'},
                ]}
              />
              <Text style={styles.error}>{errors.gender}</Text>
              <RNPickerSelect
                style={pickerSelectStyles}
                onBlur={handleBlur('role')}
                placeholder={{label: 'Select your Job Role', value: ''}}
                useNativeAndroidPickerStyle={false}
                onValueChange={handleChange('role')}
                items={[
                  {label: 'Developer', value: 'developer'},
                  {label: 'Project Manager', value: 'project manager'},
                  {label: 'Team lead', value: 'team lead'},
                ]}
              />
              <Text style={styles.error}>{errors.role}</Text>
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
                secureTextEntry={true}
                onChangeText={handleChange('password')}
                style={styles.inputTag}
              />
              <Text style={styles.error}>
                {touched.password && errors.password}
              </Text>
              <Button onPress={handleSubmit} title="Submit" />
            </View>
          );
        }}
      </Formik>
    </ScrollView>
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
});
const pickerSelectStyles = StyleSheet.create({
  inputAndroid: {
    fontSize: 25,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#ddd',
    marginBottom: 10,
    color: 'black',
  },
});
