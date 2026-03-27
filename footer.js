const brandsItem = document.createElement('div');
brandsItem.className = 'brands-item';

const paymentMethods = [
  { icon: 'fa-cc-visa', label: 'visa' },
  { icon: 'fa-cc-mastercard', label: 'mastercard' },
  { icon: 'fa-cc-apple-pay', label: 'apple-pay' },
  { icon: 'fa-google-pay', label: 'google-pay' },
  { icon: 'fa-cc-paypal', label: 'paypal' }
];

paymentMethods.forEach(method => {
  const span = document.createElement('span');
  span.className = 'boxofcont';
  
  const icon = document.createElement('i');
  icon.className = `fa-brands ${method.icon}`;
  
  const label = document.createElement('p');
  label.textContent = method.label;
  
  span.appendChild(icon);
  span.appendChild(label);
  brandsItem.appendChild(span);
});

const socials = document.createElement('div');

const socialIcons = ['fa-instagram', 'fa-x-twitter', 'fa-tiktok', 'fa-snapchat'];
socialIcons.forEach(iconClass => {
  const icon = document.createElement('i');
  icon.className = `fa-brands ${iconClass}`;
  socials.appendChild(icon);
});

const contactEmail = document.createElement('p');
contactEmail.className = 'cbien';
contactEmail.textContent = 'contact nous: merviendama@gmail.com';

const contactPhone = document.createElement('p');
contactPhone.textContent = 'phone: 07 66 89 96 63';

const footer = document.querySelector('footer');
footer.appendChild(brandsItem);
footer.appendChild(socials);
footer.appendChild(contactEmail);
footer.appendChild(contactPhone);