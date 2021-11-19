/**
 * @author Roger Terrill <rchicasterrill@gmail.com>
 *
 *   Problem Prompt:
 *   Implement the DoubleSet data structure described below.
 *   A DoubleSet is a collection whose members are integers, and who can have one or two of each member. We express them below in
 *   maplike notation, ie the DoubleSet that has two 1s, one -3, and one 0 is represented as
 *
 *   {{1: 2}, {-3: 1}, {0: 1}}
 *
 *   If a DoubleSet has two of member 1, we may not add a third. If a
 *   DoubleSet has zero of member 3, we may not take any away, because there is nothing to take away from.
 *
 *   We add two DoubleSets by adding each of their members, each of whose count can be no greater than two:
 *
 *   doubleSetOne has members
 *
 *   {{1: 2}, {2: 1}}
 *
 *   and doubleSetTwo has members
 *
 *   {{1: 1}, {2: 1}, {-3: 1}}
 *
 *   their sum is
 *
 *   {{1: 2}, {2: 2}, {-3: 1}}
 *
 *   We subtract two DoubleSets by subtracting each of their counts, where elements whose counts fall below one are removed
 *   from the DoubleSet entirely:
 *
 *   doubleSetOne has members
 *
 *   {{1: 2}, {2: 1}}
 *
 *   and doubleSetTwo has members
 *
 *   {{1: 1}, {2: 2}, {-3: 1}}
 *
 *   their difference is
 *
 *   {{1: 1}}
 */


/**
 * Perform computation on DoubleSets.
 */
class DoubleSetArithmetic {
  /**
   * Initialize instance variables for sets.
   * @param {Array.<{number:number}>} set1 First DoubleSets.
   * @param {Array.<{number:number}>} set2 Second DoubleSets.
   * @param {string} operator Either +(plus) or -(minus).
   */
  constructor(set1, set2, operator) {
    this.set1 = set1;
    this.set2 = set2;
    this.operator = operator;
    this.mergedSet = [];
    this.results = [];

    this.validateOperator();
    this.mergeSets();
    this.computeDoubleSets();
  }

  /**
   * Validates the operator input character.
   * @return void
   */
  validateOperator() {
    if (this.operator !== '+' && this.operator !== '-') throw Error('Please use either "+" or "-"');
  }

  /**
   * Returns only sets whose member is contained in both DoubleSets.
   * @returns {{number: number}[]}
   */
  diffSetMerge() {
    let arr = [];

    const set1Keys = this.set1.map((el) => Object.keys(el)[0]);
    const set2Keys = this.set2.map((el) => Object.keys(el)[0]);

    arr.push(set2Keys.filter((value) => !set1Keys.includes(value)));
    arr.push(set1Keys.filter((value) => !set2Keys.includes(value)));

    const uniqueKeys = arr.flatMap((x) => x);
    const mergedSets = [...this.set1, ...this.set2];

    return mergedSets.filter((set) => {
      return !uniqueKeys.includes(Object.keys(set)[0]);
    });
  }

  /**
   * Merges both input DoubleSets depending on operator.
   * @returns {DoubleSetArithmetic}
   */
  mergeSets() {
    this.mergedSet = this.operator === '+' ? [...this.set1, ...this.set2] : this.diffSetMerge();
    return this;
  }

  /**
   * Executes arithematic based on operator. Either sum or difference.
   * @returns {DoubleSetArithmetic}
   */
  computeDoubleSets() {
    const tempResults = {};
    this.mergedSet.forEach((set, index) => {
      const key = Object.keys(set)[0];
      const value = Object.values(set)[0];

      if (tempResults.hasOwnProperty(key)) {
        if (this.operator === '+') {
          tempResults[key] = tempResults[key] + value > 2 ? 2 : tempResults[key] + value;
        } else {
          tempResults[key] -= value;
        }
      } else {
        tempResults[key] = value;
      }
    });

    for (let obj in tempResults) {
      if (tempResults[obj] > 0) {
        this.results.push({[obj]: tempResults[obj]});
      }
    }

    return this;
  }

  /**
   * Getter for final result.
   * @returns {{number: number}[]|[]} Either a blank or populated array.
   */
  get result() {
    return this.results;
  }

  /**
   * Displays final results in terminal.
   */
  displayResults() {
    console.log('=======================================================================================================')
    console.log(`The ${this.operator === '+' ? 'SUM' : 'DIFFERENCE'} of your DoubleSets is ${JSON.stringify(this.results)}`)
    console.log('=======================================================================================================')
  }
}

// Input values.
const doubleSet1 = [{'1': 2}, {'2': 1}];
const doubleSet2 = [{'1': 1}, {'2': 2}, {'-3': 1}];

// Class instances.
const sumDoubleSet = new DoubleSetArithmetic(doubleSet1, doubleSet2, '+');
const diffDoubleSet = new DoubleSetArithmetic(doubleSet1, doubleSet2, '-');

// Display both results.
sumDoubleSet.displayResults();
diffDoubleSet.displayResults();
