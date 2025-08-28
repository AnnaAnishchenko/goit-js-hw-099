let formData ={
    email: "",
     message: "" 
};

const STORAGE_KEY = "feedback-form-state"; // ключ у localStorage
const formEl = document.querySelector('.feedback-form');

// слухаємо input
formEl.addEventListener('input', e =>{
    const email = e.currentTarget.elements.email.value.trim();
        const message = e.currentTarget.elements.message.value.trim();

formData.email = email;
formData.message = message;

saveToLS(STORAGE_KEY, formData);
});

function saveToLS(key, value) {
    const jsonData = JSON.stringify(value);
    localStorage.setItem(key, jsonData);
};

function getFromLS(key, defaultValue) {
    const jsonData = localStorage.getItem(key);
    if (!jsonData) return defaultValue;
    try {
        return JSON.parse(jsonData);
     } catch {
        return defaultValue;
    }
};

// при завантаженні сторінки
document.addEventListener('DOMContentLoaded', () => {
    const lsData =  getFromLS(STORAGE_KEY, {});
formData = { ...formData, ...lsData };

    formEl.elements.email.value = lsData.email || "";
    formEl.elements.message.value = lsData.message || "";
   
})

// submit
formEl.addEventListener("submit", e => {
  e.preventDefault();

  const { email, message } = formData;

  if (!email || !message) {
    alert("Fill please all fields");
    return;
  }

   localStorage.removeItem(STORAGE_KEY);
  formData = { email: "", message: "" };
  formEl.reset();
});
