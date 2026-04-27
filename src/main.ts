import './style.css';

const app = document.querySelector<HTMLDivElement>('#app');

if (!app) {
  throw new Error('App root not found');
}

app.innerHTML = `
  <div class="stars"></div>
  <main class="page">
    <header class="hero">
      <img class="logo" src="/kageplay-logo.png" alt="KagePlay logo" />
      <h1>Your Gateway to Free Anime</h1>
      <p class="tagline">Watch anime, movies and more online for free</p>
      <button id="home-button" class="cta">Enter KagePlay</button>
    </header>

    <footer class="footer">
      <p class="developed-by">
        Developed by
        <a href="https://www.instagram.com/psyflowz/" target="_blank" rel="noopener noreferrer" class="social-link">
          <img class="social-icon instagram-icon" src="https://www.svgrepo.com/show/424911/instagram-logo-facebook-2.svg" alt="Instagram icon" />
          @psyflowz
        </a>
      </p>
      <p class="contact-info">
        For issues or content suggestions, DM
        <a href="https://www.instagram.com/psyflowz/" target="_blank" rel="noopener noreferrer" class="social-link">
          <img class="social-icon instagram-icon" src="https://www.svgrepo.com/show/424911/instagram-logo-facebook-2.svg" alt="Instagram icon" />
          @psyflowz
        </a>
        on Instagram or join
        <a href="https://dsc.gg/kageplay" target="_blank" rel="noopener noreferrer" class="social-link">
          <img class="social-icon discord-icon" src="https://www.svgrepo.com/show/394116/discord.svg" alt="Discord icon" />
          Discord 
        </a>
        for daily anime episode updates and support
      </p>
    </footer>
  </main>
`;

const homeButton = document.querySelector<HTMLButtonElement>('#home-button');
homeButton?.addEventListener('click', () => {
  window.location.href = 'https://kageplay.ct.ws/home';
});
