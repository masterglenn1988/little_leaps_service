$(document).ready(function() {

  const SERVICE_ID = "service_frprxs9";
  const TEMPLATE_ADMIN = "template_kdphy56";
  const TEMPLATE_CUSTOMER = "template_customer_here";
  const PUBLIC_KEY = "T6peZlWLR42qvmoNk";

  // Initialize EmailJS
  emailjs.init(PUBLIC_KEY);

  $('#therapy-inquiry-form').on('submit', function(e) {
    e.preventDefault();

    // Gather form data
    const formData = {
      parent_name: $('#guardian-name').val(),
      email: $('#email').val(),
      contact_number: $('#contact-number').val(),
      child_name: $('#child-name').val(),
      child_age: $('#child-age').val(),
      service: $('#selected-service').val(),
      message: $('#inquiry-desc').val()
    };

    // --- 1️⃣ Send Admin Email ---
    emailjs.send(SERVICE_ID, TEMPLATE_ADMIN, formData)
      .then(function(adminResponse) {
        console.log('✅ Admin email sent:', adminResponse);

        // --- 2️⃣ Optional: Send Auto-Reply to Customer ---
        // Uncomment if you want customer auto-reply
        /*
        const customerParams = {
          parent_name: formData.parent_name,
          email: formData.email,
          service: formData.service
        };

        return emailjs.send(SERVICE_ID, TEMPLATE_CUSTOMER, customerParams);
        */
      })
      .then(function(customerResponse) {
        // Only runs if customer auto-reply is enabled
        console.log('✅ Customer auto-reply sent:', customerResponse);
      })
      .finally(function() {
        // Reset form and notify user
        alert('Inquiry sent successfully! Please check your email for next steps.');
        $('#therapy-inquiry-form')[0].reset();
      })
      .catch(function(error) {
        console.error('❌ Email send error:', error);
        alert('Failed to send inquiry. Please try again later.');
      });

  });
});