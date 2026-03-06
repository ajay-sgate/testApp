import { showMessage } from 'react-native-flash-message';
import { Colors } from '../constants/appConstants';
import { StatusBar } from 'react-native';

/** Checks for empty value
 * @param {string} str        The string to check
 * @param {string} fieldName  The fieldname
 * @returns {string}  Returns error string if empty, otherwise returns empty string
 */
export function emptyValidator(
    str: any,
    fieldName = 'This field'
): string {
    const _str = str.trim();
    return !_str ? `${fieldName} can't be empty` : '';
}

/** modify the string value and return the new one
 * @param {string} fieldName  The fieldname
 * @returns {string}  Returns new string
 */
export function stringValidator(fieldName:'This field'): string {
    return `${fieldName} can't be empty`;
}

/** Shows a popup banner message (top of screen)
 * @param {string}        message     The message title
 * @param {string|null}   description The description of the message
 * @param {boolean}       error       Whether the message is an error
 * @returns {void}
 */
export function showPopupMessage(
    message: string,
    description: string,
    error = false
): void {
    showMessage({
        message,
        description,
        backgroundColor: !error ? Colors.secondary : Colors.red,
        color: '#fff',
        type: 'default',
        floating: true,
        statusBarHeight: StatusBar.currentHeight,
        duration: error ? 5000 : 3000
    });
}
