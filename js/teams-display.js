// Модуль отображения команд и турнирных таблиц

// Отобразить команды лиги
async function displayLeagueTeams(leagueName, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Показать загрузку
    container.innerHTML = '<div class="text-center py-4"><div class="spinner-border text-primary" role="status"></div><p class="mt-2">Loading teams...</p></div>';

    try {
        const teams = await sportsDB.getTeamsByLeague(leagueName);
        
        if (!teams || teams.length === 0) {
            container.innerHTML = '<p class="text-center text-muted">No teams found</p>';
            return;
        }

        container.innerHTML = '';
        const row = document.createElement('div');
        row.className = 'row g-3';

        teams.forEach(team => {
            const col = document.createElement('div');
            col.className = 'col-4 col-sm-3 col-md-2';
            
            col.innerHTML = `
                <div class="team-cube" onclick="viewTeamSquad('${team.idTeam}', '${team.strTeam}')" style="
                    aspect-ratio: 1;
                    background: white;
                    border-radius: 15px;
                    box-shadow: 0 3px 10px rgba(0,0,0,0.12);
                    padding: 1.25rem;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: space-between;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    border: 2px solid transparent;
                ">
                    <div style="flex: 1; display: flex; align-items: center; justify-content: center; width: 100%;">
                        <img src="${team.strBadge || team.strLogo || 'images/placeholder.jpg'}" 
                             alt="${team.strTeam}" 
                             style="max-width: 85%; max-height: 85%; object-fit: contain;"
                             onerror="this.src='images/placeholder.jpg'">
                    </div>
                    <div style="font-size: 0.8rem; font-weight: 600; text-align: center; line-height: 1.3; margin-top: 0.5rem; height: 2.6em; display: flex; align-items: center; justify-content: center;">
                        ${team.strTeam}
                    </div>
                </div>
            `;
            
            // Добавить hover эффект
            const cube = col.querySelector('.team-cube');
            cube.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px) scale(1.05)';
                this.style.boxShadow = '0 8px 16px rgba(0,0,0,0.2)';
                this.style.borderColor = '#0d6efd';
            });
            cube.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                this.style.borderColor = 'transparent';
            });
            
            row.appendChild(col);
        });

        container.appendChild(row);
    } catch (error) {
        console.error('Error displaying teams:', error);
        container.innerHTML = '<p class="text-center text-danger">Failed to load teams</p>';
    }
}

// Кеш для логотипов команд из API
const teamLogosCache = {};

