/*****************************************************************************/
/*****************************************************************************/

import { Text, TextInput } from 'react-native';
import { styles }          from '../styles/styles';

/*****************************************************************************/

const ProfileField = ({valid, text, warningText, textInputProps}) => (
  <>
    <Text style={styles.labelText}>{text}</Text>
    <TextInput style={styles.inputText} {...textInputProps} />
    {!valid &&
      <Text style={styles.warningText}>{warningText}</Text>
    }
  </>
);

/*****************************************************************************/

export default ProfileField;

/*****************************************************************************/
/*****************************************************************************/