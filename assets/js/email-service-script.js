$(document).ready(function() {

  $('#therapy-inquiry-form').on('submit', function(e) {
    e.preventDefault();

    const formData = {
      parent_name: $('#guardian-name').val(),
      email: $('#email').val(),
      contact_number: $('#contact-number').val(),
      child_name: $('#child-name').val(),
      child_age: $('#child-age').val(),
      service: $('#selected-service').val(),
      message: $('#inquiry-desc').val()
    };

    fetch('/.netlify/functions/sendEmail', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    .then(res => {
      if (!res.ok) {
        return res.text().then(text => { throw new Error(text) });
      }
      return res.json();
    })
    .then(data => {
      alert(data.message);
      $('#therapy-inquiry-form')[0].reset();
    })
    .catch(err => {
      console.error("Frontend error:", err);
      alert("Error: " + err.message);
    });
  });
});