document.addEventListener('DOMContentLoaded', () => {
    // Selecting necessary elements from the DOM
    const daysTag = document.querySelector(".days");
    const currentDate = document.querySelector(".current-date");
    const prevButton = document.getElementById("prev");
    const nextButton = document.getElementById("next");
  
    // Setting initial values for year, months, and current month
    let currYear = 2024;
    let summerMonths = [4, 5, 6, 7];
    let currMonth = 4;
  
    // Array of month names
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
    // Function to render the calendar
    function renderCalendar() {
      let liTag = "";
  
      // Getting the first day, last date of the month, and last date of the previous month
      let firstDayofMonth = new Date(currYear, currMonth, 1).getDay();
      let lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate();
      let lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();
  
      // Generating list items for inactive days (from the previous month)
      for (let i = firstDayofMonth; i > 0; i--) {
        liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
      }
  
      // Generating list items for active days (from the current month)
      for (let i = 1; i <= lastDateofMonth; i++) {
        liTag += `<li class="active">${i}</li>`;
      }
  
      // Updating the calendar with the generated list items and current date
      daysTag.innerHTML = liTag;
      currentDate.innerText = `${months[currMonth]} ${currYear}`;
  
      // Hiding or showing navigation buttons based on current month
      prevButton.style.display = currMonth === summerMonths[0] ? "none" : "block";
      nextButton.style.display = currMonth === summerMonths[summerMonths.length - 1] ? "none" : "block";
  
      // Adding event listeners to each date element in the calendar
      const dateElements = document.querySelectorAll(".days li");
      dateElements.forEach(dateElement => {
        dateElement.addEventListener("click", () => {
          const selectedDate = new Date(currYear, currMonth, parseInt(dateElement.innerText));
          showEventsForDate(selectedDate);
        });
      });
    }
  
    // Function to display events for a selected date
    function showEventsForDate(date) {
      const year = date.getFullYear();
      const month = date.getMonth() + 1; // Adding 1 because months are zero-indexed
      const day = date.getDate();
      const dateString = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
      const eventDetails = events[dateString];
      if (eventDetails) {
        showEventPopup(eventDetails);
      } else {
        showNoEventsPopup();
      }
    }
  
    // Function to add an event to the list
    function addEventToList(event) {
      const eventList = document.getElementById("event-list");
      const li = document.createElement("li");
      li.textContent = `${event.title}, ${event.description}`;
      eventList.appendChild(li);
    }
  
    // Object containing events mapped to their dates
    const events = {
      "2024-05-01": { title: "All Camps:", description: ["Registration Begins!" ]},
      "2024-05-29": { title: "All Camps:", description: ["Registration Closes!" ]},
      "2024-06-16": { title: "All Camps:", description:[ "Dorm Move In 12pm", "Camper Check-In 1pm"]},
      // "2024-06-16": { title: "All Camps:", description: "Camper Check-In 1pm"}
    };
    
    // Iterate over each event and add it to the list
    Object.values(events).forEach(event => addEventToList(event)); 
  
    // Function to display the event popup
    function showEventPopup(event) {
      const popup = document.getElementById('event-popup');
      const eventList = document.getElementById('event-list');
      eventList.innerHTML = `<li><b>${event.title}</b> <br>${event.description}</li>`;
      popup.style.display = 'block';
      document.body.classList.add('popup-active'); // Add popup-active class to body
  
    }
  
    // Function to display a popup when no events are found for the selected date
    function showNoEventsPopup() {
      const popup = document.getElementById('event-popup');
      const eventList = document.getElementById('event-list');
      eventList.innerHTML = '<li>No events for this date</li>';
      popup.style.display = 'block';
      document.body.classList.add('popup-active'); // Add popup-active class to body
  
    }
  
    // Function to close the popup
    function closePopup() {
      const popup = document.getElementById('event-popup');
      popup.style.display = 'none';
      document.body.classList.remove('popup-active'); // Add popup-active class to body
  
    }
  
    // Adding event listener to the close button
    const closeButton = document.querySelector('.close-btn');
    closeButton.addEventListener('click', closePopup);
  
    // Adding event listeners to the navigation buttons for changing months
    prevButton.addEventListener("click", () => {
      currMonth = currMonth === summerMonths[0] ? summerMonths[summerMonths.length - 1] : currMonth - 1;
      renderCalendar();
    });
  
    nextButton.addEventListener("click", () => {
      currMonth = currMonth === summerMonths[summerMonths.length - 1] ? summerMonths[0] : currMonth + 1;
      renderCalendar();
    });
  
    // Rendering the calendar initially
    renderCalendar();
  });