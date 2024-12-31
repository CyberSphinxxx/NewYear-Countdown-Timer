document.addEventListener("DOMContentLoaded", () => {
    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");

    const newYear = new Date(new Date().getFullYear() + 1, 0, 1);

    function updateCountdown() {
        const now = new Date();
        const timeLeft = newYear - now;

        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
        const seconds = Math.floor((timeLeft / 1000) % 60);

        daysEl.textContent = days.toString().padStart(2, "0");
        hoursEl.textContent = hours.toString().padStart(2, "0");
        minutesEl.textContent = minutes.toString().padStart(2, "0");
        secondsEl.textContent = seconds.toString().padStart(2, "0");

        const elements = [daysEl, hoursEl, minutesEl, secondsEl];
        elements.forEach((el) => {
            el.classList.add("pulse");
            setTimeout(() => el.classList.remove("pulse"), 500);
        });
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
});
