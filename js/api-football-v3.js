// API-Football v3 Integration
// Free plan: 100 requests/day
// Documentation: https://www.api-football.com/documentation-v3

class APIFootball {
    constructor() {
        // ВАЖНО: Замените на ваш API ключ с https://dashboard.api-football.com/
        this.apiKey = 'YOUR_API_KEY_HERE';
        this.baseURL = 'https://v3.football.api-sports.io';
        this.headers = {
            'x-rapidapi-host': 'v3.football.api-sports.io',
            'x-rapidapi-key': this.apiKey
        };
    }

    async request(endpoint, params = {}) {
        const url = new URL(`${this.baseURL}${endpoint}`);
        Object.keys(params).forEach(key => {
            if (params[key] !== null && params[key] !== undefined) {
                url.searchParams.append(key, params[key]);
            }
        });

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: this.headers
            });

            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }

            const data = await response.json();
            return data.response || [];
        } catch (error) {
            console.error('API-Football Error:', error);
            throw error;
        }
    }

    // Лиги
    async getLeagues(params = {}) {
        return this.request('/leagues', params);
    }

    // Команды
    async getTeams(params = {}) {
        return this.request('/teams', params);
    }

    // Состав команды
    async getTeamSquad(teamId, season = 2024) {
        return this.request('/players/squads', { team: teamId });
    }

    // Турнирная таблица
    async getStandings(league, season = 2024) {
        return this.request('/standings', { league, season });
    }

    // Матчи
    async getFixtures(params = {}) {
        return this.request('/fixtures', params);
    }

    // Живые матчи
    async getLiveFixtures() {
        return this.request('/fixtures', { live: 'all' });
    }

    // Топ-5 лиг
    static get TOP_LEAGUES() {
        return {
            PREMIER_LEAGUE: { id: 39, name: 'Premier League', country: 'England' },
            LA_LIGA: { id: 140, name: 'La Liga', country: 'Spain' },
            BUNDESLIGA: { id: 78, name: 'Bundesliga', country: 'Germany' },
            SERIE_A: { id: 135, name: 'Serie A', country: 'Italy' },
            LIGUE_1: { id: 61, name: 'Ligue 1', country: 'France' },
            KAZAKHSTAN: { id: 342, name: 'Premier League', country: 'Kazakhstan' }
        };
    }
}

// RSS News Parser для футбольных новостей
class FootballNewsRSS {
    constructor() {
        // Используем бесплатные RSS фиды
        this.feeds = [
            { name: 'BBC Sport Football', url: 'https://feeds.bbci.co.uk/sport/football/rss.xml' },
            { name: 'Sky Sports Football', url: 'https://www.skysports.com/rss/12040' },
            { name: 'ESPN Football', url: 'https://www.espn.com/espn/rss/soccer/news' }
        ];
    }

    async fetchNews(limit = 20) {
        // Для локального тестирования используем демо-данные
        // В продакшене нужен CORS proxy или серверная часть
        return this.getDemoNews(limit);
    }

    getDemoNews(limit = 20) {
        const demoNews = [
            {
                title: 'Premier League: Manchester City defeats Arsenal 2-1',
                url: '#',
                image: 'images/news1.jpg',
                source: 'BBC Sport',
                date: new Date().toISOString(),
                description: 'Manchester City secured a crucial victory over Arsenal in a thrilling Premier League encounter.'
            },
            {
                title: 'Champions League: Real Madrid advances to semifinals',
                url: '#',
                image: 'images/news2.jpg',
                source: 'Sky Sports',
                date: new Date(Date.now() - 86400000).toISOString(),
                description: 'Real Madrid booked their place in the Champions League semifinals with a commanding performance.'
            },
            {
                title: 'Transfer News: Top clubs eye summer signings',
                url: '#',
                image: 'images/news3.jpg',
                source: 'ESPN',
                date: new Date(Date.now() - 172800000).toISOString(),
                description: 'Major European clubs are preparing for a busy summer transfer window with several high-profile targets.'
            },
            {
                title: 'La Liga: Barcelona extends winning streak to 10 games',
                url: '#',
                image: 'images/champleague.jpg',
                source: 'BBC Sport',
                date: new Date(Date.now() - 259200000).toISOString(),
                description: 'Barcelona continues their impressive form with another convincing victory in La Liga.'
            },
            {
                title: 'Bundesliga: Bayern Munich clinches another title',
                url: '#',
                image: 'images/premierleague.jpg',
                source: 'Sky Sports',
                date: new Date(Date.now() - 345600000).toISOString(),
                description: 'Bayern Munich secured yet another Bundesliga title with games to spare.'
            },
            {
                title: 'Serie A: Inter Milan maintains top position',
                url: '#',
                image: 'images/messi aura.jpg',
                source: 'ESPN',
                date: new Date(Date.now() - 432000000).toISOString(),
                description: 'Inter Milan remains at the summit of Serie A after a hard-fought victory.'
            }
        ];

        return demoNews.slice(0, limit);
    }
}

// Экспорт для использования
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { APIFootball, FootballNewsRSS };
}
