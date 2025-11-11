$(function () {

  $("h1:contains('Match Schedule'), h1:contains('Football News'), h1:contains('Number Guessing Game')")
    .css({ letterSpacing: "0.5px" });

  
  $(".news-card").css({ borderColor: "#16A34A" });


  const $dt = $("#liveDatetime");
  const $bgSel = $("#bgSelect");
  if ($dt.length) {
    const tick = () => {
      const now = new Date();
      $dt.text(now.toLocaleString(undefined, {
        year: "numeric", month: "2-digit", day: "2-digit",
        hour: "2-digit", minute: "2-digit", second: "2-digit"
      }));
    };
    tick();
    setInterval(tick, 1000);
  }
  if ($bgSel.length) {
    const KEY = "onside_bg_color";
    const saved = localStorage.getItem(KEY) || "";
    if (saved) {
      $("body").css("backgroundColor", saved);
      $bgSel.val(saved);
    }
    $bgSel.on("change", function () {
      const val = $(this).val() || "";
      $("body").css("backgroundColor", val);
      localStorage.setItem(KEY, val);
    });
  }

  
  $("#btnHide").on("click", () => $("#pDemo").hide());
  $("#btnShow").on("click", () => $("#pDemo").show());
  $("#btnToggle").on("click", () => $("#pDemo").toggle());

  $("#btnFadeIn").on("click", () => $("#imgFade").fadeIn(300));
  $("#btnFadeOut").on("click", () => $("#imgFade").fadeOut(300));
  $("#btnFadeToggle").on("click", () => $("#imgFade").fadeToggle(300));

  $("#btnSlideToggle").on("click", () => $("#panelJQ").slideToggle(250));


  $("#btnAdd").on("click", () => $("#jqList").append(`<li class="list-group-item">New Item ${Date.now()}</li>`));
  $("#btnPrepend").on("click", () => $("#jqList").prepend(`<li class="list-group-item">Prepended ${Date.now()}</li>`));
  $("#btnRemove").on("click", () => $("#jqList li:last").remove());

  $("#btnSwapImg").on("click", function () {
    const $img = $("#imgSwap");
    const cur = $img.attr("src");
    const alt = (cur && cur.includes("messi")) ? "images/champleague.jpg" : "images/messi aura.jpg";
    $img.attr("src", alt);
  });

  $("#btnChangeHref").on("click", function () {
    const $a = $("#dynamicLink");
    const cur = $a.attr("href");
    const next = (cur && cur.includes("google")) ? "https://wikipedia.org" : "https://google.com";
    $a.attr("href", next).text(`Go to ${next.replace("https://","")}`);
  });

  
  const resetBox = () => $("#boxJQ").stop(true, true).css({ left: 0, top: 0, width: 100, height: 100, opacity: 1 });
  $("#btnResetBox").on("click", resetBox);

  $("#btnAnimate").on("click", function () {
    const $b = $("#boxJQ");
    $b.stop(true, true)
      .animate({ left: "+=300" }, 600)   // right
      .animate({ top: "+=180" }, 600)    // down
      .animate({ width: 50, height: 50, opacity: 0.6 }, 600) // shrink
      .animate({ left: 0, top: 0, width: 100, height: 100, opacity: 1 }, 600); // back
  });

  $("#btnCombo").on("click", function () {
    $("#boxJQ").stop(true, true).animate({
      left: "+=220",
      top: "+=120",
      width: 160,
      height: 160,
      opacity: 0.7
    }, 800);
  });

 
  $("#jq-gallery .thumb").on("click", function () {
    const src = $(this).attr("src");
    const $main = $("#mainImg");
    $main.stop(true, true).fadeOut(150, function () {
      $main.attr("src", src).fadeIn(150);
    });
  });


  $("#jq-accordion .acc-panel").hide(); // старт: все скрыты
  $("#jq-accordion .acc-title").on("click", function () {
    const $panel = $(this).next(".acc-panel");
    // сворачиваем другие
    $("#jq-accordion .acc-panel").not($panel).slideUp(200);
    $panel.slideToggle(200);
  });


  let bouncing = false;
  let bounceTimer = null;

  function bounceLoop() {
    if (!bouncing) return;
    const $ball = $("#ball");
    const $pg = $("#playground");
    const maxX = $pg.width() - $ball.outerWidth();
    const maxY = $pg.height() - $ball.outerHeight();

    
    $ball.animate({ left: maxX, top: maxY }, 700)
         .animate({ left: 0, top: 0 }, 700, function () {
           if (bouncing) bounceLoop();
         });
  }

  $("#startBounce").on("click", function () {
    if (bouncing) return;
    bouncing = true;
    bounceLoop();
  });

  $("#stopBounce").on("click", function () {
    bouncing = false;
    $("#ball").stop(true, true);
    if (bounceTimer) clearTimeout(bounceTimer);
  });

  
  (function initGame(){
    const $form = $("#gameForm");
    if (!$form.length) return; // нет на этой странице
    const $input = $("#gameInput");
    const $fb = $("#gameFeedback");
    const $attempts = $("#gameAttempts");
    const $reset = $("#gameReset");
    let secret = Math.floor(Math.random() * 100) + 1;
    let tries = 0;

    function setFeedback(type, text) {
      $fb.removeClass().addClass("alert mt-3").addClass(`alert-${type}`).text(text).removeClass("d-none");
    }
    function setAttempts() { $attempts.text(String(tries)); }

    $form.on("submit", function (e) {
      e.preventDefault();
      const val = Number($input.val());
      if (!val || val < 1 || val > 100) {
        setFeedback("danger", "Enter a number between 1 and 100");
        return;
      }
      tries += 1; setAttempts();
      if (val === secret) {
        setFeedback("success", `Correct! You guessed in ${tries} attempts`);
        $input.prop("disabled", true);
      } else {
        setFeedback("info", val < secret ? "Too low" : "Too high");
        $input.trigger("focus").select();
      }
    });

    $reset.on("click", function () {
      secret = Math.floor(Math.random() * 100) + 1;
      tries = 0; setAttempts();
      $fb.addClass("d-none");
      $input.val("").prop("disabled", false).trigger("focus");
    });
  })();

  
  (function initTodo(){
    const $form = $("#todoForm");
    if (!$form.length) return;
    const $input = $("#todoInput");
    const $list = $("#todoList");
    const $error = $("#todoError");
    const $cat = $("#todoCategory");
    const KEY = "onside_news_todos";

    const load = () => {
      try { const data = JSON.parse(localStorage.getItem(KEY) || "[]"); return Array.isArray(data) ? data : []; }
      catch { return []; }
    };
    const save = arr => localStorage.setItem(KEY, JSON.stringify(arr));

    let todos = load();
    render(todos);

    function render(items){
      $list.empty();
      items.forEach(t => {
        const $li = $(`
          <li class="list-group-item d-flex align-items-center justify-content-between">
            <div class="d-flex align-items-center gap-2">
              <input type="checkbox" class="form-check-input me-2" data-id="${t.id}" ${t.done ? "checked":""}>
              <label class="form-check-label">${t.text}</label>
              <span class="badge bg-secondary ms-2">${t.category || "Other"}</span>
            </div>
            <button class="btn btn-sm btn-outline-danger" data-action="delete" data-id="${t.id}">Delete</button>
          </li>
        `);
        if (t.done) $li.addClass("list-group-item-success").find("label").css("text-decoration","line-through");
        $list.append($li);
      });
    }

    function setError(msg){ if (msg){ $error.text(msg).removeClass("d-none"); } else { $error.addClass("d-none").text(""); } }

    $form.on("submit", function(e){
      e.preventDefault();
      const text = ($input.val() || "").trim();
      if (!text) { setError("Task cannot be empty"); return; }
      setError("");
      const cat = $cat.val() || "Other";
      const item = { id: Date.now(), text, done: false, category: cat };
      todos.unshift(item);
      save(todos);
      render(todos);
      $input.val(""); if ($cat[0]) $cat.prop("selectedIndex", 0);
    });

    $list.on("click", function(e){
      const $t = $(e.target);
      const id = Number($t.data("id"));
      if ($t.data("action")==="delete" && id){
        todos = todos.filter(x => x.id !== id);
        save(todos); render(todos); return;
      }
      if ($t.is('input[type="checkbox"]') && id){
        todos = todos.map(x => x.id===id ? {...x, done: !x.done} : x);
        save(todos); render(todos); return;
      }
    });
  })();

  // Storage helpers for favorites and history
  const Storage = {
    getJSON(key, fallback){
      try { return JSON.parse(localStorage.getItem(key) || 'null') ?? fallback; } catch { return fallback; }
    },
    setJSON(key, value){ localStorage.setItem(key, JSON.stringify(value)); }
  };
  const FAV_MATCHES_KEY = 'onside_fav_matches';
  const FAV_TEAMS_KEY = 'onside_fav_teams';
  const MATCH_HISTORY_KEY = 'onside_match_history';
  const Favorites = {
    isMatchFav(id){ const s = Storage.getJSON(FAV_MATCHES_KEY, []); return s.includes(id); },
    toggleMatch(id){ const s = Storage.getJSON(FAV_MATCHES_KEY, []); const i = s.indexOf(id); if (i>=0) s.splice(i,1); else s.push(id); Storage.setJSON(FAV_MATCHES_KEY, s); return s.includes(id); },
    isTeamFav(id){ const s = Storage.getJSON(FAV_TEAMS_KEY, []); return s.includes(id); },
    toggleTeam(id){ const s = Storage.getJSON(FAV_TEAMS_KEY, []); const i = s.indexOf(id); if (i>=0) s.splice(i,1); else s.push(id); Storage.setJSON(FAV_TEAMS_KEY, s); return s.includes(id); }
  };
  const History = {
    addMatchView(item){
      const list = Storage.getJSON(MATCH_HISTORY_KEY, []);
      list.unshift({ ...item, viewedAt: Date.now() });
      const unique = [];
      const seen = new Set();
      for (const it of list){ if (!seen.has(it.id)){ unique.push(it); seen.add(it.id); } if (unique.length>=50) break; }
      Storage.setJSON(MATCH_HISTORY_KEY, unique);
    }
  };
  // Centralized API config
  const CONFIG = { API_KEY: '' };

  // Football API Integration
  (function initFootballAPI(){
    if (typeof FootballAPI !== 'function') return;
    const API_KEY = CONFIG.API_KEY;
    
    // Only initialize on news page
    if (!window.location.pathname.includes('news.html')) return;
    
    const api = new FootballAPI(API_KEY);
    
    // Load today's matches
    loadLiveMatches();
    
    // Load recent results (last 3 days)
    loadRecentResults();
    
    // Load upcoming matches (next 3 days)
    loadUpcomingMatches();
    
    // Load league standings
    loadStandings();
    // Render favorites and history sections
    renderFavMatches();
    renderMatchHistory();
    
    async function loadLiveMatches() {
      try {
        const today = FootballAPI.getToday();
        const matches = await api.getMatches({
          dateFrom: today,
          dateTo: today
        });
        
        displayMatches(matches.matches, '#liveMatches', 'live');
      } catch (error) {
        console.error('Error loading live matches:', error);
        showError('#liveMatches', 'Unable to load live matches');
      }
    }
    
    async function loadRecentResults() {
      try {
        const threeDaysAgo = FootballAPI.getDateAgo(3);
        const yesterday = FootballAPI.getDateAgo(1);
        const matches = await api.getMatches({
          dateFrom: threeDaysAgo,
          dateTo: yesterday,
          status: 'FINISHED'
        });
        
        displayMatches((matches.matches || []).slice(0, 12), '#recentResults', 'result');
      } catch (error) {
        console.error('Error loading recent results:', error);
        showError('#recentResults', 'Unable to load recent results');
      }
    }
    
    async function loadUpcomingMatches() {
      try {
        const tomorrow = FootballAPI.getDateFromNow(1);
        const threeDaysFromNow = FootballAPI.getDateFromNow(3);
        const matches = await api.getMatches({
          dateFrom: tomorrow,
          dateTo: threeDaysFromNow,
          status: 'SCHEDULED'
        });
        
        displayMatches((matches.matches || []).slice(0, 12), '#upcomingMatches', 'upcoming');
      } catch (error) {
        console.error('Error loading upcoming matches:', error);
        showError('#upcomingMatches', 'Unable to load upcoming matches');
      }
    }
    
    function displayMatches(matches, containerId, type) {
      const $container = $(containerId);
      
      if (!matches || matches.length === 0) {
        $container.html('<div class="col-12 text-center"><p class="text-muted">No matches found</p></div>');
        return;
      }
      
      $container.empty();
      
      matches.forEach(match => {
        const matchCard = createMatchCard(match, type);
        $container.append(matchCard);
      });
    }
    
    function createMatchCard(match, type) {
      const homeTeam = match.homeTeam;
      const awayTeam = match.awayTeam;
      const competition = match.competition;
      const score = match.score;
      const status = match.status;
      const utcDate = new Date(match.utcDate);
      
      let statusBadge = '';
      let scoreDisplay = '';
      
      if (type === 'live') {
        if (status === 'LIVE' || status === 'IN_PLAY') {
          statusBadge = '<span class="badge bg-danger">LIVE</span>';
          scoreDisplay = `<span class="fw-bold fs-5">${score.fullTime.home || 0} - ${score.fullTime.away || 0}</span>`;
        } else if (status === 'FINISHED') {
          statusBadge = '<span class="badge bg-success">FINISHED</span>';
          scoreDisplay = `<span class="fw-bold">${score.fullTime.home || 0} - ${score.fullTime.away || 0}</span>`;
        } else {
          statusBadge = '<span class="badge bg-secondary">SCHEDULED</span>';
          scoreDisplay = `<span class="text-muted">vs</span>`;
        }
      } else if (type === 'result') {
        statusBadge = '<span class="badge bg-success">FT</span>';
        scoreDisplay = `<span class="fw-bold">${score.fullTime.home || 0} - ${score.fullTime.away || 0}</span>`;
      } else {
        statusBadge = '<span class="badge bg-info">UPCOMING</span>';
        scoreDisplay = `<span class="text-muted">vs</span>`;
      }
      
      return `
        <div class="col-md-6 col-lg-4">
          <div class="card match-card h-100">
            <div class="card-header d-flex justify-content-between align-items-center">
              <small class="text-muted">${competition.name || 'Competition'}</small>
              ${statusBadge}
            </div>
            <div class="card-body">
              <div class="d-flex align-items-center justify-content-between">
                <div class="text-center flex-grow-1">
                  <div class="fw-bold">${homeTeam.name || 'Home Team'}</div>
                </div>
                <div class="text-center px-3">
                  ${scoreDisplay}
                </div>
                <div class="text-center flex-grow-1">
                  <div class="fw-bold">${awayTeam.name || 'Away Team'}</div>
                </div>
              </div>
              <div class="text-center mt-3">
                <small class="text-muted">
                  ${utcDate.toLocaleDateString()} ${utcDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </small>
              </div>
              <div class="d-flex justify-content-center gap-2 mt-3">
                <button class="btn btn-sm btn-outline-primary btn-match-details" data-match-id="${match.id}">Details</button>
                <button class="btn btn-sm btn-outline-warning btn-fav-match ${Favorites.isMatchFav(match.id) ? 'active' : ''}" data-match-id="${match.id}">${Favorites.isMatchFav(match.id) ? '★ Fav' : '☆ Fav'}</button>
              </div>
            </div>
          </div>
        </div>
      `;
    }
    
    function showError(containerId, message) {
      $(containerId).html(`<div class="col-12 text-center"><p class="text-danger">${message}</p></div>`);
    }
    
    // Delegated handlers for details and favorites on news page
    $(document).on('click', '.btn-fav-match', function(){
      const id = Number($(this).data('match-id'));
      if (!id) return;
      const on = Favorites.toggleMatch(id);
      $(this).toggleClass('active', on).text(on ? '★ Fav' : '☆ Fav');
      renderFavMatches();
    });
    
    $(document).on('click', '.btn-match-details', async function(){
      const id = Number($(this).data('match-id'));
      if (!id) return;
      await openMatchModal(id);
    });
    
    async function openMatchModal(matchId){
      const modalEl = document.getElementById('matchModal');
      if (!modalEl) return;
      const modal = new bootstrap.Modal(modalEl);
      $('#matchModalTitle').text('Match details');
      $('#matchModalBody').html('<div class="text-center py-4"><div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div></div>');
      modal.show();
      try{
        const data = await api.getMatch(matchId);
        const m = data.match || data;
        const dt = new Date(m.utcDate);
        const html = `
          <div class="d-flex justify-content-between align-items-center mb-3">
            <div class="text-center flex-grow-1"><strong>${m.homeTeam?.name || 'Home'}</strong></div>
            <div class="px-3">${m.score?.fullTime?.home ?? 0} - ${m.score?.fullTime?.away ?? 0}</div>
            <div class="text-center flex-grow-1"><strong>${m.awayTeam?.name || 'Away'}</strong></div>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item"><strong>Competition:</strong> ${m.competition?.name || '—'}</li>
            <li class="list-group-item"><strong>Status:</strong> ${m.status}</li>
            <li class="list-group-item"><strong>Date:</strong> ${dt.toLocaleDateString()} ${dt.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</li>
            <li class="list-group-item"><strong>Venue:</strong> ${m.venue || '—'}</li>
          </ul>`;
        $('#matchModalTitle').text(`${m.competition?.name || ''}`);
        $('#matchModalBody').html(html);
        History.addMatchView({ id: m.id, homeTeam: m.homeTeam?.name, awayTeam: m.awayTeam?.name, competition: m.competition?.name, utcDate: m.utcDate });
        renderMatchHistory();
      }catch(e){
        $('#matchModalBody').html('<p class="text-danger">Failed to load match details.</p>');
      }
    }
    
    async function renderFavMatches(){
      const ids = Storage.getJSON(FAV_MATCHES_KEY, []);
      const $wrap = $('#favMatches');
      if (!$wrap.length) return;
      if (!ids.length){ $wrap.html('<div class="col-12 text-center text-muted">No favorite matches yet</div>'); return; }
      try{
        const idStr = ids.slice(0, 10).join(',');
        const data = await api.getMatches({ ids: idStr });
        const items = data.matches || [];
        if (!items.length){ $wrap.html('<div class="col-12 text-center text-muted">No favorite matches yet</div>'); return; }
        const html = items.map(m => {
          const score = m.score?.fullTime || {}; const dt = new Date(m.utcDate);
          return `
            <div class="col-md-6 col-lg-4">
              <div class="card h-100">
                <div class="card-body text-center">
                  <div class="fw-bold mb-1">${m.homeTeam?.name || 'Home'} vs ${m.awayTeam?.name || 'Away'}</div>
                  <div class="mb-1">${score.home ?? 0} - ${score.away ?? 0}</div>
                  <small class="text-muted">${dt.toLocaleDateString()} ${dt.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</small>
                </div>
              </div>
            </div>`;
        }).join('');
        $wrap.html(html);
      }catch{ $wrap.html('<div class="col-12 text-center text-danger">Failed to load favorites</div>'); }
    }
    
    function renderMatchHistory(){
      const list = Storage.getJSON(MATCH_HISTORY_KEY, []);
      const $wrap = $('#matchHistory');
      if (!$wrap.length) return;
      if (!list.length){ $wrap.html('<div class="list-group-item text-center text-muted">No history yet</div>'); return; }
      const html = list.slice(0, 10).map(m => {
        const dt = new Date(m.utcDate || m.viewedAt);
        return `<div class="list-group-item d-flex justify-content-between"><span>${m.homeTeam || 'Home'} vs ${m.awayTeam || 'Away'}</span><small class="text-muted">${dt.toLocaleDateString()} ${dt.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</small></div>`;
      }).join('');
      $wrap.html(html);
    }
    
    async function loadStandings() {
      try {
        // Load Premier League standings
        const plStandings = await api.getStandings(FootballAPI.COMPETITIONS.PREMIER_LEAGUE);
        displayStandings(plStandings.standings[0]?.table || [], '#plStandings');
        
        // Load Champions League standings
        const clStandings = await api.getStandings(FootballAPI.COMPETITIONS.CHAMPIONS_LEAGUE);
        displayStandings(clStandings.standings[0]?.table || [], '#clStandings');
      } catch (error) {
        console.error('Error loading standings:', error);
        $('#plStandings').html('<p class="text-danger small">Unable to load standings</p>');
        $('#clStandings').html('<p class="text-danger small">Unable to load standings</p>');
      }
    }
    
    function displayStandings(teams, containerId) {
      const $container = $(containerId);
      
      if (!teams || teams.length === 0) {
        $container.html('<p class="text-muted small">No standings data available</p>');
        return;
      }
      
      let html = '<div class="table-responsive"><table class="table table-sm table-hover"><thead><tr><th>Pos</th><th>Team</th><th>P</th><th>W</th><th>D</th><th>L</th><th>Pts</th></tr></thead><tbody>';
      
      teams.slice(0, 10).forEach(team => {
        const positionClass = getPositionClass(team.position);
        html += `
          <tr class="${positionClass}">
            <td class="fw-bold">${team.position}</td>
            <td>
              <div class="d-flex align-items-center">
                <span class="me-2">${team.team.name}</span>
              </div>
            </td>
            <td>${team.playedGames}</td>
            <td>${team.won}</td>
            <td>${team.draw}</td>
            <td>${team.lost}</td>
            <td class="fw-bold">${team.points}</td>
          </tr>
        `;
      });
      
      html += '</tbody></table></div>';
      $container.html(html);
    }
    
    function getPositionClass(position) {
      if (position <= 4) return 'table-success'; // Champions League spots
      if (position === 5) return 'table-primary'; // Europa League
      if (position >= 18) return 'table-danger'; // Relegation zone
      return '';
    }
    
  })();

  // Teams Page API Integration
  (function initTeamsAPI(){
    const API_KEY = CONFIG.API_KEY;
    
    if (!window.location.pathname.includes('teams.html')) return;
    if (typeof FootballAPI !== 'function') { showDemoTeams(); return; }
    
    const api = new FootballAPI(API_KEY);
    let currentCompetition = 'all';
    
    loadTeams();
    setupFilterButtons();
    loadCompetitions();
    renderFavTeams();
    
    function setupFilterButtons() {
      $('.btn-group .btn').on('click', function() {
        $('.btn-group .btn').removeClass('active');
        $(this).addClass('active');
        currentCompetition = $(this).data('competition');
        loadTeams();
      });
    }
    
    async function loadTeams() {
      try {
        $('#teamsContainer').html(`
          <div class="text-center">
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Loading teams...</span>
            </div>
            <p class="mt-2">Loading teams...</p>
          </div>
        `);
        
        let teams = [];
        
        if (currentCompetition === 'all') {
          // Default: Premier competitions sample to avoid massive calls
          const defaults = ['PL','PD','BL1','SA','CL'];
          const results = await Promise.all(
            defaults.map(code => api.getCompetitionTeams(code).catch(() => ({ teams: [] })))
          );
          teams = results.flatMap(r => r.teams || []).filter((t,i,a)=>i===a.findIndex(x=>x.id===t.id)).slice(0, 36);
        } else {
          const result = await api.getCompetitionTeams(currentCompetition);
          teams = result.teams || [];
        }
        
        displayTeams(teams);
      } catch (error) {
        console.error('Error loading teams:', error);
        $('#teamsContainer').html(`
          <div class="col-12 text-center">
            <p class="text-danger">Unable to load teams. Please try again later.</p>
          </div>
        `);
      }
    }
    
    function displayTeams(teams) {
      const $container = $('#teamsContainer');
      
      if (!teams || teams.length === 0) {
        $container.html('<div class="col-12 text-center"><p class="text-muted">No teams found</p></div>');
        return;
      }
      
      let html = '<div class="row g-4">';
      
      teams.forEach(team => {
        html += createTeamCard(team);
      });
      
      html += '</div>';
      $container.html(html);
    }
    
    function createTeamCard(team) {
      const competitionName = getCompetitionName(team.competitions?.[0]?.code) || 'Unknown';
      const competitionColor = getCompetitionColor(team.competitions?.[0]?.code);
      
      return `
        <div class="col-md-6 col-lg-4">
          <article class="team-card">
            <div class="card-body text-center">
              <img src="${team.crest || 'images/default-team.png'}" alt="${team.name}" class="team-logo mb-3" 
                   onerror="this.src='images/default-team.png'">
              <h4>${team.name}</h4>
              <p>${team.area?.name || 'Unknown'}</p>
              <div class="mt-3">
                <span class="badge me-1" style="background-color: ${competitionColor}">${competitionName}</span>
                <span class="badge bg-primary">Founded ${team.founded || 'N/A'}</span>
              </div>
              <div class="mt-3">
                <button class="btn btn-sm btn-outline-primary" onclick="viewTeamDetails(${team.id})">
                  View Details
                </button>
                <button class="btn btn-sm btn-outline-warning btn-fav-team ${Favorites.isTeamFav(team.id) ? 'active' : ''}" data-team-id="${team.id}">${Favorites.isTeamFav(team.id) ? '★ Fav' : '☆ Fav'}</button>
              </div>
            </div>
          </article>
        </div>
      `;
    }
    
    function getCompetitionName(code) {
      const names = {
        'PL': 'Premier League',
        'PD': 'La Liga',
        'BL1': 'Bundesliga',
        'SA': 'Serie A',
        'FL1': 'Ligue 1',
        'CL': 'Champions League'
      };
      return names[code] || code;
    }
    
    function getCompetitionColor(code) {
      const colors = {
        'PL': '#6CABDD',
        'PD': '#FABE00',
        'BL1': '#D20614',
        'SA': '#006A4E',
        'FL1': '#CE2927',
        'CL': '#00529F'
      };
      return colors[code] || '#6c757d';
    }
    
    // Delegated handler for favorite team toggle
    $(document).on('click', '.btn-fav-team', function(){
      const id = Number($(this).data('team-id'));
      if (!id) return;
      const on = Favorites.toggleTeam(id);
      $(this).toggleClass('active', on).text(on ? '★ Fav' : '☆ Fav');
      renderFavTeams();
    });
    
    async function renderFavTeams(){
      const ids = Storage.getJSON(FAV_TEAMS_KEY, []);
      const $wrap = $('#favTeams');
      if (!$wrap.length) return;
      if (!ids.length){ $wrap.html('<div class="col-12 text-center text-muted">No favorite teams yet</div>'); return; }
      try{
        const apiCalls = ids.slice(0, 12).map(id => api.getTeam(id).catch(()=>null));
        const results = (await Promise.all(apiCalls)).filter(Boolean);
        if (!results.length){ $wrap.html('<div class="col-12 text-center text-muted">No favorite teams yet</div>'); return; }
        const html = results.map(t => `
          <div class="col-sm-6 col-lg-4">
            <div class="card h-100">
              <div class="card-body text-center">
                <img src="${t.crest || 'images/default-team.png'}" alt="${t.name}" class="team-logo mb-2" onerror="this.src='images/default-team.png'">
                <div class="fw-bold">${t.name}</div>
                <small class="text-muted">${t.area?.name || ''}</small>
              </div>
            </div>
          </div>`).join('');
        $wrap.html(html);
      }catch{ $wrap.html('<div class="col-12 text-center text-danger">Failed to load favorite teams</div>'); }
    }
    
    function showDemoTeams() {
      const demoTeams = [
        { id: 57, name: 'Arsenal', area: { name: 'England' }, founded: 1886, crest: 'images/arsenal.png', competitions: [{ code: 'PL' }] },
        { id: 58, name: 'Chelsea', area: { name: 'England' }, founded: 1905, crest: 'images/chelsea.png', competitions: [{ code: 'PL' }] },
        { id: 61, name: 'Liverpool', area: { name: 'England' }, founded: 1892, crest: 'images/liverpool.png', competitions: [{ code: 'PL' }] },
        { id: 65, name: 'Manchester City', area: { name: 'England' }, founded: 1880, crest: 'images/man-city.png', competitions: [{ code: 'PL' }] },
        { id: 66, name: 'Manchester United', area: { name: 'England' }, founded: 1878, crest: 'images/man-utd.png', competitions: [{ code: 'PL' }] },
        { id: 541, name: 'Real Madrid', area: { name: 'Spain' }, founded: 1902, crest: 'images/real-madrid.ico', competitions: [{ code: 'PD' }] },
        { id: 529, name: 'Barcelona', area: { name: 'Spain' }, founded: 1899, crest: 'images/barcelona.png', competitions: [{ code: 'PD' }] },
        { id: 81, name: 'Bayern Munich', area: { name: 'Germany' }, founded: 1900, crest: 'images/bayern.png', competitions: [{ code: 'BL1' }] },
        { id: 540, name: 'Borussia Dortmund', area: { name: 'Germany' }, founded: 1909, crest: 'images/dortmund.png', competitions: [{ code: 'BL1' }] }
      ];
      
      displayTeams(demoTeams);
      
    }
    // Make function global for onclick handlers
    window.viewTeamDetails = function(teamId) {
      alert(`Team details for ID: ${teamId}. This would open a detailed view of the team.`);
    };
  })();
  (function initSchedule(){
    if (!document.getElementById('scheduleBody')) return;
    
    function showDemoSchedule(){
      const rows = [
        {home:'Liverpool', away:'Arsenal', date:'Jan 14, 2025', time:'17:30', comp:'Premier League', venue:'Anfield'},
        {home:'Real Madrid', away:'Barcelona', date:'Jan 15, 2025', time:'21:00', comp:'La Liga', venue:'Santiago Bernabéu'},
        {home:'Bayern Munich', away:'Dortmund', date:'Jan 13, 2025', time:'18:30', comp:'Bundesliga', venue:'Allianz Arena'},
        {home:'Man City', away:'Chelsea', date:'Jan 14, 2025', time:'15:00', comp:'Premier League', venue:'Etihad Stadium'},
        {home:'Inter Milan', away:'AC Milan', date:'Jan 15, 2025', time:'20:45', comp:'Serie A', venue:'San Siro'},
        {home:'PSG', away:'Monaco', date:'Jan 13, 2025', time:'21:00', comp:'Ligue 1', venue:'Parc des Princes'},
        {home:'Atletico Madrid', away:'Sevilla', date:'Jan 14, 2025', time:'16:15', comp:'La Liga', venue:'Wanda Metropolitano'},
        {home:'Tottenham', away:'Man United', date:'Jan 15, 2025', time:'14:00', comp:'Premier League', venue:'Tottenham Hotspur Stadium'}
      ].map(m => `<tr>
        <td><div class="d-flex align-items-center justify-content-between"><span>${m.home}</span><span class="mx-2">vs</span><span>${m.away}</span></div></td>
        <td>${m.date}</td><td>${m.time}</td>
        <td><span class="comp-badge" style="background-color:#6c757d">${m.comp}</span></td>
        <td class="col-venue">${m.venue}</td>
      </tr>`).join('');
      if (window.jQuery) {
        $('#scheduleBody').html(rows);
      } else {
        const el = document.getElementById('scheduleBody');
        if (el) el.innerHTML = rows;
      }
    }
    
    if (typeof FootballAPI !== 'function') { showDemoSchedule(); return; }
    const API_KEY = CONFIG.API_KEY;
    let competition = 'all';
    let range = '7';
    function setupFilters(){
      $('#schCompFilter .btn').on('click', function(){
        $('#schCompFilter .btn').removeClass('active');
        $(this).addClass('active');
        competition = $(this).data('competition') || 'all';
        load();
      });
      $('#schRange').on('change', function(){
        range = $(this).val() || '7';
        load();
      });
    }
    function setLoading(){
      $('#scheduleBody').html('<tr><td colspan="5" class="text-center"><div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div><p class="mt-2">Loading fixtures...</p></td></tr>');
    }
    function getCompColorByName(name){
      const n = (name || '').toLowerCase();
      if (n.includes('premier')) return '#6CABDD'; // PL
      if (n.includes('la liga')) return '#FABE00'; // La Liga
      if (n.includes('bundes')) return '#D20614'; // Bundesliga
      if (n.includes('serie a')) return '#006A4E'; // Serie A
      if (n.includes('ligue 1')) return '#CE2927'; // Ligue 1
      if (n.includes('champions')) return '#00529F'; // UCL
      return '#6c757d';
    }
    function formatRow(match){
      const home = match.homeTeam?.name || 'Home';
      const away = match.awayTeam?.name || 'Away';
      const compName = match.competition?.name || '—';
      const compColor = getCompColorByName(compName);
      const dt = new Date(match.utcDate);
      const dateStr = dt.toLocaleDateString();
      const timeStr = dt.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
      const venue = match.venue || '—';
      return `<tr>
        <td><div class="d-flex align-items-center justify-content-between"><span>${home}</span><span class="mx-2">vs</span><span>${away}</span></div></td>
        <td>${dateStr}</td>
        <td>${timeStr}</td>
        <td><span class="comp-badge" style="background-color:${compColor}">${compName}</span></td>
        <td class="col-venue">${venue}</td>
      </tr>`;
    }
    function display(matches){
      if (!matches || !matches.length){
        $('#scheduleBody').html('<tr><td colspan="5" class="text-center text-muted">No fixtures found</td></tr>');
        return;
      }
      const rows = matches.slice(0, 20).map(formatRow).join('');
      $('#scheduleBody').html(rows);
    }
    async function load(){
      setLoading();
      try{
        const api = new FootballAPI(API_KEY);
        const today = FootballAPI.getToday();
        let days = range === 'today' ? 0 : parseInt(range, 10) || 7;
        const dateTo = days === 0 ? today : FootballAPI.getDateFromNow(days);
        const params = { dateFrom: today, dateTo };
        if (competition !== 'all') params.competitions = competition;
        const data = await api.getMatches(params);
        display(data.matches || []);
      }catch(e){
        $('#scheduleBody').html('<tr><td colspan="5" class="text-center text-danger">Unable to load fixtures</td></tr>');
      }
    }
    
    // Competitions dropdown
    (async function loadSchCompetitions(){
      try{
        const api = new FootballAPI(API_KEY);
        const data = await api.getCompetitions();
        const list = data.competitions || [];
        const $btnGroup = $('#schCompFilter');
        const $sel = $('<select id="schCompSelect" class="form-select form-select-sm ms-2" style="width:auto;display:inline-block;"></select>');
        $sel.append('<option value="all">All</option>');
        list.filter(c=> (c.area?.name||'').toLowerCase().includes('kazakhstan')).forEach(c=>{
          $sel.append(`<option value="${c.code || c.id}">Kazakhstan • ${c.name}</option>`);
        });
        const preferred = ['PL','PD','BL1','SA','FL1','CL'];
        list.filter(c=>preferred.includes(c.code)).forEach(c=>{ $sel.append(`<option value="${c.code}">${c.name}</option>`); });
        $btnGroup.after($sel);
        $sel.on('change', function(){ competition = $(this).val() || 'all'; load(); });
      }catch(e){/* silent */}
    })();
    setupFilters();
    load();
  })();
});
