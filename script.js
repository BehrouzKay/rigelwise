
function toggleMenu() {
    const hamburgerMenu = document.getElementById('hamburger-menu');
    hamburgerMenu.classList.toggle('open');
}

// Close the dropdown menu when clicking outside of it
document.addEventListener('click', function(event) {
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const dropdownMenu = document.getElementById('dropdown-menu');

    // Close the menu if clicked outside of the hamburger icon and dropdown menu
    if (!hamburgerMenu.contains(event.target) && !dropdownMenu.contains(event.target)) {
        dropdownMenu.style.display = 'none';
        hamburgerMenu.classList.remove('open');
    }
});

// Toggle submenu visibility in regular navbar
const submenuItems = document.querySelectorAll('.has-submenu');
submenuItems.forEach(item => {
    item.addEventListener('click', () => {
        item.querySelector('.submenu').classList.toggle('active');
    });
});



// script for slideshow
let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1 % slides.length} 
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
  setTimeout(showSlides, 5000); // Change image every 2 seconds
}


//script for contact form
document.getElementById('dataForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the form from submitting the traditional way

  const formData = {
      name: document.getElementById('name').value,
      company: document.getElementById('company').value,
      country: document.getElementById('country').value,
      email: document.getElementById('email').value,
      subject: document.getElementById('subject').value,
      message: document.getElementById('message').value
  };

  fetch('/send-email', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
  })
  .then(response => response.json())
  .then(data => {
      if (data.success) {
          alert('Email sent successfully!');
      } else {
          alert('Error sending email.');
      }
  })
  .catch(error => console.error('Error:', error));
});