/**
 * @author Roger Terrill <rchicasterrill@gmail.com>
 *
 *   Problem Prompt:
 *   Write a function that capitalizes *only* the nth alphanumeric character of a string, so that if I hand you
 *
 *   Aspiration.com
 *
 *   and I ask you to capitalize every 3rd character, you hand me back
 *
 *   asPirAtiOn.cOm
 *
 *   If I ask you to capitalize every 4th character, you hand me back
 *
 *   aspIratIon.cOm
 *
 *   Please note:
 *   - Characters other than each third should be downcased
 *   - For the purposes of counting and capitalizing every three characters, consider only alphanumeric
 *     characters, ie [a-z][A-Z][0-9].
 */

/**
 * Capitalize the nth characters in string.
 */
class CharCapitalize {
  /**
   * Initialize instance variables for string.
   * @param {string} str String to be converted.
   * @param {number} position The nth character to be uppercased.
   */
  constructor(str, position) {
    this.str = str;
    this.position = position;
    this.result = '';

    this.validatePosition();
    this.convert();
  }

  validatePosition() {
    if(typeof this.position !== 'number' || this.position < 1) throw Error('Please input a positive integer.')
  }

  /**
   * Determine if character is alpha numeric.
   * @param char Character in string.
   * @returns {boolean} True if passes test of alpha numeric.
   */
  isAlphaNumeric(char) {
    return /^[A-Za-z0-9]$/i.test(char);
  }

  /**
   * Convert str to lowercase all characters except for
   * every input position which will be uppercase.
   * Letters and numbers only count for position.
   */
  convert() {
    let strArr = [];
    let j = 1;
    let char = '';

    this.str.split('').map((ch) => {
      char = ch.toLowerCase();

      if (j % this.position === 0) {
        char = ch.toUpperCase();
      }

      if (this.isAlphaNumeric(ch)) {
        j++;
      }

      strArr.push(char);
    })

    this.result = strArr.join('');
  }

  /**
   * Displays final results in terminal.
   */
  displayResult() {
    console.log('=======================================================================================================')
    console.log(`You have converted your original string of ${this.str} to capitalize every ${this.position} characters.`)
    console.log(`The final result is: ${this.result}`);
    console.log('=======================================================================================================')
  }
}

// Input value.
const STR = 'Aspiration.com';

// Class Instances.
const everyThree = new CharCapitalize(STR, 3);
const everyFour = new CharCapitalize(STR, 4);

// Display results.
everyThree.displayResult();
everyFour.displayResult();