/* ==========================================
   MOCK DATABASE & INITIALIZATION (LocalStorage)
   ========================================== */
       
const DEFAULT_CATEGORIES = [
    'Cerâmica e Barro',
    'Têxtil / Bordado',
    'Madeira',
    'Pedra / Minério',
    'Couro',
    'Fibras Naturais',
    'Doces e Quitutes'
];

const DEFAULT_ARTISANS = [
    { id: 'art-1', name: 'Mestre Seu Zé do Barro', category: 'Cerâmica e Barro', bio: 'Mais de 40 anos moldando panelas, moringas e esculturas sacras com o barro legítimo do Seridó.', avatar: 'https://placehold.co/150x150/d97706/ffffff?text=Ze', rating: 4.9, location: 'Bairro Penedo, Currais Novos' },
    { id: 'art-2', name: 'Dona Francisca Rendeira', category: 'Têxtil / Bordado', bio: 'Especialista em bordado ponto cruz e renda renascença, ensinando a arte para novas gerações.', avatar: 'https://placehold.co/150x150/059669/ffffff?text=Francisca', rating: 5.0, location: 'Centro, Currais Novos' },
    { id: 'art-3', name: 'Antônio Escultor', category: 'Madeira', bio: 'Transforma raízes de umburana e sabiá em impressionantes peças de fauna nordestina e santos.', avatar: 'https://placehold.co/150x150/92400e/ffffff?text=Antonio', location: 'Zona Rural, Currais Novos' }
];

const DEFAULT_PRODUCTS = [
    {
        id: 'prod-1',
        title: 'Moringa de Barro Tradicional Seridó',
        category: 'Cerâmica e Barro',
        price: 65.00,
        stock: 12,
        artisanId: 'art-1',
        artisanName: 'Mestre Seu Zé do Barro',
        image: 'https://placehold.co/600x400/d97706/ffffff?text=Moringa+Barro',
        description: 'Moringa artesanal queimada em forno a lenha tradicional. Mantém a água fresca por horas naturalmente graças à porosidade do barro de Currais Novos.',
        featured: true
    },
    {
        id: 'prod-2',
        title: 'Toalha de Mesa em Renda Renascença',
        category: 'Têxtil / Bordado',
        price: 280.00,
        stock: 4,
        artisanId: 'art-2',
        artisanName: 'Dona Francisca Rendeira',
        image: 'https://placehold.co/600x400/059669/ffffff?text=Renda+Renascenca',
        description: 'Peça de alta costura artesanal feita à mão com bilros. Símbolo de elegância e tradição têxtil do Seridó potiguar.',
        featured: true
    },
    {
        id: 'prod-3',
        title: 'Escultura de Tatu em Madeira Sabiá',
        category: 'Madeira',
        price: 120.00,
        stock: 7,
        artisanId: 'art-3',
        artisanName: 'Antônio Escultor',
        image: 'https://placehold.co/600x400/78350f/ffffff?text=Escultura+Madeira',
        description: 'Escultura detalhada de tatu esculpida em madeira nobre de reflorestamento do semiárido nordestino com acabamento em cera de carnaúba.',
        featured: true
    },
    {
        id: 'prod-4',
        title: 'Prato Decorativo de Cerâmica Pintada à Mão',
        category: 'Cerâmica e Barro',
        price: 90.00,
        stock: 15,
        artisanId: 'art-1',
        artisanName: 'Mestre Seu Zé do Barro',
        image: 'https://placehold.co/600x400/b45309/ffffff?text=Prato+Decorativo',
        description: 'Prato em cerâmica esmaltada com motivos da fauna e flora do sertão nordestino. Acompanha suporte de parede.',
        featured: false
    },
    {
        id: 'prod-5',
        title: 'Bolsa de Palha de Carnaúba Trançada',
        category: 'Fibras Naturais',
        price: 110.00,
        stock: 9,
        artisanId: 'art-2',
        artisanName: 'Dona Francisca Rendeira',
        image: 'https://placehold.co/600x400/047857/ffffff?text=Bolsa+Palha',
        description: 'Bolsa ecologicamente sustentável trançada em fibra de carnaúba com alças de couro legítimo. Perfeita para o dia a dia.',
        featured: true
    },
    {
        id: 'prod-6',
        title: 'Doce de Leite Artesanal do Seridó (Pote 500g)',
        category: 'Doces e Quitutes',
        price: 35.00,
        stock: 25,
        artisanId: 'art-3',
        artisanName: 'Antônio Escultor',
        image: 'https://placehold.co/600x400/451a03/ffffff?text=Doce+de+Leite',
        description: 'Doce de leite tradicional em tacho de cobre, cremoso, produzido na zona rural de Currais Novos com leite puro da região.',
        featured: false
    }
];

const DEFAULT_USERS = [
    { id: 'usr-admin', name: 'Administrador Geral', email: 'admin@maisartesao.rn', role: 'admin', password: '123' },
    { id: 'usr-art-1', name: 'Mestre Seu Zé do Barro', email: 'ze@artesao.rn', role: 'artisan', artisanId: 'art-1', password: '123' },
    { id: 'usr-cli', name: 'Maria Cliente', email: 'cliente@gmail.com', role: 'client', password: '123' }
];

// Init localStorage if empty
if (!localStorage.getItem('maisartesao_products')) {
    localStorage.setItem('maisartesao_products', JSON.stringify(DEFAULT_PRODUCTS));
}
if (!localStorage.getItem('maisartesao_artisans')) {
    localStorage.setItem('maisartesao_artisans', JSON.stringify(DEFAULT_ARTISANS));
}
if (!localStorage.getItem('maisartesao_users')) {
    localStorage.setItem('maisartesao_users', JSON.stringify(DEFAULT_USERS));
}
if (!localStorage.getItem('maisartesao_orders')) {
    localStorage.setItem('maisartesao_orders', JSON.stringify([
        { id: 'ORD-9821', clientName: 'Maria Cliente', total: 145.00, status: 'Confirmado', date: '2026-06-10', items: [{ title: 'Moringa de Barro', qty: 1, price: 65.00 }, { title: 'Doce de Leite', qty: 2, price: 35.00 }] }
    ]));
}
if (!localStorage.getItem('maisartesao_cart')) {
    localStorage.setItem('maisartesao_cart', JSON.stringify([]));
}
if (!localStorage.getItem('maisartesao_current_user')) {
    localStorage.setItem('maisartesao_current_user', JSON.stringify(null));
}