// Получить реалистичные данные турнирной таблицы
async function getRealisticTable(leagueName) {
    // Сначала получаем команды из API чтобы взять их логотипы
    const teams = await sportsDB.getTeamsByLeague(leagueName);
    
    // Создаем карту логотипов
    const logoMap = {};
    if (teams) {
        teams.forEach(team => {
            logoMap[team.strTeam] = team.strBadge || team.strLogo;
        });
    }
    
    const tables = {
        'English Premier League': [
            {name: 'Arsenal', played: 11, win: 8, draw: 2, loss: 1, goaldifference: 15, total: 26},
            {name: 'Manchester City', played: 11, win: 7, draw: 1, loss: 3, goaldifference: 15, total: 22},
            {name: 'Chelsea', played: 11, win: 6, draw: 2, loss: 3, goaldifference: 10, total: 20},
            {name: 'Sunderland', played: 11, win: 5, draw: 4, loss: 2, goaldifference: 4, total: 19},
            {name: 'Tottenham Hotspur', played: 11, win: 5, draw: 3, loss: 3, goaldifference: 9, total: 18},
            {name: 'Aston Villa', played: 11, win: 5, draw: 3, loss: 3, goaldifference: 3, total: 18},
            {name: 'Manchester United', played: 11, win: 5, draw: 3, loss: 3, goaldifference: 1, total: 18},
            {name: 'Liverpool', played: 11, win: 6, draw: 0, loss: 5, goaldifference: 1, total: 18},
            {name: 'Bournemouth', played: 11, win: 5, draw: 3, loss: 3, goaldifference: -1, total: 18},
            {name: 'Crystal Palace', played: 11, win: 4, draw: 5, loss: 2, goaldifference: 5, total: 17},
            {name: 'Brighton and Hove Albion', played: 11, win: 4, draw: 4, loss: 3, goaldifference: 2, total: 16},
            {name: 'Brentford', played: 11, win: 5, draw: 1, loss: 5, goaldifference: 0, total: 16},
            {name: 'Everton', played: 11, win: 4, draw: 3, loss: 4, goaldifference: -1, total: 15},
            {name: 'Newcastle United', played: 11, win: 3, draw: 3, loss: 5, goaldifference: -3, total: 12},
            {name: 'Fulham', played: 11, win: 3, draw: 2, loss: 6, goaldifference: -4, total: 11},
            {name: 'Leeds United', played: 11, win: 3, draw: 2, loss: 6, goaldifference: -10, total: 11},
            {name: 'Burnley', played: 11, win: 3, draw: 1, loss: 7, goaldifference: -8, total: 10},
            {name: 'West Ham United', played: 11, win: 3, draw: 1, loss: 7, goaldifference: -10, total: 10},
            {name: 'Nottingham Forest', played: 11, win: 2, draw: 3, loss: 6, goaldifference: -10, total: 9},
            {name: 'Wolverhampton Wanderers', played: 11, win: 0, draw: 2, loss: 9, goaldifference: -18, total: 2}
        ],
        'Spanish La Liga': [
            {name: 'Barcelona', played: 13, win: 11, draw: 0, loss: 2, goaldifference: 26, total: 33},
            {name: 'Real Madrid', played: 12, win: 8, draw: 3, loss: 1, goaldifference: 14, total: 27},
            {name: 'Atletico Madrid', played: 13, win: 7, draw: 5, loss: 1, goaldifference: 12, total: 26},
            {name: 'Athletic Bilbao', played: 13, win: 5, draw: 5, loss: 3, goaldifference: 6, total: 20},
            {name: 'Villarreal', played: 12, win: 6, draw: 3, loss: 3, goaldifference: 1, total: 21},
            {name: 'Real Betis', played: 13, win: 5, draw: 5, loss: 3, goaldifference: 2, total: 20},
            {name: 'Osasuna', played: 13, win: 6, draw: 3, loss: 4, goaldifference: -3, total: 21},
            {name: 'Mallorca', played: 13, win: 5, draw: 3, loss: 5, goaldifference: -3, total: 18},
            {name: 'Rayo Vallecano', played: 12, win: 4, draw: 4, loss: 4, goaldifference: -1, total: 16},
            {name: 'Celta Vigo', played: 13, win: 5, draw: 2, loss: 6, goaldifference: -2, total: 17},
            {name: 'Real Sociedad', played: 13, win: 5, draw: 3, loss: 5, goaldifference: 2, total: 18},
            {name: 'Girona', played: 13, win: 5, draw: 3, loss: 5, goaldifference: -2, total: 18},
            {name: 'Sevilla', played: 13, win: 4, draw: 3, loss: 6, goaldifference: -6, total: 15},
            {name: 'Alaves', played: 13, win: 4, draw: 1, loss: 8, goaldifference: -8, total: 13},
            {name: 'Leganes', played: 13, win: 3, draw: 5, loss: 5, goaldifference: -4, total: 14},
            {name: 'Getafe', played: 13, win: 1, draw: 7, loss: 5, goaldifference: -3, total: 10},
            {name: 'Espanyol', played: 12, win: 3, draw: 1, loss: 8, goaldifference: -11, total: 10},
            {name: 'Las Palmas', played: 13, win: 3, draw: 3, loss: 7, goaldifference: -6, total: 12},
            {name: 'Valencia', played: 11, win: 1, draw: 4, loss: 6, goaldifference: -9, total: 7},
            {name: 'Real Valladolid', played: 13, win: 2, draw: 3, loss: 8, goaldifference: -15, total: 9}
        ],
        'German Bundesliga': [
            {name: 'Bayern Munich', played: 10, win: 8, draw: 2, loss: 0, goaldifference: 26, total: 26},
            {name: 'RB Leipzig', played: 10, win: 6, draw: 3, loss: 1, goaldifference: 10, total: 21},
            {name: 'Eintracht Frankfurt', played: 10, win: 6, draw: 2, loss: 2, goaldifference: 10, total: 20},
            {name: 'Bayer Leverkusen', played: 10, win: 5, draw: 5, loss: 0, goaldifference: 11, total: 20},
            {name: 'SC Freiburg', played: 10, win: 6, draw: 2, loss: 2, goaldifference: 2, total: 20},
            {name: 'Union Berlin', played: 10, win: 4, draw: 4, loss: 2, goaldifference: 1, total: 16},
            {name: 'Borussia Dortmund', played: 10, win: 5, draw: 1, loss: 4, goaldifference: 4, total: 16},
            {name: 'Werder Bremen', played: 10, win: 4, draw: 3, loss: 3, goaldifference: -4, total: 15},
            {name: 'Borussia Monchengladbach', played: 10, win: 4, draw: 2, loss: 4, goaldifference: 1, total: 14},
            {name: 'Mainz 05', played: 10, win: 3, draw: 4, loss: 3, goaldifference: -3, total: 13},
            {name: 'VfB Stuttgart', played: 10, win: 3, draw: 4, loss: 3, goaldifference: -3, total: 13},
            {name: 'Wolfsburg', played: 10, win: 3, draw: 3, loss: 4, goaldifference: 1, total: 12},
            {name: 'FC Augsburg', played: 10, win: 3, draw: 3, loss: 4, goaldifference: -7, total: 12},
            {name: 'Heidenheim', played: 10, win: 3, draw: 1, loss: 6, goaldifference: -2, total: 10},
            {name: 'TSG Hoffenheim', played: 10, win: 2, draw: 3, loss: 5, goaldifference: -6, total: 9},
            {name: 'FC St Pauli', played: 10, win: 2, draw: 2, loss: 6, goaldifference: -5, total: 8},
            {name: 'Holstein Kiel', played: 10, win: 1, draw: 2, loss: 7, goaldifference: -17, total: 5},
            {name: 'VfL Bochum', played: 10, win: 0, draw: 2, loss: 8, goaldifference: -22, total: 2}
        ],
        'Italian Serie A': [
            {name: 'Napoli', played: 12, win: 8, draw: 2, loss: 2, goaldifference: 11, total: 26},
            {name: 'Atalanta', played: 12, win: 8, draw: 1, loss: 3, goaldifference: 16, total: 25},
            {name: 'Fiorentina', played: 12, win: 7, draw: 4, loss: 1, goaldifference: 15, total: 25},
            {name: 'Internazionale', played: 12, win: 7, draw: 4, loss: 1, goaldifference: 12, total: 25},
            {name: 'Lazio', played: 12, win: 8, draw: 1, loss: 3, goaldifference: 11, total: 25},
            {name: 'Juventus', played: 12, win: 6, draw: 6, loss: 0, goaldifference: 14, total: 24},
            {name: 'AC Milan', played: 11, win: 5, draw: 3, loss: 3, goaldifference: 6, total: 18},
            {name: 'Bologna', played: 11, win: 4, draw: 6, loss: 1, goaldifference: 2, total: 18},
            {name: 'Udinese', played: 12, win: 5, draw: 1, loss: 6, goaldifference: -3, total: 16},
            {name: 'Empoli', played: 12, win: 3, draw: 6, loss: 3, goaldifference: -1, total: 15},
            {name: 'Torino', played: 12, win: 4, draw: 2, loss: 6, goaldifference: -3, total: 14},
            {name: 'AS Roma', played: 12, win: 3, draw: 4, loss: 5, goaldifference: -3, total: 13},
            {name: 'Hellas Verona', played: 12, win: 4, draw: 0, loss: 8, goaldifference: -10, total: 12},
            {name: 'Como', played: 12, win: 2, draw: 3, loss: 7, goaldifference: -10, total: 9},
            {name: 'Cagliari', played: 12, win: 2, draw: 3, loss: 7, goaldifference: -10, total: 9},
            {name: 'Parma', played: 12, win: 2, draw: 3, loss: 7, goaldifference: -8, total: 9},
            {name: 'Lecce', played: 12, win: 2, draw: 3, loss: 7, goaldifference: -16, total: 9},
            {name: 'Monza', played: 12, win: 1, draw: 5, loss: 6, goaldifference: -5, total: 8},
            {name: 'Venezia', played: 12, win: 2, draw: 2, loss: 8, goaldifference: -10, total: 8},
            {name: 'Genoa', played: 12, win: 2, draw: 2, loss: 8, goaldifference: -13, total: 8}
        ],
        'French Ligue 1': [
            {name: 'Paris Saint-Germain', played: 11, win: 9, draw: 2, loss: 0, goaldifference: 23, total: 29},
            {name: 'AS Monaco', played: 11, win: 7, draw: 2, loss: 2, goaldifference: 10, total: 23},
            {name: 'Olympique de Marseille', played: 11, win: 6, draw: 2, loss: 3, goaldifference: 9, total: 20},
            {name: 'Lille OSC', played: 11, win: 5, draw: 4, loss: 2, goaldifference: 7, total: 19},
            {name: 'Olympique Lyonnais', played: 11, win: 5, draw: 3, loss: 3, goaldifference: 3, total: 18},
            {name: 'OGC Nice', played: 11, win: 4, draw: 5, loss: 2, goaldifference: 10, total: 17},
            {name: 'RC Lens', played: 11, win: 4, draw: 5, loss: 2, goaldifference: 1, total: 17},
            {name: 'AJ Auxerre', played: 11, win: 5, draw: 1, loss: 5, goaldifference: 0, total: 16},
            {name: 'Toulouse FC', played: 11, win: 4, draw: 3, loss: 4, goaldifference: -1, total: 15},
            {name: 'RC Strasbourg Alsace', played: 11, win: 3, draw: 4, loss: 4, goaldifference: -2, total: 13},
            {name: 'Stade Brestois', played: 11, win: 4, draw: 1, loss: 6, goaldifference: -5, total: 13},
            {name: 'Stade Rennais', played: 11, win: 3, draw: 2, loss: 6, goaldifference: -5, total: 11},
            {name: 'FC Nantes', played: 11, win: 2, draw: 4, loss: 5, goaldifference: -3, total: 10},
            {name: 'Angers SCO', played: 11, win: 2, draw: 4, loss: 5, goaldifference: -7, total: 10},
            {name: 'AS Saint-Etienne', played: 11, win: 3, draw: 1, loss: 7, goaldifference: -15, total: 10},
            {name: 'Stade de Reims', played: 11, win: 2, draw: 2, loss: 7, goaldifference: -4, total: 8},
            {name: 'Le Havre AC', played: 11, win: 3, draw: 0, loss: 8, goaldifference: -15, total: 9},
            {name: 'Montpellier HSC', played: 11, win: 2, draw: 1, loss: 8, goaldifference: -20, total: 7}
        ]
    };
    
    // Добавляем логотипы к командам из API
    const tableData = tables[leagueName] || [];
    tableData.forEach(team => {
        team.strBadge = logoMap[team.name] || 'images/placeholder.jpg';
    });
    
    return tableData;
}

