document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const submitButton = form.querySelector('button[type="submit"]');

  submitButton.addEventListener("click", function (event) {
    event.preventDefault();

    const fields = form.querySelectorAll("input, textarea, select");
    let isValid = true;
    const formData = {};

    fields.forEach((field) => {
      const label = field.closest("label");
      const required = label && label.querySelector(".text-blue-500.font-bold");
      const value = field.value.trim();
      const fieldName = field.name;

      console.log(label, required, value, fieldName);

      if (!fieldName) {
        console.warn(`Field without name attribute:`, field);
        return;
      }

      if (fieldName === "agreeTnC") {
        let agreeTnC = field.checked;
        if (!agreeTnC) {
          window.alert("Please agree to the Terms and Conditions.");
          isValid = false;
        }
        formData.agreeTnC = agreeTnC;
      } else {
        if (required && !value) {
          isValid = false;
          const tipElement = document.getElementById(`tips-${fieldName}`);
          if (tipElement) {
            tipElement.textContent = `required!`;
          } else {
            console.warn(`Tip element not found for field: ${fieldName}`);
          }
        } else {
          formData[fieldName] = value;
          const tipElement = document.getElementById(`tips-${fieldName}`);
          if (tipElement) {
            tipElement.textContent = "";
          }
        }
      }
    });

    if (isValid) {
      // console.log("formdata:", formData);
      // fetch request here...
      fetch("https://apply.affiliateorigin.com/api/partner/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          // console.log("Success:", data)
          // window.alert("Thank you for your application! We will review it soon.")
          const bool = window.confirm("Congratulations on your successful registration. Do you want to log in now?");
          if (bool) {
            window.location.href = "https://agent.affiliateorigin.com";
          } else {
            window.location.href = "index.html";
          }
        })
        .catch((error) => console.error("Error:", error));
    } else {
      console.log("Form validation failed.");
    }
  });
});