/* ==========================================
   ROUTER & NAVIGATION CONTROLLER
   ========================================== */
function getCurrentUser() {
    return JSON.parse(localStorage.getItem('maisartesao_current_user'));
}

function router(viewName, param = null) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const container = document.getElementById('app-container');
    container.innerHTML = '';
   
    updateAuthNav();

    switch(viewName) {
        case 'home':
            renderHomeView(container);
            break;
        case 'vitrine':
            renderVitrineView(container, param);
            break;
        case 'artesãos':
            renderArtisansView(container);
            break;
        case 'sobre':
            renderAboutView(container);
            break;
        case 'login':
            renderLoginView(container);
            break;
        case 'cadastro':
            renderRegisterView(container);
            break;
        case 'painel-artesao':
            renderArtisanDashboard(container);
            break;
        case 'painel-admin':
            renderAdminDashboard(container);
            break;
        case 'detalhe-produto':
            renderProductDetail(container, param);
            break;
        default:
            renderHomeView(container);
    }
}

function updateAuthNav() {
    const nav = document.getElementById('auth-nav-container');
    const user = getCurrentUser();

    if (!user) {
        nav.innerHTML = `
            <div class="flex items-center space-x-2">
                <button onclick="router('login')" class="text-sm font-semibold text-slate-700 hover:text-brand-600 px-3 py-2 rounded-xl transition">Entrar</button>
                <button onclick="router('cadastro')" class="text-sm font-semibold text-white bg-brand-600 hover:bg-brand-700 px-4 py-2 rounded-xl shadow-md shadow-brand-600/20 transition">Cadastre-se</button>
            </div>
        `;
    } else {
        let panelRoute = 'home';
        let panelLabel = 'Painel';
        let icon = 'fa-user';
        if (user.role === 'admin') {
            panelRoute = 'painel-admin';
            panelLabel = 'Admin';
            icon = 'fa-shield-halved';
        } else if (user.role === 'artisan') {
            panelRoute = 'painel-artesao';
            panelLabel = 'Meus Produtos';
            icon = 'fa-palette';
        }

        nav.innerHTML = `
            <div class="flex items-center space-x-3">
                <button onclick="router('${panelRoute}')" class="flex items-center space-x-2 bg-slate-100 hover:bg-slate-200 text-slate-800 px-3 py-2 rounded-xl text-sm font-medium transition">
                    <i class="fa-solid ${icon} text-brand-600"></i>
                    <span class="hidden sm:inline">${user.name.split(' ')[0]}</span>
                </button>
                <button onclick="logout()" title="Sair" class="p-2 text-slate-400 hover:text-rose-600 transition"><i class="fa-solid fa-right-from-bracket"></i></button>
            </div>
        `;
    }
}

function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
}

/* ==========================================
   VIEW 1: LANDING PAGE (HOME)
   ========================================== */
function renderHomeView(container) {
    const products = JSON.parse(localStorage.getItem('maisartesao_products'));
    const featured = products.filter(p => p.featured).slice(0, 4);
    const artisans = JSON.parse(localStorage.getItem('maisartesao_artisans'));

    container.innerHTML = `
        <section class="relative bg-gradient-to-b from-brand-900 via-brand-800 to-slate-900 text-white py-24 overflow-hidden">
            <div class="absolute inset-0 opacity-10 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:16px_16px]"></div>
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div class="space-y-6 text-center lg:text-left">
                        <div class="inline-flex items-center space-x-2 bg-brand-700/60 border border-brand-500/40 px-3.5 py-1.5 rounded-full text-xs font-medium text-brand-100">
                            <i class="fa-solid fa-star text-amber-400"></i>
                            <span>Feira de Artesanato Oficial de Currais Novos - RN</span>
                        </div>
                        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                            A Arte e a Alma do <span class="text-amber-400">Seridó Potiguar</span>
                        </h1>
                        <p class="text-slate-300 text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed">
                            Conecte-se diretamente com os mestres artesãos currais-novenses. Peças exclusivas em cerâmica, renda renascença, madeira e minérios com entrega garantida.
                        </p>
                        <div class="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                            <button onclick="router('vitrine')" class="w-full sm:w-auto bg-brand-500 hover:bg-brand-600 text-white font-semibold px-8 py-4 rounded-2xl shadow-xl shadow-brand-500/30 transition flex items-center justify-center space-x-3">
                                <span>Explorar Vitrine</span>
                                <i class="fa-solid fa-arrow-right"></i>
                            </button>
                            <button onclick="router('artesãos')" class="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-2xl border border-white/20 transition flex items-center justify-center space-x-3">
                                <i class="fa-solid fa-people-group"></i>
                                <span>Conhecer Mestres</span>
                            </button>
                        </div>
                    </div>
                    <div class="relative flex justify-center">
                        <div class="w-full max-w-md bg-gradient-to-tr from-brand-500/20 to-amber-500/20 p-4 rounded-3xl backdrop-blur-xl border border-white/10 shadow-2xl">
                            <img src="https://placehold.co/600x500/b45309/ffffff?text=Artesanato+Currais+Novos" alt="Artesanato" class="rounded-2xl w-full h-80 object-cover shadow-lg">
                            <div class="mt-4 flex items-center justify-between text-sm bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                                <div class="flex items-center space-x-3">
                                    <div class="w-10 h-10 rounded-full bg-brand-500 flex items-center justify-center text-white font-bold">CN</div>
                                    <div>
                                        <p class="font-bold text-white">Feira de Sábado</p>
                                        <p class="text-xs text-slate-400">Centro - Currais Novos/RN</p>
                                    </div>
                                </div>
                                <span class="bg-emerald-500/20 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full">Ativo</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- CATEGORIES QUICK BAR -->
        <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
            <div class="bg-white rounded-3xl shadow-xl p-6 border border-slate-100 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
                ${DEFAULT_CATEGORIES.map(cat => `
                    <button onclick="filterByCategory('${cat}')" class="flex flex-col items-center justify-center p-4 rounded-2xl hover:bg-brand-50 hover:text-brand-700 transition group text-center">
                        <div class="w-12 h-12 rounded-xl bg-slate-100 group-hover:bg-brand-500 group-hover:text-white text-slate-700 flex items-center justify-center mb-2 transition shadow-sm">
                            <i class="fa-solid ${getCategoryIcon(cat)}"></i>
                        </div>
                        <span class="text-xs font-semibold text-slate-700 group-hover:text-brand-700">${cat}</span>
                    </button>
                `).join('')}
            </div>
        </section>

        <!-- FEATURED PRODUCTS -->
        <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div class="flex flex-col md:flex-row md:items-end justify-between mb-12">
                <div>
                    <span class="text-brand-600 font-bold uppercase tracking-wider text-xs">Destaques da Semana</span>
                    <h2 class="text-3xl font-extrabold text-slate-900 mt-1">Peças em Destaque na Feira</h2>
                </div>
                <button onclick="router('vitrine')" class="mt-4 md:mt-0 text-brand-600 hover:text-brand-700 font-semibold text-sm flex items-center space-x-2">
                    <span>Ver todas as peças</span>
                    <i class="fa-solid fa-arrow-right"></i>
                </button>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                ${featured.map(product => renderProductCard(product)).join('')}
            </div>
        </section>

        <!-- ABOUT REGION BANNER -->
        <section class="bg-slate-900 text-white py-20 relative overflow-hidden">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                    <span class="text-brand-400 font-semibold uppercase tracking-widest text-xs">Patrimônio do Seridó</span>
                    <h2 class="text-3xl sm:text-4xl font-extrabold mt-2 mb-6">Currais Novos: Terra de Geoparques e Artesãos Brilhantes</h2>
                    <p class="text-slate-300 leading-relaxed mb-6">
                        Reconhecida por seu rico patrimônio geológico (Geoparque Seridó) e cultural, Currais Novos abriga artesãos cujas mãos moldam histórias. A plataforma <strong class="text-white">MaisArtesao</strong> apoia a economia criativa local levando o melhor do nosso artesanato para todo o Brasil.
                    </p>
                    <button onclick="router('sobre')" class="bg-brand-600 hover:bg-brand-700 text-white font-semibold px-6 py-3.5 rounded-xl transition shadow-lg shadow-brand-600/30">
                        Conheça Nossa História
                    </button>
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <div class="bg-slate-800 p-6 rounded-2xl border border-slate-700 text-center">
                        <i class="fa-solid fa-hands-holding-circle text-3xl text-brand-400 mb-3"></i>
                        <h3 class="text-2xl font-bold text-white">${artisans.length}+</h3>
                        <p class="text-xs text-slate-400 mt-1">Artesãos Cadastrados</p>
                    </div>
                    <div class="bg-slate-800 p-6 rounded-2xl border border-slate-700 text-center">
                        <i class="fa-solid fa-store text-3xl text-brand-400 mb-3"></i>
                        <h3 class="text-2xl font-bold text-white">${products.length}+</h3>
                        <p class="text-xs text-slate-400 mt-1">Peças Exclusivas</p>
                    </div>
                </div>
            </div>
        </section>
    `;
}

