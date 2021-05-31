const sortArray = (list, searchArr) => {
  const result = [];
  let containsAll;
  for (let i = 0; i < list.length; i++) {
    containsAll = true;

    for (let j = 0; j < searchArr.length; j++) {
      if (
        list[i].name.toLowerCase().indexOf(searchArr[j]) === -1 &&
        list[i].company.toLowerCase().indexOf(searchArr[j]) === -1
      ) {
        containsAll = false;
        break;
      }
    }
    if (containsAll) result.push(list[i]);
  }

  return result;
};

export default sortArray;
