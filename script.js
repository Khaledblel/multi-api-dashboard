// CONFIGURATION
// Loads API key from user input.
const CITY = "Sousse";

function getApiUrl(apiKey) {
    if (!apiKey) return null;
    return `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${apiKey}&units=metric&lang=fr`;
}

/**
 * Met à jour l'interface utilisateur avec les données JSON
 * @param {Object} data - Réponse JSON de OpenWeatherMap
 */
function updateCard(data) {
    if (!data) return;

    const tempEl = document.getElementById('temp-val');
    const descEl = document.getElementById('weather-desc');
    const humidityEl = document.getElementById('humidity-val');
    const windEl = document.getElementById('wind-val');
    const dateEl = document.getElementById('current-date');
    const cityEl = document.getElementById('city-name');

    // Formatage de la date en Français
    const now = new Date();
    const options = { weekday: 'long', month: 'short', day: 'numeric' };
    dateEl.textContent = now.toLocaleDateString('fr-FR', options);

    // Injection des données
    cityEl.textContent = data.name || CITY;
    tempEl.textContent = Math.round(data.main.temp); // Déjà en C° car units=metric
    descEl.textContent = data.weather[0].description;
    humidityEl.textContent = `${data.main.humidity}%`;
    
    // Le vent est en m/s par défaut, mais avec units=metric c'est toujours m/s.
    // Conversion m/s => km/h : x * 3.6
    const windKmH = Math.round(data.wind.speed * 3.6);
    windEl.textContent = `${windKmH} km/h`;

    // Réinitialiser l'animation
    const card = document.querySelector('.pillowed-card');
    card.style.animation = 'none';
    card.offsetHeight; // force reflow
    card.style.animation = 'cardEntrance 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
}


// Fonction principale de récupération
function fetchWeather(forceKey = null) {
    const inputKey = document.getElementById('api-key-input')?.value.trim();
    // Try localStorage if input is empty, otherwise use input
    const finalKey = forceKey || inputKey || localStorage.getItem('weather_api_key');
    
    if (!finalKey) {
        document.getElementById('weather-desc').textContent = "Clé API manquante";
        return;
    }

    // Save success key to localStorage for convenience
    localStorage.setItem('weather_api_key', finalKey);
    if (document.getElementById('api-key-input') && !inputKey) {
        document.getElementById('api-key-input').value = finalKey;
    }

    const url = getApiUrl(finalKey);

    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error("Problème API");
            return response.json();
        })
        .then(data => {
            // Appel du callback de mise à jour (Exercice 4 concept)
            updateCard(data);
        })
        .catch(err => {
            console.error("Erreur:", err);
            document.getElementById('weather-desc').textContent = "Erreur chargement";
        });
}