function getCategoryIcon(cat) {
    if (cat.includes('Cerâmica')) return 'fa-bowl-rice';
    if (cat.includes('Têxtil')) return 'fa-shirt';
    if (cat.includes('Madeira')) return 'fa-tree';
    if (cat.includes('Pedra')) return 'fa-gem';
    if (cat.includes('Couro')) return 'fa-mitten';
    if (cat.includes('Fibras')) return 'fa-basket-shopping';
    return 'fa-cookie-bite';
}

function renderProductCard(product) {
    return `
        <div class="bg-white rounded-2xl shadow-sm hover:shadow-xl transition border border-slate-200 overflow-hidden flex flex-col justify-between group">
            <div>
                <div class="relative overflow-hidden aspect-video bg-slate-100 cursor-pointer" onclick="openProductDetail('${product.id}')">
                    <img src="${product.image}" alt="${product.title}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500" onerror="this.src='https://placehold.co/600x400/d97706/ffffff?text=Artesanato'">
                    <span class="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-slate-900 text-xs font-bold px-2.5 py-1 rounded-lg shadow-sm">${product.category}</span>
                </div>
                <div class="p-5">
                    <p class="text-xs font-semibold text-brand-600 mb-1"><i class="fa-solid fa-user-pen mr-1"></i> ${product.artisanName}</p>
                    <h3 onclick="openProductDetail('${product.id}')" class="font-bold text-slate-900 hover:text-brand-600 cursor-pointer line-clamp-1 text-base transition">${product.title}</h3>
                    <p class="text-xs text-slate-500 mt-1 line-clamp-2">${product.description}</p>
                </div>
            </div>
            <div class="p-5 pt-0 flex items-center justify-between border-t border-slate-100 mt-3">
                <div>
                    <span class="text-xs text-slate-400 block">Preço</span>
                    <span class="text-lg font-bold text-slate-900">R$ ${product.price.toFixed(2)}</span>
                </div>
                <button onclick="addToCart('${product.id}')" class="bg-brand-600 hover:bg-brand-700 text-white p-3 rounded-xl shadow-md shadow-brand-600/20 transition flex items-center justify-center">
                    <i class="fa-solid fa-cart-plus"></i>
                </button>
            </div>
        </div>
    `;
}

/* ==========================================
   VIEW 2: VITRINE DE PEÇAS (CATALOG)
   ========================================== */
function renderVitrineView(container, initialCategory = null) {
    const products = JSON.parse(localStorage.getItem('maisartesao_products'));

    container.innerHTML = `
        <div class="bg-slate-900 text-white py-16">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h1 class="text-3xl sm:text-4xl font-extrabold mb-3">Vitrine de Peças Artesanais</h1>
                <p class="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">
                    Explore todo o catálogo produzido pelos artesãos de Currais Novos. Filtre por categoria ou pesquise sua peça favorita.
                </p>
            </div>
        </div>

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <!-- Filters & Search Bar -->
            <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
                <div class="relative w-full md:w-96">
                    <i class="fa-solid fa-magnifying-glass absolute left-4 top-3.5 text-slate-400"></i>
                    <input type="text" id="search-input" oninput="applyFilters()" placeholder="Buscar por peça ou artesão..." class="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-brand-500 transition">
                </div>
                <div class="flex items-center space-x-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                    <select id="category-filter" onchange="applyFilters()" class="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-700 focus:outline-none focus:border-brand-500 transition">
                        <option value="">Todas as Categorias</option>
                        ${DEFAULT_CATEGORIES.map(c => `<option value="${c}" ${initialCategory === c ? 'selected' : ''}>${c}</option>`).join('')}
                    </select>
                    <select id="sort-filter" onchange="applyFilters()" class="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-700 focus:outline-none focus:border-brand-500 transition">
                        <option value="recent">Mais Recentes</option>
                        <option value="asc">Menor Preço</option>
                        <option value="desc">Maior Preço</option>
                    </select>
                </div>
            </div>

            <!-- Products Grid -->
            <div id="catalog-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <!-- Populated via JS -->
            </div>
        </div>
    `;

    applyFilters();
}

