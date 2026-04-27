import './style.css';

const root = document.querySelector<HTMLDivElement>('#app');
const ANALYTICS_KEY = 'kageplay_analytics';

if (!root) {
  throw new Error('App root not found');
}

const app = root;

interface AnalyticsData {
  totalVisits: number;
  firstVisit: string;
  lastVisit: string;
  devices: Record<string, number>;
  browsers: Record<string, number>;
  os: Record<string, number>;
}

const initialAnalytics: AnalyticsData = {
  totalVisits: 0,
  firstVisit: '',
  lastVisit: '',
  devices: { desktop: 0, mobile: 0, tablet: 0, unknown: 0 },
  browsers: { chrome: 0, safari: 0, firefox: 0, edge: 0, opera: 0, other: 0 },
  os: { windows: 0, macos: 0, linux: 0, android: 0, ios: 0, other: 0 },
};

function getAnalytics(): AnalyticsData {
  const stored = localStorage.getItem(ANALYTICS_KEY);
  if (!stored) {
    return { ...initialAnalytics };
  }

  try {
    return { ...initialAnalytics, ...JSON.parse(stored) } as AnalyticsData;
  } catch {
    return { ...initialAnalytics };
  }
}

function saveAnalytics(data: AnalyticsData) {
  localStorage.setItem(ANALYTICS_KEY, JSON.stringify(data));
}

function getDeviceType(): string {
  const ua = navigator.userAgent.toLowerCase();
  if (/(ipad|tablet|playbook|silk)/i.test(ua) || (ua.includes('android') && !ua.includes('mobile'))) {
    return 'tablet';
  }
  if (/mobi|android|iphone|ipod|blackberry|bb10|opera mini|mobile/i.test(ua)) {
    return 'mobile';
  }
  return 'desktop';
}

function getBrowserName(): string {
  const ua = navigator.userAgent;
  if (/edg\//i.test(ua) || /edge\//i.test(ua)) return 'edge';
  if (/opr\//i.test(ua) || /opera/i.test(ua)) return 'opera';
  if (/chrome\//i.test(ua) && !/edg\//i.test(ua)) return 'chrome';
  if (/firefox\//i.test(ua)) return 'firefox';
  if (/safari\//i.test(ua) && !/chrome\//i.test(ua)) return 'safari';
  return 'other';
}

function getOSName(): string {
  const ua = navigator.userAgent.toLowerCase();
  if (ua.includes('android')) return 'android';
  if (/iphone|ipad|ipod|ios/.test(ua)) return 'ios';
  if (ua.includes('windows')) return 'windows';
  if (ua.includes('macintosh') || ua.includes('mac os x')) return 'macos';
  if (ua.includes('linux')) return 'linux';
  return 'other';
}

function formatDate(value: string): string {
  if (!value) return 'No data';
  return new Date(value).toLocaleString();
}

function recordVisit(): AnalyticsData {
  const analytics = getAnalytics();
  const device = getDeviceType();
  const browser = getBrowserName();
  const os = getOSName();
  const now = new Date().toISOString();

  analytics.totalVisits += 1;
  if (!analytics.firstVisit) {
    analytics.firstVisit = now;
  }
  analytics.lastVisit = now;
  analytics.devices[device] = (analytics.devices[device] || 0) + 1;
  analytics.browsers[browser] = (analytics.browsers[browser] || 0) + 1;
  analytics.os[os] = (analytics.os[os] || 0) + 1;

  saveAnalytics(analytics);
  return analytics;
}

function buildMetricList(items: Record<string, number>): string {
  return Object.entries(items)
    .map(([label, value]) => `<li><span>${label}</span> <strong>${value}</strong></li>`)
    .join('');
}

function renderHome() {
  recordVisit();
  app.innerHTML = `
    <div class="stars"></div>
    <main class="page">
      <header class="hero">
        <img class="logo" src="/kageplay-logo.png" alt="KagePlay logo" />
        <h1>Your Gateway to Free Anime</h1>
        <p class="tagline">Watch anime, movies and more online for free</p>
        <button id="home-button" class="cta">Enter KagePlay</button>
        <a href="?page=admin" class="admin-link">Admin dashboard</a>
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
}

function renderAdmin() {
  const analytics = getAnalytics();
  app.innerHTML = `
    <div class="stars"></div>
    <main class="page admin-page">
      <header class="hero">
        <img class="logo" src="/kageplay-logo.png" alt="KagePlay logo" />
        <h1>Visitor Dashboard</h1>
        <p class="tagline">Visitor metrics, device breakdowns, browser counts and OS usage.</p>
        <a href="/" class="cta admin-back">Back to Home</a>
      </header>

      <section class="admin-panel">
        <div class="stat-card">
          <p>Total visits</p>
          <strong>${analytics.totalVisits}</strong>
        </div>
        <div class="stat-card">
          <p>Device usage</p>
          <ul class="metric-list">
            ${buildMetricList(analytics.devices)}
          </ul>
        </div>
        <div class="stat-card">
          <p>Browser usage</p>
          <ul class="metric-list">
            ${buildMetricList(analytics.browsers)}
          </ul>
        </div>
        <div class="stat-card">
          <p>OS usage</p>
          <ul class="metric-list">
            ${buildMetricList(analytics.os)}
          </ul>
        </div>
        <div class="stat-card">
          <p>First visit</p>
          <strong>${formatDate(analytics.firstVisit)}</strong>
        </div>
        <div class="stat-card">
          <p>Last visit</p>
          <strong>${formatDate(analytics.lastVisit)}</strong>
        </div>
      </section>

      <p class="admin-note">Visitor metrics are stored locally in this browser. This page summarizes visit counts, device type, browser, and operating system data.</p>

      <footer class="footer">
        <p class="developed-by">
          Developed by
          <a href="https://www.instagram.com/psyflowz/" target="_blank" rel="noopener noreferrer" class="social-link">
            <img class="social-icon instagram-icon" src="https://www.svgrepo.com/show/424911/instagram-logo-facebook-2.svg" alt="Instagram icon" />
            @psyflowz
          </a>
        </p>
      </footer>
    </main>
  `;
}

function renderApp() {
  const params = new URLSearchParams(window.location.search);
  const adminMode = params.get('page') === 'admin' || window.location.pathname.endsWith('/admin') || window.location.hash === '#admin';

  if (adminMode) {
    renderAdmin();
    return;
  }

  renderHome();
}

renderApp();
window.addEventListener('popstate', renderApp);

