const resource='https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json';


const xhr = new XMLHttpRequest();
xhr.open('GET', resource);
xhr.onload = () => {
  const data = JSON.parse(xhr.responseText).data;  // format: [y-m-d, gdp]
  console.log(data);
};
xhr.send();