// Init
document.addEventListener('DOMContentLoaded', () => {
    // Try to load from storage on load
    fetchWeather();

    // Hook up button
    document.getElementById('fetch-btn').addEventListener('click', () => fetchWeather());

    // Hook up Enter key
    document.getElementById('api-key-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') fetchWeather();
    });

    // --- CAROUSEL LOGIC ---
    let currentSlide = 0;
    const track = document.getElementById('track');
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;

    function updateCarousel() {
        track.style.transform = `translateX(-${currentSlide * 100}%)`;
        slides.forEach((slide, index) => {
            if (index === currentSlide) {
                slide.classList.add('active');
                if (index === 1) fetchBook(); // Fetch on slide to Library
                if (index === 2) fetchNasa(); // Fetch on slide to NASA
                if (index === 3) fetchRandomUser(); // Fetch on slide to RandomUser
            } else {
                slide.classList.remove('active');
            }
        });
    }

    document.getElementById('next-btn').addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
    });

    document.getElementById('prev-btn').addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateCarousel();
    });

    // --- OPEN LIBRARY LOGIC ---
    const subjects = ['science_fiction', 'fantasy', 'thriller', 'romance', 'programming'];
    
    async function fetchBook() {
        // Simple random subject
        const subject = subjects[Math.floor(Math.random() * subjects.length)];
        const url = `https://openlibrary.org/subjects/${subject}.json?limit=10`;

        // Update UI to show loading
        document.getElementById('book-title').textContent = "Finding a book...";
        
        try {
            const res = await fetch(url);
            const data = await res.json();
            
            if (data.works && data.works.length > 0) {
                // Pick random work
                const work = data.works[Math.floor(Math.random() * data.works.length)];
                
                document.getElementById('book-title').textContent = work.title;
                document.getElementById('book-author').textContent = work.authors ? work.authors.map(a => a.name).join(', ') : 'Unknown Author';
                document.getElementById('book-year').textContent = work.first_publish_year || 'N/A';

                const coverEl = document.getElementById('book-cover');
                const placeholderEl = document.getElementById('book-cover-placeholder');
                
                if (work.cover_id) {
                    coverEl.src = `https://covers.openlibrary.org/b/id/${work.cover_id}-M.jpg`;
                    coverEl.style.display = 'block';
                    placeholderEl.style.display = 'none';
                } else {
                    coverEl.style.display = 'none';
                    placeholderEl.style.display = 'inline';
                }
            } else {
                document.getElementById('book-title').textContent = "No books found.";
            }

        } catch (err) {
            console.error(err);
            document.getElementById('book-title').textContent = "Error fetching book";
        }
    }

    // --- NASA LOGIC ---
    async function fetchNasa() {
        // Random date generator
        const start = new Date(1995, 5, 16);
        const end = new Date();
        const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
        const dateStr = date.toISOString().split('T')[0];

        const nasaInput = document.getElementById('nasa-key-input')?.value.trim();
        const nasaKey = nasaInput || localStorage.getItem('nasa_api_key') || 'DEMO_KEY';

        if (nasaInput) localStorage.setItem('nasa_api_key', nasaInput);
        if (!nasaInput && localStorage.getItem('nasa_api_key')) {
            document.getElementById('nasa-key-input').value = localStorage.getItem('nasa_api_key');
        }

        const url = `https://api.nasa.gov/planetary/apod?api_key=${nasaKey}&date=${dateStr}`;

        document.getElementById('nasa-title').textContent = "Loading Space...";
        document.getElementById('nasa-placeholder').style.display = 'inline';
        document.getElementById('nasa-img').style.display = 'none';

        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error("NASA API Limit or Error");
            const data = await res.json();
            
            if (data.media_type === 'image') {
                document.getElementById('nasa-title').textContent = data.title;
                document.getElementById('nasa-date').textContent = data.date;
                document.getElementById('nasa-copyright').textContent = data.copyright || 'Public Domain';
                
                const imgEl = document.getElementById('nasa-img');
                imgEl.src = data.url;
                imgEl.onload = () => {
                    imgEl.style.display = 'block';
                    document.getElementById('nasa-placeholder').style.display = 'none';
                };
            } else {
                // Retry if video
                fetchNasa(); 
            }
        } catch (err) {
            console.error(err);
            document.getElementById('nasa-title').textContent = "Error (Rate Limit?)";
        }
    }

    // Bind "Next" buttons
    const bookBtn = document.getElementById('book-refresh-btn');
    if (bookBtn) bookBtn.addEventListener('click', fetchBook);

    const nasaBtn = document.getElementById('nasa-refresh-btn');
    if (nasaBtn) nasaBtn.addEventListener('click', fetchNasa);

    // --- RANDOM USER LOGIC ---
    async function fetchRandomUser() {
        document.getElementById('user-name').textContent = 'Loading...';
        document.getElementById('user-email').textContent = '...';
        document.getElementById('user-avatar').style.display = 'none';

        try {
            const res = await fetch('https://randomuser.me/api/');
            const data = await res.json();
            const user = data.results[0];

            document.getElementById('user-name').textContent = `${user.name.first} ${user.name.last}`;
            document.getElementById('user-email').textContent = user.email;
            document.getElementById('user-location').textContent = `${user.location.city}, ${user.location.country}`;
            document.getElementById('user-age').textContent = user.dob.age;

            const avatarEl = document.getElementById('user-avatar');
            avatarEl.src = user.picture.large;
            avatarEl.onload = () => { avatarEl.style.display = 'block'; };
        } catch (err) {
            console.error(err);
            document.getElementById('user-name').textContent = 'Error loading user';
        }
    }

    const userBtn = document.getElementById('user-refresh-btn');
    if (userBtn) userBtn.addEventListener('click', fetchRandomUser);
});