function applyFilters() {
    const products = JSON.parse(localStorage.getItem('maisartesao_products'));
    const search = document.getElementById('search-input')?.value.toLowerCase() || '';
    const category = document.getElementById('category-filter')?.value || '';
    const sort = document.getElementById('sort-filter')?.value || 'recent';

    let filtered = products.filter(p => {
        const matchSearch = p.title.toLowerCase().includes(search) || p.artisanName.toLowerCase().includes(search) || p.description.toLowerCase().includes(search);
        const matchCat = category === '' || p.category === category;
        return matchSearch && matchCat;
    });

    if (sort === 'asc') filtered.sort((a,b) => a.price - b.price);
    if (sort === 'desc') filtered.sort((a,b) => b.price - a.price);

    const grid = document.getElementById('catalog-grid');
    if (!grid) return;

    if (filtered.length === 0) {
        grid.innerHTML = `
            <div class="col-span-full py-16 text-center bg-white rounded-2xl border border-slate-200">
                <i class="fa-solid fa-box-open text-4xl text-slate-300 mb-3"></i>
                <p class="text-slate-600 font-medium">Nenhuma peça encontrada com esses filtros.</p>
                <button onclick="resetFilters()" class="mt-4 text-sm text-brand-600 font-bold hover:underline">Limpar Filtros</button>
            </div>
        `;
        return;
    }

    grid.innerHTML = filtered.map(product => renderProductCard(product)).join('');
}

function filterByCategory(cat) {
    router('vitrine', cat);
}

function resetFilters() {
    document.getElementById('search-input').value = '';
    document.getElementById('category-filter').value = '';
    document.getElementById('sort-filter').value = 'recent';
    applyFilters();
}

/* ==========================================
   VIEW 3: ARTISANS DIRECTORY
   ========================================== */
