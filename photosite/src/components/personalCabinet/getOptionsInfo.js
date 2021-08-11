function getOptionsInfo(select, index){
    const option = select.querySelectorAll('option')[index];
    return option.id;
}
export default getOptionsInfo;