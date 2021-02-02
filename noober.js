async function pageLoaded() {
  let response = await fetch('https://kiei451.com/api/rides.json')
  let json = await response.json()

  // writes the returned JSON to the console
  console.dir(json)
  
  // 🔥 start here: write code to loop through the rides

  // Functions defined for Full Name, Adresses, Number of Passangers and Type of Ride
  function fullName(rideLeg){
    return `${rideLeg.passengerDetails.first} ${rideLeg.passengerDetails.last}`
  }
  function pickUpAdress (rideLeg){
    return `<p>${rideLeg.pickupLocation.address}</p>
    <p>${rideLeg.pickupLocation.city}, ${rideLeg.pickupLocation.state} ${rideLeg.pickupLocation.zip}</p>`
  }
  function DropOffAdress (rideLeg){
    return `<p>${rideLeg.dropoffLocation.address}</p>
    <p>${rideLeg.dropoffLocation.city}, ${rideLeg.dropoffLocation.state} ${rideLeg.dropoffLocation.zip}</p>`
  }
  
  function serviceLevel(ride){
    if (ride.length > 1) {
      return `Noober Pool`
    } else if (ride[0].purpleRequested==true) {
      return `Noober Purple`
    } else if (ride[0].numberOfPassengers >= 4) {
      return `Noober XL`
    } else {
      return `Noober X`
    }
  }
  function passengerCount(rideLeg){
    if(rideLeg.numberOfPassengers==1) {
      return `${rideLeg.numberOfPassengers} Passenger`
    } else {
      return `${rideLeg.numberOfPassengers} Passengers`
    }
  }
  function rideDisplay(ride) {
    
    let outputElement = document.querySelector('.rides')
      outputElement.insertAdjacentHTML('beforeend', `
      <h1 class="inline-block mt-8 px-4 py-2 rounded-xl text-2xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
      <i class="fas fa-car-side"></i>
      <span>${serviceLevel(ride)}</span>
      </h1> 
      `)

      // Loop different strucuture for Noober Purple than the rest (reason for if/else)
    for (let i = 0; i < ride.length; i++) {

      if(serviceLevel(ride)=='Noober Purple'){
      let outputElement = document.querySelector('.rides')
      outputElement.insertAdjacentHTML('beforeend', `
      <div class="border-4 border-purple-500 p-4 my-4 text-left">
        <div class="flex">
          <div class="w-1/2">
            <h2 class="text-2xl py-1">${fullName(ride[i])}</h2>
            <p class="font-bold text-gray-600">${ride[i].passengerDetails.phoneNumber}</p>
          </div>
          <div class="w-1/2 text-right">
          <span class="rounded-xl bg-purple-600 text-white p-2">
              ${passengerCount(ride[i])}
            </span>
          </div>
        </div>
        <div class="mt-4 flex">
          <div class="w-1/2">
            <div class="text-sm font-bold text-gray-600">PICKUP</div>
            ${pickUpAdress(ride[i])}
          </div>
          <div class="w-1/2">
            <div class="text-sm font-bold text-gray-600">DROPOFF</div>
            ${DropOffAdress(ride[i])}
          </div>
        </div>
      </div>
      `)
      } else {
        let outputElement = document.querySelector('.rides')
        outputElement.insertAdjacentHTML('beforeend', `
        <div class="border-4 border-gray-900 p-4 my-4 text-left">
          <div class="flex">
            <div class="w-1/2">
              <h2 class="text-2xl py-1">${fullName(ride[i])}</h2>
              <p class="font-bold text-gray-600">${ride[i].passengerDetails.phoneNumber}</p>
            </div>
            <div class="w-1/2 text-right">
              <span class="rounded-xl bg-gray-600 text-white p-2">
                ${passengerCount(ride[i])}
              </span>
            </div>
          </div>
          <div class="mt-4 flex">
            <div class="w-1/2">
              <div class="text-sm font-bold text-gray-600">PICKUP</div>
              ${pickUpAdress(ride[i])}
            </div>
            <div class="w-1/2">
              <div class="text-sm font-bold text-gray-600">DROPOFF</div>
              ${DropOffAdress(ride[i])}
            </div>
          </div>
        </div>
        `)
      }
  
    }
  }
  for (let i = 0; i < json.length; i++) {
    ride=json[i]
    rideDisplay(ride)
  }




}

window.addEventListener('DOMContentLoaded', pageLoaded)