function renderArtisansView(container) {
    const artisans = JSON.parse(localStorage.getItem('maisartesao_artisans'));
    const products = JSON.parse(localStorage.getItem('maisartesao_products'));

    container.innerHTML = `
        <div class="bg-slate-900 text-white py-16">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h1 class="text-3xl sm:text-4xl font-extrabold mb-3">Nossos Mestres Artesãos</h1>
                <p class="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">
                    Conheça as mãos talentosas que mantêm viva a tradição cultural de Currais Novos e do Seridó.
                </p>
            </div>
        </div>

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                ${artisans.map(artisan => {
                    const artisanProducts = products.filter(p => p.artisanId === artisan.id);
                    return `
                        <div class="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 flex flex-col justify-between">
                            <div>
                                <div class="flex items-center space-x-4 mb-4">
                                    <img src="${artisan.avatar}" alt="${artisan.name}" class="w-16 h-16 rounded-2xl object-cover shadow-md">
                                    <div>
                                        <h3 class="font-bold text-slate-900 text-lg">${artisan.name}</h3>
                                        <span class="text-xs bg-brand-50 text-brand-700 font-semibold px-2.5 py-1 rounded-full">${artisan.category}</span>
                                    </div>
                                </div>
                                <p class="text-slate-600 text-sm mb-4 leading-relaxed">${artisan.bio}</p>
                                <div class="flex items-center text-xs text-slate-500 space-x-4 mb-4">
                                    <span><i class="fa-solid fa-location-dot text-brand-600 mr-1"></i> ${artisan.location}</span>
                                    <span><i class="fa-solid fa-star text-amber-500 mr-1"></i> ${artisan.rating}</span>
                                </div>
                            </div>
                            <div class="border-t border-slate-100 pt-4 flex items-center justify-between">
                                <span class="text-xs font-medium text-slate-500">${artisanProducts.length} peças cadastradas</span>
                                <button onclick="filterByArtisanName('${artisan.name}')" class="text-sm font-bold text-brand-600 hover:text-brand-700 flex items-center space-x-1">
                                    <span>Ver Peças</span>
                                    <i class="fa-solid fa-arrow-right"></i>
                                </button>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
    `;
}

function filterByArtisanName(name) {
    router('vitrine');
    setTimeout(() => {
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.value = name;
            applyFilters();
        }
    }, 100);
}

/* ==========================================
   VIEW 4: ABOUT PAGE
   ========================================== */
function renderAboutView(container) {
    container.innerHTML = `
        <div class="bg-slate-900 text-white py-16">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h1 class="text-3xl sm:text-4xl font-extrabold mb-3">Sobre a Feira MaisArtesao</h1>
                <p class="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">
                    Tradição, economia criativa e valorização cultural no coração do Seridó potiguar.
                </p>
            </div>
        </div>

        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
            <div class="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 sm:p-12 space-y-6">
                <h2 class="text-2xl font-bold text-slate-900">A Feira Física em Currais Novos</h2>
                <p class="text-slate-600 leading-relaxed">
                    A feira de artesanato de Currais Novos é um ponto de encontro histórico para mestres artesãos da região do Seridó. Realizada semanalmente no centro da cidade, reúne o melhor da cerâmica utilitária e artística, bordados finos como a renda renascença, trabalhos em madeira, couro e minérios locais.
                </p>
                <p class="text-slate-600 leading-relaxed">
                    O portal <strong>MaisArtesao</strong> surge como uma iniciativa de expansão digital para garantir que esses artistas locais alcancem compradores em todo o Brasil, fortalecendo a economia sustentável e preservando a herança cultural do Rio Grande do Norte.
                </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm text-center">
                    <div class="w-12 h-12 bg-brand-50 text-brand-600 rounded-xl flex items-center justify-center mx-auto mb-4 text-xl"><i class="fa-solid fa-hands-holding"></i></div>
                    <h3 class="font-bold text-slate-900 mb-2">Compre Direto</h3>
                    <p class="text-xs text-slate-500">Todo o valor das vendas é revertido diretamente para os artesãos e suas famílias.</p>
                </div>
                <div class="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm text-center">
                    <div class="w-12 h-12 bg-brand-50 text-brand-600 rounded-xl flex items-center justify-center mx-auto mb-4 text-xl"><i class="fa-solid fa-truck-fast"></i></div>
                    <h3 class="font-bold text-slate-900 mb-2">Envio Seguro</h3>
                    <p class="text-xs text-slate-500">Embalagens especiais para peças frágeis em cerâmica e obras de arte.</p>
                </div>
                <div class="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm text-center">
                    <div class="w-12 h-12 bg-brand-50 text-brand-600 rounded-xl flex items-center justify-center mx-auto mb-4 text-xl"><i class="fa-solid fa-award"></i></div>
                    <h3 class="font-bold text-slate-900 mb-2">Selo de Origem</h3>
                    <p class="text-xs text-slate-500">Certificação oficial de autenticidade do artesanato currais-novense.</p>
                </div>
            </div>
        </div>
    `;
}

/* ==========================================
   AUTHENTICATION (LOGIN & REGISTER)
   ========================================== */
function renderLoginView(container) {
    container.innerHTML = `
        <div class="max-w-md mx-auto px-4 py-20">
            <div class="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 sm:p-10">
                <div class="text-center mb-8">
                    <div class="w-12 h-12 bg-brand-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md shadow-brand-600/30">
                        <i class="fa-solid fa-lock text-xl"></i>
                    </div>
                    <h1 class="text-2xl font-bold text-slate-900">Acesse sua Conta</h1>
                    <p class="text-xs text-slate-500 mt-1">Entre como cliente, artesão ou administrador</p>
                </div>

                <form onsubmit="handleLogin(event)" class="space-y-4">
                    <div>
                        <label class="block text-xs font-semibold text-slate-700 uppercase mb-1">E-mail</label>
                        <input type="email" id="login-email" required placeholder="seu.email@exemplo.com" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-500 transition">
                    </div>
                    <div>
                        <label class="block text-xs font-semibold text-slate-700 uppercase mb-1">Senha</label>
                        <input type="password" id="login-password" required placeholder="••••••••" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-500 transition">
                    </div>
                    <button type="submit" class="w-full bg-brand-600 hover:bg-brand-700 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-brand-600/30 transition">
                        Entrar na Plataforma
                    </button>
                </form>

                <div class="mt-6 p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1">
                    <p class="font-bold text-slate-700 mb-1">Contas de Teste Rápidas:</p>
                    <p><strong>Admin:</strong> admin@maisartesao.rn / 123</p>
                    <p><strong>Artesão:</strong> ze@artesao.rn / 123</p>
                    <p><strong>Cliente:</strong> cliente@gmail.com / 123</p>
                </div>

                <p class="text-center text-xs text-slate-500 mt-6">
                    Não tem uma conta? <button onclick="router('cadastro')" class="text-brand-600 font-bold hover:underline">Cadastre-se</button>
                </p>
            </div>
        </div>
    `;
}

function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const users = JSON.parse(localStorage.getItem('maisartesao_users'));
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        showToast('E-mail ou senha inválidos.', 'error');
        return;
    }

    localStorage.setItem('maisartesao_current_user', JSON.stringify(user));
    showToast(`Bem-vindo de volta, ${user.name}!`, 'success');

    if (user.role === 'admin') router('painel-admin');
    else if (user.role === 'artisan') router('painel-artesao');
    else router('home');
}

function renderRegisterView(container) {
    container.innerHTML = `
        <div class="max-w-md mx-auto px-4 py-16">
            <div class="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 sm:p-10">
                <div class="text-center mb-6">
                    <h1 class="text-2xl font-bold text-slate-900">Criar Nova Conta</h1>
                    <p class="text-xs text-slate-500 mt-1">Junte-se à comunidade MaisArtesao</p>
                </div>

                <form onsubmit="handleRegister(event)" class="space-y-4">
                    <div>
                        <label class="block text-xs font-semibold text-slate-700 uppercase mb-1">Nome Completo</label>
                        <input type="text" id="reg-name" required placeholder="Seu Nome" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-500 transition">
                    </div>
                    <div>
                        <label class="block text-xs font-semibold text-slate-700 uppercase mb-1">E-mail</label>
                        <input type="email" id="reg-email" required placeholder="seu.email@exemplo.com" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-500 transition">
                    </div>
                    <div>
                        <label class="block text-xs font-semibold text-slate-700 uppercase mb-1">Senha</label>
                        <input type="password" id="reg-password" required placeholder="••••••••" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-500 transition">
                    </div>
                    <div>
                        <label class="block text-xs font-semibold text-slate-700 uppercase mb-1">Tipo de Perfil</label>
                        <select id="reg-role" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-700 focus:outline-none focus:border-brand-500 transition">
                            <option value="client">Cliente / Comprador</option>
                            <option value="artisan">Artesão (Cadastrar minhas peças)</option>
                        </select>
                    </div>
                    <button type="submit" class="w-full bg-brand-600 hover:bg-brand-700 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-brand-600/30 transition">
                        Cadastrar Conta
                    </button>
                </form>

                <p class="text-center text-xs text-slate-500 mt-6">
                    Já possui conta? <button onclick="router('login')" class="text-brand-600 font-bold hover:underline">Entrar</button>
                </p>
            </div>
        </div>
    `;
}

function handleRegister(e) {
    e.preventDefault();
    const name = document.getElementById('reg-name').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;
    const role = document.getElementById('reg-role').value;

    const users = JSON.parse(localStorage.getItem('maisartesao_users'));
    if (users.some(u => u.email === email)) {
        showToast('Este e-mail já está cadastrado.', 'error');
        return;
    }

    let artisanId = null;
    if (role === 'artisan') {
        const artisans = JSON.parse(localStorage.getItem('maisartesao_artisans'));
        artisanId = 'art-' + Date.now();
        artisans.push({
            id: artisanId,
            name: name,
            category: 'Cerâmica e Barro',
            bio: 'Artesão cadastrado na plataforma MaisArtesao.',
            avatar: 'https://placehold.co/150x150/d97706/ffffff?text=' + name.charAt(0),
            rating: 5.0,
            location: 'Currais Novos, RN'
        });
        localStorage.setItem('maisartesao_artisans', JSON.stringify(artisans));
    }

    const newUser = { id: 'usr-' + Date.now(), name, email, password, role, artisanId };
    users.push(newUser);
    localStorage.setItem('maisartesao_users', JSON.stringify(users));
    localStorage.setItem('maisartesao_current_user', JSON.stringify(newUser));

    showToast('Conta criada com sucesso!', 'success');
    if (role === 'artisan') router('painel-artesao');
    else router('home');
}

function logout() {
    localStorage.setItem('maisartesao_current_user', JSON.stringify(null));
    showToast('Sessão encerrada.', 'success');
    router('home');
}

/* ==========================================
   SHOPPING CART & CHECKOUT
   ========================================== */
function toggleCartModal(open) {
    const modal = document.getElementById('cart-modal');
    if (open) {
        modal.classList.remove('hidden');
        renderCartItems();
    } else {
        modal.classList.add('hidden');
    }
}

function getCart() {
    return JSON.parse(localStorage.getItem('maisartesao_cart'));
}

function saveCart(cart) {
    localStorage.setItem('maisartesao_cart', JSON.stringify(cart));
    updateCartBadge();
}

function updateCartBadge() {
    const cart = getCart();
    const badge = document.getElementById('cart-badge');
    const totalQty = cart.reduce((acc, item) => acc + item.qty, 0);

    if (totalQty > 0) {
        badge.textContent = totalQty;
        badge.classList.remove('hidden');
    } else {
        badge.classList.add('hidden');
    }
}

function addToCart(productId) {
    const products = JSON.parse(localStorage.getItem('maisartesao_products'));
    const product = products.find(p => p.id === productId);
    if (!product) return;

    let cart = getCart();
    const existing = cart.find(item => item.id === productId);

    if (existing) {
        if (existing.qty < product.stock) {
            existing.qty++;
        } else {
            showToast('Quantidade máxima em estoque atingida.', 'error');
            return;
        }
    } else {
        cart.push({ id: product.id, title: product.title, price: product.price, image: product.image, qty: 1 });
    }

    saveCart(cart);
    showToast(`"${product.title}" adicionado ao carrinho!`, 'success');
    toggleCartModal(true);
}

function updateCartQty(productId, delta) {
    let cart = getCart();
    const item = cart.find(i => i.id === productId);
    if (!item) return;

    item.qty += delta;
    if (item.qty <= 0) {
        cart = cart.filter(i => i.id !== productId);
    }

    saveCart(cart);
    renderCartItems();
}

function renderCartItems() {
    const cart = getCart();
    const container = document.getElementById('cart-items-container');
    const subtotalEl = document.getElementById('cart-subtotal');
    const taxEl = document.getElementById('cart-tax');
    const totalEl = document.getElementById('cart-total');

    if (cart.length === 0) {
        container.innerHTML = `
            <div class="py-16 text-center">
                <i class="fa-solid fa-basket-shopping text-4xl text-slate-300 mb-3"></i>
                <p class="text-slate-500 text-sm font-medium">Seu carrinho está vazio.</p>
            </div>
        `;
        subtotalEl.textContent = 'R$ 0,00';
        taxEl.textContent = 'R$ 0,00';
        totalEl.textContent = 'R$ 0,00';
        return;
    }

    let subtotal = 0;
    container.innerHTML = cart.map(item => {
        subtotal += item.price * item.qty;
        return `
            <div class="py-4 flex items-center justify-between">
                <div class="flex items-center space-x-3">
                    <img src="${item.image}" alt="${item.title}" class="w-16 h-16 rounded-xl object-cover bg-slate-100">
                    <div>
                        <h4 class="font-bold text-slate-900 text-sm line-clamp-1">${item.title}</h4>
                        <p class="text-xs text-slate-500">R$ ${item.price.toFixed(2)} un</p>
                    </div>
                </div>
                <div class="flex items-center space-x-2">
                    <button onclick="updateCartQty('${item.id}', -1)" class="w-7 h-7 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center justify-center text-slate-700 font-bold">-</button>
                    <span class="text-sm font-bold w-6 text-center">${item.qty}</span>
                    <button onclick="updateCartQty('${item.id}', 1)" class="w-7 h-7 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center justify-center text-slate-700 font-bold">+</button>
                </div>
            </div>
        `;
    }).join('');

    const tax = subtotal * 0.05;
    const total = subtotal + tax;

    subtotalEl.textContent = `R$ ${subtotal.toFixed(2)}`;
    taxEl.textContent = `R$ ${tax.toFixed(2)}`;
    totalEl.textContent = `R$ ${total.toFixed(2)}`;
}

function checkoutCart() {
    const cart = getCart();
    if (cart.length === 0) {
        showToast('Seu carrinho está vazio.', 'error');
        return;
    }

    const user = getCurrentUser();
    const clientName = user ? user.name : 'Cliente Visitante';

    const subtotal = cart.reduce((acc, i) => acc + (i.price * i.qty), 0);
    const total = subtotal * 1.05;

    const orders = JSON.parse(localStorage.getItem('maisartesao_orders'));
    const newOrder = {
        id: 'ORD-' + Math.floor(1000 + Math.random() * 9000),
        clientName: clientName,
        total: total,
        status: 'Aguardando Envio',
        date: new Date().toISOString().split('T')[0],
        items: cart
    };

    orders.unshift(newOrder);
    localStorage.setItem('maisartesao_orders', JSON.stringify(orders));

    // Clear cart
    saveCart([]);
    toggleCartModal(false);

    showToast('Pedido realizado com sucesso! Os artesãos foram notificados.', 'success');
}

/* ==========================================
   PRODUCT DETAIL MODAL
   ========================================== */
function openProductDetail(productId) {
    const products = JSON.parse(localStorage.getItem('maisartesao_products'));
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const modal = document.getElementById('product-modal');
    const content = document.getElementById('product-modal-content');

    content.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-2">
            <div class="bg-slate-100 aspect-square">
                <img src="${product.image}" alt="${product.title}" class="w-full h-full object-cover" onerror="this.src='https://placehold.co/600x400/d97706/ffffff?text=Artesanato'">
            </div>
            <div class="p-8 flex flex-col justify-between">
                <div>
                    <span class="text-xs bg-brand-50 text-brand-700 font-semibold px-2.5 py-1 rounded-full">${product.category}</span>
                    <h2 class="text-2xl font-bold text-slate-900 mt-3 mb-1">${product.title}</h2>
                    <p class="text-xs font-semibold text-brand-600 mb-4"><i class="fa-solid fa-user-pen mr-1"></i> ${product.artisanName}</p>
                    <p class="text-sm text-slate-600 leading-relaxed mb-6">${product.description}</p>
                    <div class="flex items-center justify-between text-xs text-slate-500 mb-6 bg-slate-50 p-3 rounded-xl border border-slate-200">
                        <span>Estoque disponível: <strong class="text-slate-900">${product.stock} un</strong></span>
                        <span>Selo Currais Novos RN</span>
                    </div>
                </div>
                <div class="flex items-center justify-between border-t border-slate-100 pt-4">
                    <div>
                        <span class="text-xs text-slate-400 block">Preço</span>
                        <span class="text-2xl font-extrabold text-slate-900">R$ ${product.price.toFixed(2)}</span>
                    </div>
                    <button onclick="addToCart('${product.id}'); closeProductModal();" class="bg-brand-600 hover:bg-brand-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg shadow-brand-600/30 transition flex items-center space-x-2">
                        <i class="fa-solid fa-cart-plus"></i>
                        <span>Adicionar</span>
                    </button>
                </div>
            </div>
        </div>
    `;

    modal.classList.remove('hidden');
}

