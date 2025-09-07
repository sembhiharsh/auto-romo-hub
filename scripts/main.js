document.addEventListener("DOMContentLoaded", () => {
  /* Hamburger menu toggle */
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('nav');

  if(hamburger && nav){
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      nav.classList.toggle('active');
    });
  }

  // Fetch cars from JSON file with fallback
  let cars = [];
  fetch('cars.json')
    .then(res => res.json())
    .then(data => {
      cars = data;
      renderFeaturedCars();
      renderInventory();
      renderCarDetail();
    })
    .catch(err => {
      console.warn('Failed to load cars.json, using fallback array.', err);
      // Fallback default cars
      cars = [
        {
          id: 1,
          make: "Mercedes",
          model: "Corolla",
          year: 2021,
          price: 18000,
          img: "assets/cars/car1.jpg",
          desc: "Reliable compact car. Mileage 12000 km. Color: White"
        },
        {
          id: 2,
          make: "Audi",
          model: "Civic",
          year: 2020,
          price: 20000,
          img: "assets/cars/car2.jpg",
          desc: "Sporty sedan. Mileage 15000 km. Color: Blue"
        },
        {
          id: 3,
          make: "Polo",
          model: "Mustang",
          year: 2019,
          price: 35000,
          img: "assets/cars/car3.jpg",
          desc: "Classic muscle car. Mileage 8000 km. Color: Red"
        }
      ];
      renderFeaturedCars();
      renderInventory();
      renderCarDetail();
    });

  // Render functions
  function renderFeaturedCars(){
    const container = document.getElementById("featured-cars");
    if(!container) return;
    cars.slice(0,3).forEach(car=>{
      const div = document.createElement("div");
      div.className="card";
      div.innerHTML=`
        <a href="car-details.html?car=${car.id}" class="card-link">
          <img src="${car.img}" alt="${car.make} ${car.model}">
          <div class="details">
            <h3>${car.year} ${car.make} ${car.model}</h3>
            <p>€${car.price.toLocaleString()}</p>
          </div>
        </a>
      `;
      container.appendChild(div);
    });
  }

  function renderInventory(){
    const container = document.getElementById("car-cards");
    if(!container) return;
    cars.forEach(car=>{
      const div = document.createElement("div");
      div.className="card";
      div.innerHTML=`
        <a href="car-details.html?car=${car.id}" class="card-link">
          <img src="${car.img}" alt="${car.make} ${car.model}">
          <div class="details">
            <h3>${car.year} ${car.make} ${car.model}</h3>
            <p>€${car.price.toLocaleString()}</p>
          </div>
        </a>
      `;
      container.appendChild(div);
    });
  }

  function renderCarDetail(){
    const container = document.getElementById("car-detail");
    if(!container) return;
    const params = new URLSearchParams(window.location.search);
    const carId = parseInt(params.get("car"));
    const car = cars.find(c=>c.id===carId);
    if(!car){ container.innerHTML="<p>Car not found</p>"; return; }
    container.innerHTML=`
      <h2>${car.year} ${car.make} ${car.model}</h2>
      <img src="${car.img}" alt="${car.make} ${car.model}" style="width:100%;max-width:500px;">
      <p>Price: €${car.price.toLocaleString()}</p>
      <p>${car.desc}</p>
      <a href="contact.html">Contact to buy / test drive</a>
    `;
  }

  function handleContactForm(){
    const form = document.getElementById("contact-form");
    if(!form) return;
    const status = document.getElementById("form-status");
    form.addEventListener("submit", e=>{
      e.preventDefault();
      status.textContent="Thank you! We will contact you shortly.";
      form.reset();
    });
  }

  handleContactForm();
});