// Football Data API v4 Service Module
// Documentation: https://api.football-data.org/v4/

class FootballAPI {
    constructor(apiKey = null) {
        this.baseURL = 'https://api.football-data.org/v4';
        this.apiKey = apiKey;
        this.headers = {
            'X-Auth-Token': apiKey,
            'Content-Type': 'application/json'
        };
    }

    // Generic request method
    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const config = {
            headers: this.headers,
            ...options
        };

        try {
            const response = await fetch(url, config);
            if (!response.ok) {
                throw new Error(`API Error: ${response.status} - ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Football API Error:', error);
            throw error;
        }
    }

    // Get all available competitions
    async getCompetitions(areas = null) {
        const endpoint = areas ? `/competitions?areas=${areas}` : '/competitions';
        return this.request(endpoint);
    }

    // Get specific competition
    async getCompetition(id) {
        return this.request(`/competitions/${id}`);
    }

    // Get competition standings
    async getStandings(competitionId, options = {}) {
        const params = new URLSearchParams();
        if (options.matchday) params.append('matchday', options.matchday);
        if (options.season) params.append('season', options.season);
        if (options.date) params.append('date', options.date);
        
        const endpoint = `/competitions/${competitionId}/standings${params.toString() ? '?' + params.toString() : ''}`;
        return this.request(endpoint);
    }

    // Get competition matches
    async getCompetitionMatches(competitionId, options = {}) {
        const params = new URLSearchParams();
        if (options.dateFrom) params.append('dateFrom', options.dateFrom);
        if (options.dateTo) params.append('dateTo', options.dateTo);
        if (options.stage) params.append('stage', options.stage);
        if (options.status) params.append('status', options.status);
        if (options.matchday) params.append('matchday', options.matchday);
        if (options.group) params.append('group', options.group);
        if (options.season) params.append('season', options.season);
        
        const endpoint = `/competitions/${competitionId}/matches${params.toString() ? '?' + params.toString() : ''}`;
        return this.request(endpoint);
    }

    // Get competition teams
    async getCompetitionTeams(competitionId, season = null) {
        const endpoint = season ? `/competitions/${competitionId}/teams?season=${season}` : `/competitions/${competitionId}/teams`;
        return this.request(endpoint);
    }

    // Get competition top scorers
    async getTopScorers(competitionId, options = {}) {
        const params = new URLSearchParams();
        if (options.limit) params.append('limit', options.limit);
        if (options.season) params.append('season', options.season);
        
        const endpoint = `/competitions/${competitionId}/scorers${params.toString() ? '?' + params.toString() : ''}`;
        return this.request(endpoint);
    }

    // Get specific team
    async getTeam(teamId) {
        return this.request(`/teams/${teamId}`);
    }

    // Get all teams
    async getTeams(options = {}) {
        const params = new URLSearchParams();
        if (options.limit) params.append('limit', options.limit);
        if (options.offset) params.append('offset', options.offset);
        
        const endpoint = `/teams${params.toString() ? '?' + params.toString() : ''}`;
        return this.request(endpoint);
    }

    // Get team matches
    async getTeamMatches(teamId, options = {}) {
        const params = new URLSearchParams();
        if (options.dateFrom) params.append('dateFrom', options.dateFrom);
        if (options.dateTo) params.append('dateTo', options.dateTo);
        if (options.season) params.append('season', options.season);
        if (options.competitions) params.append('competitions', options.competitions);
        if (options.status) params.append('status', options.status);
        if (options.venue) params.append('venue', options.venue);
        if (options.limit) params.append('limit', options.limit);
        
        const endpoint = `/teams/${teamId}/matches/${params.toString() ? '?' + params.toString() : ''}`;
        return this.request(endpoint);
    }

    // Get specific person
    async getPerson(personId) {
        return this.request(`/persons/${personId}`);
    }

    // Get person matches
    async getPersonMatches(personId, options = {}) {
        const params = new URLSearchParams();
        if (options.dateFrom) params.append('dateFrom', options.dateFrom);
        if (options.dateTo) params.append('dateTo', options.dateTo);
        if (options.status) params.append('status', options.status);
        if (options.competitions) params.append('competitions', options.competitions);
        if (options.limit) params.append('limit', options.limit);
        if (options.offset) params.append('offset', options.offset);
        
        const endpoint = `/persons/${personId}/matches${params.toString() ? '?' + params.toString() : ''}`;
        return this.request(endpoint);
    }

    // Get specific match
    async getMatch(matchId) {
        return this.request(`/matches/${matchId}`);
    }

    // Get matches across competitions
    async getMatches(options = {}) {
        const params = new URLSearchParams();
        if (options.competitions) params.append('competitions', options.competitions);
        if (options.ids) params.append('ids', options.ids);
        if (options.dateFrom) params.append('dateFrom', options.dateFrom);
        if (options.dateTo) params.append('dateTo', options.dateTo);
        if (options.status) params.append('status', options.status);
        
        const endpoint = `/matches${params.toString() ? '?' + params.toString() : ''}`;
        return this.request(endpoint);
    }

    // Get head-to-head matches
    async getHead2Head(matchId, options = {}) {
        const params = new URLSearchParams();
        if (options.limit) params.append('limit', options.limit);
        if (options.dateFrom) params.append('dateFrom', options.dateFrom);
        if (options.dateTo) params.append('dateTo', options.dateTo);
        if (options.competitions) params.append('competitions', options.competitions);
        
        const endpoint = `/matches/${matchId}/head2head${params.toString() ? '?' + params.toString() : ''}`;
        return this.request(endpoint);
    }

    // Get areas
    async getAreas() {
        return this.request('/areas');
    }

    // Get specific area
    async getArea(areaId) {
        return this.request(`/areas/${areaId}`);
    }

    // Utility method to format date for API
    static formatDate(date) {
        return date.toISOString().split('T')[0];
    }

    // Utility method to get today's date
    static getToday() {
        return FootballAPI.formatDate(new Date());
    }

    // Utility method to get date X days from now
    static getDateFromNow(days) {
        const date = new Date();
        date.setDate(date.getDate() + days);
        return FootballAPI.formatDate(date);
    }

    // Utility method to get date X days ago
    static getDateAgo(days) {
        const date = new Date();
        date.setDate(date.getDate() - days);
        return FootballAPI.formatDate(date);
    }
}

// Popular competition IDs for easy reference
FootballAPI.COMPETITIONS = {
    CHAMPIONS_LEAGUE: 'CL',
    EUROPA_LEAGUE: 'EL',
    PREMIER_LEAGUE: 'PL',
    LA_LIGA: 'PD',
    BUNDESLIGA: 'BL1',
    SERIE_A: 'SA',
    LIGUE_1: 'FL1',
    EREDIVISIE: 'DED'
};

// Match statuses
FootballAPI.MATCH_STATUS = {
    SCHEDULED: 'SCHEDULED',
    LIVE: 'LIVE',
    IN_PLAY: 'IN_PLAY',
    PAUSED: 'PAUSED',
    FINISHED: 'FINISHED',
    POSTPONED: 'POSTPONED',
    SUSPENDED: 'SUSPENDED',
    CANCELLED: 'CANCELLED'
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FootballAPI;
}