function closeProductModal() {
    document.getElementById('product-modal').classList.add('hidden');
}

/* ==========================================
   PAINEL DO ARTESÃO (ARTISAN DASHBOARD)
   ========================================== */
function renderArtisanDashboard(container) {
    const user = getCurrentUser();
    if (!user || user.role !== 'artisan') {
        router('login');
        return;
    }

    const products = JSON.parse(localStorage.getItem('maisartesao_products'));
    const artisanProducts = products.filter(p => p.artisanId === user.artisanId);
    const orders = JSON.parse(localStorage.getItem('maisartesao_orders'));

    container.innerHTML = `
        <div class="bg-slate-900 text-white py-12">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <span class="text-brand-400 font-semibold uppercase tracking-wider text-xs">Painel do Produtor</span>
                    <h1 class="text-3xl font-extrabold mt-1">Olá, ${user.name}</h1>
                </div>
                <button onclick="openAddProductModal()" class="bg-brand-600 hover:bg-brand-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg shadow-brand-600/30 transition flex items-center space-x-2">
                    <i class="fa-solid fa-plus"></i>
                    <span>Cadastrar Nova Peça</span>
                </button>
            </div>
        </div>

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
            <!-- Stats Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <p class="text-xs text-slate-500 font-medium">Peças no Estoque</p>
                    <p class="text-3xl font-bold text-slate-900 mt-2">${artisanProducts.length}</p>
                </div>
                <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <p class="text-xs text-slate-500 font-medium">Unidades Totais</p>
                    <p class="text-3xl font-bold text-slate-900 mt-2">${artisanProducts.reduce((acc, p) => acc + p.stock, 0)}</p>
                </div>
                <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <p class="text-xs text-slate-500 font-medium">Pedidos Recebidos</p>
                    <p class="text-3xl font-bold text-slate-900 mt-2">${orders.length}</p>
                </div>
            </div>

            <!-- Products Table -->
            <div class="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
                <div class="p-6 border-b border-slate-200">
                    <h3 class="font-bold text-slate-900 text-lg">Meu Estoque de Peças</h3>
                </div>
                <div class="overflow-x-auto">
                    <table class="w-full text-left border-collapse">
                        <thead>
                            <tr class="bg-slate-50 text-slate-400 text-xs uppercase tracking-wider border-b border-slate-200">
                                <th class="p-4">Peça</th>
                                <th class="p-4">Categoria</th>
                                <th class="p-4">Preço</th>
                                <th class="p-4">Estoque</th>
                                <th class="p-4 text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-100 text-sm">
                            ${artisanProducts.length === 0 ? `
                                <tr><td colspan="5" class="p-8 text-center text-slate-500">Você ainda não cadastrou nenhuma peça.</td></tr>
                            ` : artisanProducts.map(p => `
                                <tr>
                                    <td class="p-4 flex items-center space-x-3">
                                        <img src="${p.image}" class="w-12 h-12 rounded-xl object-cover bg-slate-100">
                                        <span class="font-bold text-slate-900">${p.title}</span>
                                    </td>
                                    <td class="p-4 text-slate-600">${p.category}</td>
                                    <td class="p-4 font-bold text-slate-900">R$ ${p.price.toFixed(2)}</td>
                                    <td class="p-4 text-slate-600">${p.stock} un</td>
                                    <td class="p-4 text-right space-x-2">
                                        <button onclick="deleteProduct('${p.id}')" class="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition" title="Excluir"><i class="fa-solid fa-trash"></i></button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- Add Product Modal Form -->
        <div id="add-product-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm hidden">
            <div class="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-8 relative fade-in">
                <button onclick="closeAddProductModal()" class="absolute top-4 right-4 text-slate-400 hover:text-slate-700"><i class="fa-solid fa-xmark text-xl"></i></button>
                <h3 class="text-xl font-bold text-slate-900 mb-6">Cadastrar Nova Peça</h3>
                <form onsubmit="handleCreateProduct(event, '${user.artisanId}', '${user.name}')" class="space-y-4">
                    <div>
                        <label class="block text-xs font-semibold text-slate-700 uppercase mb-1">Título da Peça</label>
                        <input type="text" id="new-prod-title" required placeholder="Ex: Vaso de Barro Decorado" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-500">
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-xs font-semibold text-slate-700 uppercase mb-1">Categoria</label>
                            <select id="new-prod-cat" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm">
                                ${DEFAULT_CATEGORIES.map(c => `<option value="${c}">${c}</option>`).join('')}
                            </select>
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-slate-700 uppercase mb-1">Preço (R$)</label>
                            <input type="number" step="0.01" id="new-prod-price" required placeholder="45.00" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm">
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-xs font-semibold text-slate-700 uppercase mb-1">Quantidade em Estoque</label>
                            <input type="number" id="new-prod-stock" required placeholder="10" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm">
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-slate-700 uppercase mb-1">URL da Imagem</label>
                            <input type="url" id="new-prod-img" placeholder="https://..." class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm">
                        </div>
                    </div>
                    <div>
                        <label class="block text-xs font-semibold text-slate-700 uppercase mb-1">Descrição</label>
                        <textarea id="new-prod-desc" rows="3" required placeholder="Detalhes sobre a peça, materiais e técnicas..." class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm"></textarea>
                    </div>
                    <button type="submit" class="w-full bg-brand-600 hover:bg-brand-700 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-brand-600/30 transition">
                        Salvar Peça no Catálogo
                    </button>
                </form>
            </div>
        </div>
    `;
}

function openAddProductModal() {
    document.getElementById('add-product-modal').classList.remove('hidden');
}

function closeAddProductModal() {
    document.getElementById('add-product-modal').classList.add('hidden');
}

function handleCreateProduct(e, artisanId, artisanName) {
    e.preventDefault();
    const title = document.getElementById('new-prod-title').value;
    const category = document.getElementById('new-prod-cat').value;
    const price = parseFloat(document.getElementById('new-prod-price').value);
    const stock = parseInt(document.getElementById('new-prod-stock').value);
    let image = document.getElementById('new-prod-img').value;
    const description = document.getElementById('new-prod-desc').value;

    if (!image) {
        image = `https://placehold.co/600x400/d97706/ffffff?text=${encodeURIComponent(title)}`;
    }

    const products = JSON.parse(localStorage.getItem('maisartesao_products'));
    const newProd = {
        id: 'prod-' + Date.now(),
        title, category, price, stock, artisanId, artisanName, image, description, featured: false
    };

    products.unshift(newProd);
    localStorage.setItem('maisartesao_products', JSON.stringify(products));

    closeAddProductModal();
    showToast('Peça cadastrada com sucesso!', 'success');
    renderArtisanDashboard(document.getElementById('app-container'));
}

