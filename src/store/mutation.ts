interface stateValue {
  count: number;
}

export default {
  add(state: stateValue, n: number) {
    state.count += n;
  }
};
