// components/forms/examples/TestForm.js
import React, { useState } from 'react';
import { View } from 'react-native';
import { FormInput, FormButton, FormSection } from '../index';

const TestForm = () => {
  const [name, setName] = useState('');
  
  return (
    <View>
      <FormSection title="Test Form">
        <FormInput
          label="Name"
          value={name}
          onChangeText={setName}
        />
        <FormButton
          title="Test Button"
          onPress={() => console.log('Works!')}
        />
      </FormSection>
    </View>
  );
};

export default TestForm;