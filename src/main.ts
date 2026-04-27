import './style.css';

const app = document.querySelector<HTMLDivElement>('#app');

if (!app) {
  throw new Error('App root not found');
}

app.innerHTML = `
  <main class="page">
    <section class="overlay">
      <header class="hero">
        <img class="logo" src="/kageplay-logo.png" alt="KagePlay logo" />
        <h1>KagePlay Home Page</h1>
        <p class="tagline">The best site to watch anime online for Free</p>
        <button id="home-button" class="cta">Go to KagePlay Home</button>
      </header>

      <section class="content">
        <p>Do you know that according to Google, the monthly search volume for anime related topics is up to over 1 Billion times? Anime is famous worldwide and it is no wonder we've seen a sharp rise in the number of free anime streaming sites.</p>

        <p>Just like free online movie streaming sites, anime watching sites are not created equally, some are better than the rest, so we've decided to build KagePlay to be one of the best free anime streaming site for all anime fans on the world.</p>

        <h2>1/ What is KagePlay?</h2>
        <p>KagePlay is a free site to watch anime and you can even download subbed or dubbed anime in ultra HD quality without any registration or payment. By having No Ads in all kinds, we are trying to make it the safest site for free anime.</p>

        <h2>2/ Is KagePlay safe?</h2>
        <p>Yes we are, we do have only one Ads to cover the server cost and we keep scanning the ads 24/7 to make sure all are clean, If you find any ads that is suspicious, please forward us the info and we will remove it.</p>

        <h2>3/ So what make KagePlay the best site to watch anime free online?</h2>
        <p>Before building KagePlay, we've checked many other free anime sites, and learnt from them. We only keep the good things and remove all the bad things from all the competitors, to put it in our KagePlay website.</p>

        <ul>
          <li><strong>Safety:</strong> We try our best to not having harmful ads on KagePlay.</li>
          <li><strong>Content library:</strong> Popular, classic, and current anime with subtitles and dubs across many genres.</li>
          <li><strong>Quality/Resolution:</strong> Stream at 360p, 720p, or 1080p depending on your internet speed.</li>
          <li><strong>Streaming experience:</strong> Fast loading speed and easy downloads for offline viewing.</li>
          <li><strong>Updates:</strong> New titles and requested content added daily.</li>
          <li><strong>User interface:</strong> Simple navigation through search, categories, and latest releases.</li>
          <li><strong>Device compatibility:</strong> Works on mobile and desktop.</li>
          <li><strong>Customer care:</strong> Active support 24/7 for help and requests.</li>
        </ul>

        <p>So if you're looking for a trustworthy and safe site for your Anime streaming, let's give KagePlay a try. And if you like us, please help us to spread the words and do not forget to bookmark our site.</p>

        <h2>Popular Anime</h2>
        <ul class="popular-list">
          <li><strong>One Piece</strong> — Monkey D. Luffy wants to become a sea-robber...</li>
          <li><strong>Chainsaw Man</strong> — Denji has a simple dream—to live a happy and peaceful life...</li>
          <li><strong>Bleach: TYBW</strong> — Was it all just a coincidence, or was it inevitable?</li>
          <li><strong>Blue Lock</strong> — After reflecting on the current state of Japanese soccer...</li>
          <li><strong>Naruto Shippuden</strong> — Continuation of the original series...</li>
        </ul>
      </section>

      <footer class="footer">
        <p>Developed by</p>
        <div class="socials">
          <a class="social-btn instagram" href="https://www.instagram.com/psyflowz/" target="_blank" rel="noreferrer">Instagram</a>
          <a class="social-btn discord" href="https://dsc.gg/kageplay" target="_blank" rel="noreferrer">Discord</a>
        </div>
      </footer>
    </section>
  </main>
`;

const homeButton = document.querySelector<HTMLButtonElement>('#home-button');
homeButton?.addEventListener('click', () => {
  window.location.href = 'https://kageplay.ct.ws/home';
});
