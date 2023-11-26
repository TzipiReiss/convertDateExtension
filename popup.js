const api = "https://hebcal.com/converter?cfg=json";

function convertDate(year, month, day, callback) {
  fetch(`${api}&gy=${year}&gm=${month}&gd=${day}&g2h=1`, {
      method: "GET",
      "timeout": 0,
    }, { "mode": "no-cors" })
    .then(response => response.json())
    .then(data => { 
      console.log(data);
      callback(data);
    })
    .catch(error => console.log(error));
}

document.addEventListener('DOMContentLoaded', () => {
  const foreignDate = document.getElementById('foreignDate');
  const HebrewDate = document.getElementById('HebrewDate');
  const dateToConvert = document.getElementById('dateToConvert');
  const button = document.getElementById('convert');
  const convertedDate = document.getElementById('convertedDate');
  
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();

  todayFormatted = `${day}/${month}/${year}`;
  foreignDate.innerHTML = todayFormatted;
  dateToConvert.value = `${year}-${month}-${day}`;

  function setConvertedDate(data) {
    convertedDate.innerHTML = data.hebrew;
  }

  function initHebrewDate(data) {
    HebrewDate.innerHTML = data.hebrew;
    convertedDate.innerHTML = data.hebrew;
  }

  convertDate(year, month, day, initHebrewDate);

  button.addEventListener('click', () => {
    const date = new Date(dateToConvert.value);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    convertDate(year, month, day, setConvertedDate);
  });
});
