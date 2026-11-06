const BASE = "https://fsa-crud-2aa9294fe819.herokuapp.com/api";
const COHORT = "/2609-Jaramillo"; // Make sure to change this!
const RESOURCE = "/events";
const API = BASE + COHORT + RESOURCE;

let events = [];
let selectedEvent;

async function getEvents() {
  try {
    const response = await fetch(API);
    const result = await response.json();
    console.log(result.data);
    events = result.data;
  } catch (error) {
    console.error(error);
  }
}

async function getEvent(id) {
  try {
    const response = await fetch(API + "/" + id);
    const result = await response.json();
    console.log(result.data);
    selectedEvent = result.data;
    render();
  } catch (error) {
    console.error(error);
  }
}

function EventListItem(event) {
  const $listItem = document.createElement("li");
  $listItem.innerHTML = `
     <a href="#selected">${event.name}</a>
    `;
  $listItem.addEventListener("click", () => getEvent(event.id));
  return $listItem;
}

function EventList() {
  const $list = document.createElement("ul");
  $list.classList.add("upcoming");
  const $partyList = events.map(EventListItem);
  $list.replaceChildren(...$partyList);
  return $list;
}

function EventDetails() {
  if (!selectedEvent) {
    const $p = document.createElement("p");
    $p.textContent = "Please select an event to learn more.";
    return $p;
  }
  const $party = document.createElement("ssection");
  $party.classList.add("event");
  $party.innerHTML = `
    <h3>${selectedEvent.name} #${selectedEvent.id}</h3>
    <figure>
    </figure>
    <p><b>Date:</b> ${selectedEvent.date}</p>
    <p><b>Location:</b> ${selectedEvent.location}</p>
    <p><b>Description:</b> ${selectedEvent.description}</p>
    `;
  return $party;
}

function render() {
  const $app = document.querySelector("#app");
  $app.innerHTML = `
 <h1>Party Planner</h1>
     <main>
     <section>
     <h2> Upcoming Parties </h2>
     <EventList></EventList>
     </section>
     <section id="selected">
     <h2> Party Details </h2>
     <EventDetails></EventDetails>
     </section>
     </main>
`;

  $app.querySelector("EventList").replaceWith(EventList());
  $app.querySelector("EventDetails").replaceWith(EventDetails());
}

async function init() {
  await getEvents();
  render();
}

init();
