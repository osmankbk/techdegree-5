/* Treehouse FSJS Techdegree
 * Project 5 - Public API Request
 * scripts.js
  Goal: Exceed Expectation
  */
//Universal variables used throughout the project
const urlRequest = 'https://randomuser.me/api/?results=12&nat=us,ca';
const galleryDiv = document.getElementById('gallery');
const body = document.querySelector('body');
//The HTML elements for my Search section
const searchDiv = document.querySelector('.search-container');
searchDiv.innerHTML = `<form action="#" method="get">
    <input type="search" id="search-input" class="search-input" placeholder="Search...">
    <input type="submit" value="&#x1F50D;" id="serach-submit" class="search-submit">
</form>`;
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('serach-submit');
//Fetch request function to get the list of employees
async function fetchRequest(url) {
	try {
		const request = await fetch(url);
		const response = await request.json();
		return Promise.all(response.results);
	} catch (error) {
		gallery.innerHTML = `An error occured fetching the data, ${error}`;
	}
}
//This function receive data from the fetchRequest and format it to display in the 12 employee cards
const employeesInfoRequest = (data) => {
	data.forEach(user => {
		const containerDiv = document.createElement('div');
		containerDiv.classList.add('card');
		galleryDiv.appendChild(containerDiv);
		containerDiv.innerHTML = `<div class="card-img-container">
          <img class="card-img" src=${user.picture.large} alt="profile picture">
      </div>
      <div class="card-info-container">
          <h3 id="name" class="card-name cap">${user.name.first} ${user.name.last}</h3>
          <p class="card-text">${user.email}</p>
          <p class="card-text cap">${user.location.city}</p>
      </div>`;
		//Modal section
		const modalContainer = document.createElement('div');
		modalContainer.classList.add('modal-container');
		body.appendChild(modalContainer);
		modalContainer.innerHTML = `<div class="modal">
      <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
      <div class="modal-info-container">
      <img class="modal-img" src=${user.picture.large} alt="profile picture">
      <h3 id="name" class="modal-name cap">${user.name.first} ${user.name.last}</h3>
      <p class="modal-text">${user.email}</p>
      <p class="modal-text cap">${user.location.city}</p>
      <hr>
      <p class="modal-text">${user.phone}</p>
      <p class="modal-text">${user.location.street} ${user.location.city} ${user.location.state}</p>
      <p class="modal-text">Birthday: ${user.dob.date}</p>
      </div>
  </div>
  <div class="modal-btn-container">
      <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
      <button type="button" id="modal-next" class="modal-next btn">Next</button>
  </div>`;
		modalContainer.style.display = 'none';
		//The click event that displays a modal window fired
		containerDiv.addEventListener('click', (e) => {
			modalContainer.style.display = 'block';
		})
		//The close click event that closes the the modal window
		modalContainer.addEventListener('click', (e) => {
			const modalContainers = document.querySelectorAll('.modal-container');
			if (e.target.className === '.modal-close-btn' || e.target.textContent === 'X') {
				modalContainers.forEach(modal => {
					modal.style.display = 'none';
				})
			}
		})
		return data;
	})
}
//The function that handles the previous & next button on the modal window
const modalInteraction = (data) => {
	const modalContainers = document.querySelectorAll('.modal-container');
	//The search-submit click event button
	searchButton.addEventListener('click', (e) => {
		e.preventDefault();
		const cards = document.querySelectorAll('.card');
		cards.forEach(card => {
			card.style.display = 'none';
			if (card.textContent.includes(searchInput.value.toLowerCase())) {
				card.style.display = 'flex';
			}
		})
	});
	//The event that shows available employees as you type and restores the searched list when the search input is empty
	body.addEventListener('keydown', () => {
		const cards = document.querySelectorAll('.card');
		cards.forEach(card => {
			card.style.display = 'none';
			if (card.textContent.includes(searchInput.value.toLowerCase())) {
				card.style.display = 'flex';
			}
		})
	});
	//The prev & next button interactions
	modalContainers.forEach((modal, i) => {
		//This "if" hides the previous button when its the 1st modal window
		if (i === 0) {
			const children = modal.childNodes;
			const prev = children[2].children[0];
			prev.style.display = 'none';
			//This "else if" hides the next button when its the last modal window
		} else if (i === 11) {
			const children = modal.childNodes;
			const next = children[2].children[1];
			next.style.display = 'none';
		}
		//The click event of both the previous & next buttons
		modal.addEventListener('click', (e) => {
			if (e.target.className === 'modal-prev btn') {
				modal.style.display = 'none';
				modal.previousElementSibling.style.display = 'block';
			} else {
				if (e.target.className === 'modal-next btn') {
					modal.style.display = 'none';
					modal.nextElementSibling.style.display = 'block';
				}
			}
		})
	})
}
//Set the image below as my background image
body.style.backgroundImage = "url('epicbackgroundimage.jpg')";
fetchRequest(urlRequest).then(employeesInfoRequest).then(modalInteraction);