function deleteProduct(productId) {
    if (!confirm('Deseja realmente excluir esta peça?')) return;
    let products = JSON.parse(localStorage.getItem('maisartesao_products'));
    products = products.filter(p => p.id !== productId);
    localStorage.setItem('maisartesao_products', JSON.stringify(products));
    showToast('Peça removida.', 'success');
    renderArtisanDashboard(document.getElementById('app-container'));
}

/* ==========================================
   PAINEL DO ADMINISTRADOR (ADMIN DASHBOARD)
   ========================================== */
function renderAdminDashboard(container) {
    const user = getCurrentUser();
    if (!user || user.role !== 'admin') {
        router('login');
        return;
    }

    const products = JSON.parse(localStorage.getItem('maisartesao_products'));
    const artisans = JSON.parse(localStorage.getItem('maisartesao_artisans'));
    const orders = JSON.parse(localStorage.getItem('maisartesao_orders'));

    container.innerHTML = `
        <div class="bg-slate-900 text-white py-12">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <span class="text-brand-400 font-semibold uppercase tracking-wider text-xs">Painel da Secretaria / Administração</span>
                <h1 class="text-3xl font-extrabold mt-1">Gestão Geral da Feira - Currais Novos</h1>
            </div>
        </div>

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
            <!-- Metrics Cards -->
            <div class="grid grid-cols-1 sm:grid-cols-4 gap-6">
                <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <p class="text-xs text-slate-500 font-medium">Total de Peças</p>
                    <p class="text-3xl font-bold text-slate-900 mt-2">${products.length}</p>
                </div>
                <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <p class="text-xs text-slate-500 font-medium">Mestres Artesãos</p>
                    <p class="text-3xl font-bold text-slate-900 mt-2">${artisans.length}</p>
                </div>
                <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <p class="text-xs text-slate-500 font-medium">Pedidos Registrados</p>
                    <p class="text-3xl font-bold text-slate-900 mt-2">${orders.length}</p>
                </div>
                <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <p class="text-xs text-slate-500 font-medium">Volume de Vendas</p>
                    <p class="text-3xl font-bold text-emerald-600 mt-2">R$ ${orders.reduce((acc, o) => acc + o.total, 0).toFixed(2)}</p>
                </div>
            </div>

            <!-- Orders Management -->
            <div class="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
                <div class="p-6 border-b border-slate-200">
                    <h3 class="font-bold text-slate-900 text-lg">Pedidos e Encomendas da Feira</h3>
                </div>
                <div class="overflow-x-auto">
                    <table class="w-full text-left border-collapse">
                        <thead>
                            <tr class="bg-slate-50 text-slate-400 text-xs uppercase tracking-wider border-b border-slate-200">
                                <th class="p-4">Pedido ID</th>
                                <th class="p-4">Cliente</th>
                                <th class="p-4">Data</th>
                                <th class="p-4">Total</th>
                                <th class="p-4">Status</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-100 text-sm">
                            ${orders.map(o => `
                                <tr>
                                    <td class="p-4 font-bold text-slate-900">${o.id}</td>
                                    <td class="p-4 text-slate-700">${o.clientName}</td>
                                    <td class="p-4 text-slate-500">${o.date}</td>
                                    <td class="p-4 font-bold text-slate-900">R$ ${o.total.toFixed(2)}</td>
                                    <td class="p-4"><span class="bg-amber-50 text-amber-700 font-semibold text-xs px-2.5 py-1 rounded-full">${o.status}</span></td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}

/* ==========================================
   TOAST NOTIFICATIONS UTILITY
   ========================================== */
function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    const bg = type === 'success' ? 'bg-slate-900 text-white' : 'bg-rose-600 text-white';

    toast.className = `${bg} px-5 py-3 rounded-2xl shadow-xl text-sm font-medium flex items-center space-x-3 fade-in pointer-events-auto`;
    toast.innerHTML = `
        <i class="fa-solid ${type === 'success' ? 'fa-circle-check text-emerald-400' : 'fa-triangle-exclamation'}"></i>
        <span>${message}</span>
    `;

    container.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}

/* ==========================================
   INITIAL APP BOOTSTRAP
   ========================================== */
window.onload = function() {
    updateCartBadge();
    router('home');
};
    