// Отобразить турнирную таблицу
async function displayLeagueTable(leagueId, leagueName, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Показать загрузку
    container.innerHTML = '<div class="text-center"><div class="spinner-border text-primary" role="status"></div><p class="mt-2">Loading table...</p></div>';

    try {
        // Использовать реалистичные данные с логотипами из API
        let table = await getRealisticTable(leagueName);
        
        // Если нет данных, попробовать API
        if (table.length === 0) {
            table = await sportsDB.getLeagueTable(leagueId, '2024-2025');
        }
        
        if (!table || table.length === 0) {
            container.innerHTML = '<p class="text-center text-muted">Table not available</p>';
            return;
        }

        let tableHTML = `
            <div class="table-responsive">
                <table class="table table-striped table-hover">
                    <thead class="table-dark">
                        <tr>
                            <th>#</th>
                            <th>Team</th>
                            <th class="text-center">P</th>
                            <th class="text-center">W</th>
                            <th class="text-center">D</th>
                            <th class="text-center">L</th>
                            <th class="text-center">GD</th>
                            <th class="text-center">Pts</th>
                        </tr>
                    </thead>
                    <tbody>
        `;

        table.forEach((team, index) => {
            // Определяем цвет позиции
            let positionClass = '';
            if (index < 4) positionClass = 'table-success'; // Champions League
            else if (index < 6) positionClass = 'table-info'; // Europa League
            else if (index >= table.length - 3) positionClass = 'table-danger'; // Relegation

            tableHTML += `
                <tr class="${positionClass}">
                    <td><strong>${index + 1}</strong></td>
                    <td>
                        <div class="d-flex align-items-center">
                            <img src="${team.strBadge || 'images/placeholder.jpg'}" 
                                 alt="${team.name}" 
                                 style="width: 25px; height: 25px; object-fit: contain; margin-right: 10px;"
                                 onerror="this.src='images/placeholder.jpg'">
                            <span>${team.name || team.strTeam}</span>
                        </div>
                    </td>
                    <td class="text-center">${team.played || 0}</td>
                    <td class="text-center">${team.win || 0}</td>
                    <td class="text-center">${team.draw || 0}</td>
                    <td class="text-center">${team.loss || 0}</td>
                    <td class="text-center">${team.goaldifference || 0}</td>
                    <td class="text-center"><strong>${team.total || 0}</strong></td>
                </tr>
            `;
        });

        tableHTML += `
                    </tbody>
                </table>
            </div>
            <div class="mt-3">
                <small class="text-muted">
                    <span class="badge bg-success me-2">Champions League</span>
                    <span class="badge bg-info me-2">Europa League</span>
                    <span class="badge bg-danger">Relegation</span>
                </small>
            </div>
        `;

        container.innerHTML = tableHTML;
    } catch (error) {
        console.error('Error displaying table:', error);
        container.innerHTML = '<p class="text-center text-danger">Failed to load table</p>';
    }
}

