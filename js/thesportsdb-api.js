// TheSportsDB Free API - Полностью бесплатный API для футбола
// Документация: https://www.thesportsdb.com/api.php
// Логотипы команд, турнирные таблицы, составы - все бесплатно!

class TheSportsDB {
    constructor() {
        this.baseURL = 'https://www.thesportsdb.com/api/v1/json/3';
        // ID лиг в TheSportsDB
        this.leagues = {
            PREMIER_LEAGUE: { id: '4328', name: 'English Premier League', country: 'England' },
            LA_LIGA: { id: '4335', name: 'Spanish La Liga', country: 'Spain' },
            BUNDESLIGA: { id: '4331', name: 'German Bundesliga', country: 'Germany' },
            SERIE_A: { id: '4332', name: 'Italian Serie A', country: 'Italy' },
            LIGUE_1: { id: '4334', name: 'French Ligue 1', country: 'France' },
            SUPER_LIG: { id: '4358', name: 'Turkish Super Lig', country: 'Turkey' },
            KAZAKHSTAN_PL: { id: '4480', name: 'Kazakhstan Premier League', country: 'Kazakhstan' }
        };
    }

    async request(endpoint) {
        try {
            const response = await fetch(`${this.baseURL}${endpoint}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('TheSportsDB API Error:', error);
            return null;
        }
    }

    // Получить все команды лиги
    async getTeamsByLeague(leagueName) {
        const data = await this.request(`/search_all_teams.php?l=${encodeURIComponent(leagueName)}`);
        return data?.teams || [];
    }

    // Получить турнирную таблицу
    async getLeagueTable(leagueId, season = '2024-2025') {
        const data = await this.request(`/lookuptable.php?l=${leagueId}&s=${season}`);
        return data?.table || [];
    }

    // Получить состав команды
    async getTeamSquad(teamId) {
        const data = await this.request(`/lookup_all_players.php?id=${teamId}`);
        return data?.player || [];
    }

    // Поиск команды по имени
    async searchTeam(teamName) {
        const data = await this.request(`/searchteams.php?t=${encodeURIComponent(teamName)}`);
        return data?.teams?.[0] || null;
    }

    // Получить следующие 15 матчей лиги
    async getNextMatches(leagueId) {
        const data = await this.request(`/eventsnextleague.php?id=${leagueId}`);
        return data?.events || [];
    }

    // Получить последние 15 матчей лиги
    async getLastMatches(leagueId) {
        const data = await this.request(`/eventspastleague.php?id=${leagueId}`);
        return data?.events || [];
    }

    // Получить детали команды
    async getTeamDetails(teamId) {
        const data = await this.request(`/lookupteam.php?id=${teamId}`);
        return data?.teams?.[0] || null;
    }
}

// Создаем глобальный экземпляр
const sportsDB = new TheSportsDB();
