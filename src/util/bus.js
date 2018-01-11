function checkFilter (filter) {
  // filter.state denotes whether the filter is active (checked) or not
  if (filter.state) {
    // the filter is checked so we need to push it to the filter array
    this[filter.type].push(filter.name)
  } else {
    this[filter.type].splice(this[filter.type].indexOf(filter.name), 1)
  }
}

export { checkFilter }