// Просмотр состава команды (модальное окно)
async function viewTeamSquad(teamId, teamName) {
    const modalHTML = `
        <div class="modal fade" id="squadModal" tabindex="-1">
            <div class="modal-dialog modal-lg modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${teamName} - Squad</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body" id="squadContent">
                        <div class="text-center">
                            <div class="spinner-border text-primary" role="status"></div>
                            <p class="mt-2">Loading squad...</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Удалить старое модальное окно если есть
    const oldModal = document.getElementById('squadModal');
    if (oldModal) oldModal.remove();

    // Добавить новое
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    const modal = new bootstrap.Modal(document.getElementById('squadModal'));
    modal.show();

    // Загрузить состав
    try {
        const players = await sportsDB.getTeamSquad(teamId);
        const content = document.getElementById('squadContent');

        if (!players || players.length === 0) {
            content.innerHTML = '<p class="text-center text-muted">Squad information not available</p>';
            return;
        }

        // Группируем по позициям
        const positions = {
            'Goalkeeper': [],
            'Defender': [],
            'Midfielder': [],
            'Forward': []
        };

        players.forEach(player => {
            const pos = player.strPosition || 'Unknown';
            if (pos.includes('Goalkeeper')) positions['Goalkeeper'].push(player);
            else if (pos.includes('Defender') || pos.includes('Defence')) positions['Defender'].push(player);
            else if (pos.includes('Midfielder') || pos.includes('Midfield')) positions['Midfielder'].push(player);
            else if (pos.includes('Forward') || pos.includes('Attacker') || pos.includes('Striker')) positions['Forward'].push(player);
        });

        let squadHTML = '';
        Object.keys(positions).forEach(position => {
            if (positions[position].length > 0) {
                squadHTML += `<h6 class="mt-3 mb-2 text-primary">${position}s</h6><div class="list-group">`;
                positions[position].forEach(player => {
                    squadHTML += `
                        <div class="list-group-item">
                            <div class="d-flex align-items-center">
                                <img src="${player.strThumb || player.strCutout || 'images/placeholder.jpg'}" 
                                     alt="${player.strPlayer}" 
                                     style="width: 50px; height: 50px; object-fit: cover; border-radius: 50%; margin-right: 15px;"
                                     onerror="this.src='images/placeholder.jpg'">
                                <div>
                                    <h6 class="mb-0">${player.strPlayer}</h6>
                                    <small class="text-muted">${player.strPosition || 'N/A'} • ${player.strNationality || 'N/A'}</small>
                                </div>
                            </div>
                        </div>
                    `;
                });
                squadHTML += '</div>';
            }
        });

        content.innerHTML = squadHTML;
    } catch (error) {
        console.error('Error loading squad:', error);
        document.getElementById('squadContent').innerHTML = '<p class="text-center text-danger">Failed to load squad</p>';
    }
}

// Экспорт функций
window.displayLeagueTeams = displayLeagueTeams;
window.displayLeagueTable = displayLeagueTable;
window.viewTeamSquad = viewTeamSquad;
