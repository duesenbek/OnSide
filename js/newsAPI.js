// Локальная система новостей (работает без внешних API)
// Использует качественные демо-данные с актуальными новостями

// Функция получения новостей
async function fetchNews(source = 'all') {
    // Имитируем задержку загрузки для реалистичности
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Получаем все новости
    const allNews = getFootballNews();
    
    // Фильтруем по источнику если нужно
    if (source !== 'all') {
        return allNews.filter(item => 
            item.source.toLowerCase().includes(source.toLowerCase())
        );
    }
    
    return allNews;
}

// Получить название источника
function getSourceName(source) {
    const names = {
        'espn': 'ESPN',
        'goal': 'Goal',
        '90mins': '90min',
        'onefootball': 'OneFootball',
        'all': 'Football News'
    };
    return names[source] || 'Football News';
}

// Полная база футбольных новостей с реальными изображениями от TheSportsDB
function getFootballNews() {
    const now = Date.now();
    const hour = 3600000;
    const day = 86400000;
    
    return [
        // ESPN News
        {
            title: 'Premier League: Liverpool maintains top spot in title race',
            url: '#',
            image: 'https://r2.thesportsdb.com/images/media/team/fanart/b100fs1731826535.jpg',
            source: 'ESPN',
            date: new Date(now - 2 * hour).toISOString(),
            description: 'Liverpool continues their impressive form at the top of the Premier League table with another commanding performance.'
        },
        {
            title: 'Champions League: Real Madrid advances to knockout stage',
            url: '#',
            image: 'https://r2.thesportsdb.com/images/media/team/fanart/dcghc71731852252.jpg',
            source: 'ESPN',
            date: new Date(now - 5 * hour).toISOString(),
            description: 'Real Madrid secured their place in the Champions League knockout rounds with a convincing victory.'
        },
        {
            title: 'Transfer News: Top clubs eye January signings',
            url: '#',
            image: 'https://r2.thesportsdb.com/images/media/team/fanart/v2gwen1731827710.jpg',
            source: 'ESPN',
            date: new Date(now - 8 * hour).toISOString(),
            description: 'Major European clubs are preparing for the January transfer window with several high-profile targets identified.'
        },
        
        // Goal News
        {
            title: 'La Liga: Barcelona extends unbeaten run to 15 matches',
            url: '#',
            image: 'https://r2.thesportsdb.com/images/media/team/fanart/qqm9rn1731313837.jpg',
            source: 'Goal',
            date: new Date(now - 1 * day).toISOString(),
            description: 'Barcelona continued their impressive form with a commanding 3-0 victory, maintaining pressure on league leaders Real Madrid.'
        },
        {
            title: 'Bundesliga: Bayern Munich dominates weekend fixtures',
            url: '#',
            image: 'https://r2.thesportsdb.com/images/media/team/fanart/wrryur1420579232.jpg',
            source: 'Goal',
            date: new Date(now - 1 * day - 3 * hour).toISOString(),
            description: 'Bayern Munich showed their class with another dominant performance in the Bundesliga.'
        },
        {
            title: 'Serie A: Inter Milan maintains top position',
            url: '#',
            image: 'https://r2.thesportsdb.com/images/media/team/fanart/4cuiqc1731852088.jpg',
            source: 'Goal',
            date: new Date(now - 1 * day - 6 * hour).toISOString(),
            description: 'Inter Milan continues to lead Serie A with another impressive victory.'
        },
        
        // 90min News
        {
            title: 'World Cup 2026: Qualifying draw produces blockbuster groups',
            url: '#',
            image: 'https://r2.thesportsdb.com/images/media/team/fanart/lk3che1731313857.jpg',
            source: '90min',
            date: new Date(now - 2 * day).toISOString(),
            description: 'The draw for World Cup 2026 qualifying has created several mouth-watering groups, with traditional powerhouses facing tough paths.'
        },
        {
            title: 'Premier League: Arsenal challenges for title',
            url: '#',
            image: 'https://r2.thesportsdb.com/images/media/team/fanart/ddmaih1731313886.jpg',
            source: '90min',
            date: new Date(now - 2 * day - 4 * hour).toISOString(),
            description: 'Arsenal continues their impressive title challenge with another strong performance.'
        },
        {
            title: 'Ligue 1: PSG maintains domestic dominance',
            url: '#',
            image: 'https://r2.thesportsdb.com/images/media/team/fanart/sub60p1731852194.jpg',
            source: '90min',
            date: new Date(now - 2 * day - 8 * hour).toISOString(),
            description: 'Paris Saint-Germain continues to dominate Ligue 1 with another commanding victory.'
        },
        
        // OneFootball News
        {
            title: 'Europa League: Exciting semifinal matchups confirmed',
            url: '#',
            image: 'https://r2.thesportsdb.com/images/media/team/fanart/2uvo8p1731313907.jpg',
            source: 'OneFootball',
            date: new Date(now - 3 * day).toISOString(),
            description: 'The Europa League semifinals promise thrilling encounters as four top European clubs battle for a place in the final.'
        },
        {
            title: 'Ballon d\'Or race: Top contenders emerge for 2025 award',
            url: '#',
            image: 'https://r2.thesportsdb.com/images/media/team/fanart/s4rayz1731826561.jpg',
            source: 'OneFootball',
            date: new Date(now - 3 * day - 5 * hour).toISOString(),
            description: 'With the season entering its final stretch, several players have positioned themselves as frontrunners for football\'s most prestigious individual honor.'
        },
        {
            title: 'Women\'s Football: Record attendance at Champions League final',
            url: '#',
            image: 'https://r2.thesportsdb.com/images/media/team/fanart/p8xxwp1731826441.jpg',
            source: 'OneFootball',
            date: new Date(now - 3 * day - 10 * hour).toISOString(),
            description: 'Women\'s football continues its remarkable growth with a record-breaking crowd witnessing an unforgettable Champions League final.'
        },
        
        // More ESPN
        {
            title: 'Injury Update: Key players return for title run-in',
            url: '#',
            image: 'https://r2.thesportsdb.com/images/media/team/fanart/jagant1731852137.jpg',
            source: 'ESPN',
            date: new Date(now - 4 * day).toISOString(),
            description: 'Several key players are set to return from injury just in time for the crucial final stretch of the season.'
        },
        {
            title: 'Tactical Analysis: How pressing revolutionized modern football',
            url: '#',
            image: 'https://r2.thesportsdb.com/images/media/team/fanart/9nla2h1731852454.jpg',
            source: 'ESPN',
            date: new Date(now - 4 * day - 6 * hour).toISOString(),
            description: 'An in-depth look at how high-intensity pressing has become the defining tactical trend in contemporary football.'
        },
        
        // More Goal
        {
            title: 'Youth Academy: Next generation of superstars emerging',
            url: '#',
            image: 'https://r2.thesportsdb.com/images/media/team/fanart/5nqhti1731315142.jpg',
            source: 'Goal',
            date: new Date(now - 5 * day).toISOString(),
            description: 'Europe\'s top academies are producing an exceptional crop of young talent, with several teenagers already making waves at the highest level.'
        },
        {
            title: 'Financial Fair Play: New regulations impact transfer market',
            url: '#',
            image: 'https://r2.thesportsdb.com/images/media/team/fanart/ws3ui61731315162.jpg',
            source: 'Goal',
            date: new Date(now - 5 * day - 7 * hour).toISOString(),
            description: 'Updated FFP rules are reshaping how clubs approach the transfer market, with long-term planning becoming increasingly crucial.'
        },
        
        // More 90min
        {
            title: 'Derby Day: Historic rivalries renewed across Europe',
            url: '#',
            image: 'https://r2.thesportsdb.com/images/media/team/fanart/ocmpmi1731315209.jpg',
            source: '90min',
            date: new Date(now - 6 * day).toISOString(),
            description: 'This weekend sees some of football\'s most intense derbies take place, with local bragging rights and crucial points at stake.'
        },
        {
            title: 'Manager Spotlight: Rising coaching stars making their mark',
            url: '#',
            image: 'https://r2.thesportsdb.com/images/media/team/fanart/9wdx3c1731315186.jpg',
            source: '90min',
            date: new Date(now - 6 * day - 8 * hour).toISOString(),
            description: 'A new generation of managers is bringing fresh ideas and innovative tactics to Europe\'s top leagues.'
        },
        
        // More OneFootball
        {
            title: 'Stadium News: State-of-the-art venues set to open',
            url: '#',
            image: 'https://r2.thesportsdb.com/images/media/team/fanart/tuuwpy1424110617.jpg',
            source: 'OneFootball',
            date: new Date(now - 7 * day).toISOString(),
            description: 'Several clubs are preparing to unveil cutting-edge stadiums that will set new standards for fan experience and sustainability.'
        },
        {
            title: 'International Break: Key World Cup qualifiers on the horizon',
            url: '#',
            image: 'https://r2.thesportsdb.com/images/media/team/fanart/xywqqs1421078139.jpg',
            source: 'OneFootball',
            date: new Date(now - 7 * day - 9 * hour).toISOString(),
            description: 'National teams prepare for crucial World Cup qualifying matches that could determine their fate for the 2026 tournament.'
        }
    ];
}

// Функция получения списка доступных источников
async function fetchAvailableSources() {
    return [
        { id: 'all', name: 'All Sources' },
        { id: 'espn', name: 'ESPN' },
        { id: 'goal', name: 'Goal' },
        { id: '90mins', name: '90min' },
        { id: 'onefootball', name: 'OneFootball' }
    ];
}
