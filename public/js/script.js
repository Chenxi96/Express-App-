window.onload = () => {
    const form = document.getElementById('form');
    const updateInput = document.getElementById('createdDate');

    console.log(updateInput)
    const getCurrentDate = () => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const day = currentDate.getDay();

        const formatMonth = month < 10 ? `0${month}` : month;
        const formatDay = day < 10 ? `0${day}` : day;

        return `${year}-${formatMonth}-${formatDay}`
    }
    
    updateInput.value = getCurrentDate();
}