const noteFields = [
  { id: "note-1000", value: 1000 },
  { id: "note-500", value: 500 },
  { id: "note-200", value: 200 },
  { id: "note-100", value: 100 },
  { id: "note-50", value: 50 },
  { id: "note-20", value: 20 }
];

const inputs = noteFields.map((field) => document.getElementById(field.id));
const totalValueEl = document.getElementById("total-value");
const totalNotesEl = document.getElementById("total-notes");
const currentDateEl = document.getElementById("current-date");
const form = document.getElementById("banknote-form");

function formatCurrency(value) {
  return new Intl.NumberFormat("uk-UA", {
    style: "currency",
    currency: "UAH",
    maximumFractionDigits: 0
  }).format(value);
}

function updateDate() {
  if (currentDateEl) {
    const today = new Intl.DateTimeFormat("uk-UA", {
      day: "numeric",
      month: "long",
      year: "numeric"
    }).format(new Date());

    currentDateEl.textContent = `Сьогодні: ${today}`;
  }
}

function updateTotals() {
  let totalValue = 0;
  let totalNotes = 0;

  noteFields.forEach((field, index) => {
    const count = Math.max(0, Number(inputs[index].value) || 0);
    totalValue += count * field.value;
    totalNotes += count;
  });

  totalValueEl.textContent = formatCurrency(totalValue);
  totalNotesEl.textContent = totalNotes.toLocaleString();
}

inputs.forEach((input) => input.addEventListener("input", updateTotals));
form.addEventListener("reset", () => {
  setTimeout(updateTotals, 0);
});

updateTotals();
