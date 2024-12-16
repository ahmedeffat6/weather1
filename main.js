const inputElem=document.getElementById('input')
const btnFind=document.getElementById('btnFind')


async function searchCity(city){ 
try{
  const result=await fetch(`https://api.weatherapi.com/v1/forecast.json?key=35aefc9995e440c6a21194034241406&q=${city}&days=3`)
const data=await result.json()
displayFirstCard(data)
displayDataCards(data)
}catch(error){
  console.log(error);
}

}

function displayFirstCard(FirstCardData){
  const todayDate = new Date(FirstCardData.current.last_updated);
  const dayName = todayDate.toLocaleDateString('en-US', { weekday: 'long' });
 const monthNumber=new Date( FirstCardData.current.last_updated).getDate()
const monthName=todayDate.toLocaleDateString('en-Us',{  month: 'long'})
const currentInfo=FirstCardData.current


 const cart=`     <div class=" col-lg-4  ">
             <div class='card  first-card'>
              <div class="d-flex justify-content-between date">
                 <h4 class="text-capitalize">${dayName}</h4>
                 <h4>${monthNumber} ${monthName}</h4>
              </div>
                <div class="card-body d-flex flex-column">
                  <h5 class="card-title">${FirstCardData.location.name}</h5>
                  <h6 class="temp">${currentInfo.temp_c}<sup>o</sup>C</h6>
                  <img src='https:${currentInfo?.condition?.icon}' alt="${currentInfo.condition.text}" class="img-90">
                 <h6 class="text-capitalize">${currentInfo.condition.text}</h6>
                <div class="icons d-flex">
                  <span><img src="images/icon-umberella.png" alt="umberalla" class="icon">${currentInfo.humidity}%</span>
                  <span><img src="images/icon-wind.png" alt="umberalla" class="icon">${currentInfo.wind_kph}km/h</span>
                  <span><img src="images/icon-compass.png" alt="umberalla" class="icon">${currentInfo.wind_dir}</span>
                     
                </div>
                </div>
             </div>
          
          </div>`
document.getElementById("myRow").innerHTML=cart

}

function displayDataCards(data){
const forcastdayInfo=data.forecast.forecastday;

  let cart=''
for(let i=1;i<forcastdayInfo.length;i++){
  const todayDate = new Date(forcastdayInfo[i].date);
const dayName = todayDate.toLocaleDateString('en-US', { weekday: 'long' });


cart+=`   <div class=" text-center middle col-lg-4 ">
         <div class='card h-100  ${i==1?'border-0':"third-card"} '>
          <div class="d-flex justify-content-center date text-center">
              <h4 class="text-capitalize">${dayName}</h4>
           </div>
        <div class="card-body">
          <img src='https:${forcastdayInfo[i].day.condition.icon}' alt="${forcastdayInfo[i].day.condition.text}" class="img-48">
          <h5 class="card-title">${forcastdayInfo[i].day.maxtemp_c}°C </h5>
          <span>${forcastdayInfo[i].day.mintemp_c}<sup>o</sup>C </span>
          <h6 class="text-capitalize">${forcastdayInfo[i].day.condition.text}</h6>
        </div>
      </div>
         </div>
     
       `}
document.getElementById("myRow").insertAdjacentHTML('beforeend', cart);
}

inputElem.addEventListener("input",function(){
  if(inputElem.value.trim().length>2){
  searchCity(inputElem.value.trim())}
 

})
searchCity("cairo")


  navigator.geolocation.getCurrentPosition((position,error)=>{
    if(error){
      console.log(error);
    }else{
      const city = `${position.coords.latitude},${position.coords.longitude}`;
      searchCity(city);
    }
  }  
  )

