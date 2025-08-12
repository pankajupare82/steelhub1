{\rtf1\ansi\ansicpg1252\cocoartf2761
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 class IronOreApp \{\
    constructor() \{\
        this.api = new MarketDataAPI();\
        this.chartManager = new ChartManager();\
        this.init();\
    \}\
\
    async init() \{\
        // Initialize the app\
        this.renderAppShell();\
        \
        // Load initial data\
        await this.loadData();\
        \
        // Set up auto-refresh\
        this.setupAutoRefresh();\
    \}\
\
    renderAppShell() \{\
        const app = document.getElementById('app');\
        app.innerHTML = `\
            <header class="header">\
                <div class="header-container">\
                    <div class="logo">\
                        <i class="fas fa-chart-line logo-icon"></i>\
                        <span>IronOre Pro</span>\
                    </div>\
                    <div class="last-update">\
                        Last update: <span id="update-time">Loading...</span>\
                    </div>\
                </div>\
            </header>\
\
            <main class="main-content">\
                <div class="dashboard-grid" id="dashboard">\
                    <!-- Dashboard content will be rendered here -->\
                </div>\
\
                <div class="market-feed">\
                    <div class="feed-header">\
                        <div>Market Events</div>\
                        <div><i class="fas fa-sync-alt"></i> Auto-updating</div>\
                    </div>\
                    <div class="feed-container" id="market-feed">\
                        <!-- Feed items will be rendered here -->\
                    </div>\
                </div>\
            </main>\
\
            <footer class="footer">\
                <div class="footer-container">\
                    <p>&copy; $\{new Date().getFullYear()\} IronOre Pro Market Intelligence</p>\
                </div>\
            </footer>\
        `;\
    \}\
\
    async loadData() \{\
        try \{\
            // Fetch all data in parallel\
            const [spotData, regionalData, forecastData, newsData] = await Promise.all([\
                this.api.getSpotPrices(),\
                this.api.getRegionalPrices(),\
                this.api.getForecast(),\
                this.api.getMarketNews()\
            ]);\
\
            this.renderDashboard(spotData, regionalData, forecastData);\
            this.renderMarketFeed(newsData);\
            this.updateTimestamp();\
\
        \} catch (error) \{\
            console.error('Failed to load data:', error);\
            this.showError('Failed to load market data. Please try again later.');\
        \}\
    \}\
\
    renderDashboard(spotData, regionalData, forecastData) \{\
        const dashboard = document.getElementById('dashboard');\
        \
        dashboard.innerHTML = `\
            <div class="card">\
                <div class="card-header">Current Spot Price</div>\
                <div class="card-body">\
                    <div class="price-display">\uc0\u8377 $\{spotData.currentPrice.toLocaleString()\}/MT</div>\
                    <div class="price-change $\{spotData.change >= 0 ? 'trend-up' : 'trend-down'\}">\
                        $\{spotData.change >= 0 ? '+' : ''\}$\{spotData.change.toFixed(2)\}% \
                        <i class="fas fa-arrow-$\{spotData.change >= 0 ? 'up' : 'down'\}"></i>\
                    </div>\
                    <div class="chart-container">\
                        <canvas id="spotChart"></canvas>\
                    </div>\
                    <div class="api-status api-active">\
                        <span class="status-indicator status-active"></span>\
                        Connected to Platts API\
                    </div>\
                </div>\
            </div>\
\
            <div class="card">\
                <div class="card-header">Regional Prices</div>\
                <div class="card-body">\
                    <div class="chart-container">\
                        <canvas id="regionalChart"></canvas>\
                    </div>\
                    <div class="api-status api-active">\
                        <span class="status-indicator status-active"></span>\
                        Synced with SteelMint India\
                    </div>\
                </div>\
            </div>\
\
            <div class="card">\
                <div class="card-header">Market Forecast</div>\
                <div class="card-body">\
                    <div class="price-display">\uc0\u8377 $\{forecastData.average.toLocaleString()\} \'b1 \u8377 $\{forecastData.range.toLocaleString()\}</div>\
                    <div class="chart-container">\
                        <canvas id="forecastChart"></canvas>\
                    </div>\
                    <div class="api-status api-active">\
                        <span class="status-indicator status-active"></span>\
                        Updated with NMDC projections\
                    </div>\
                </div>\
            </div>\
        `;\
\
        // Initialize charts\
        this.chartManager.initSpotChart('spotChart', spotData.history);\
        this.chartManager.initRegionalChart('regionalChart', regionalData);\
        this.chartManager.initForecastChart('forecastChart', forecastData);\
    \}\
\
    renderMarketFeed(newsItems) \{\
        const feedContainer = document.getElementById('market-feed');\
        feedContainer.innerHTML = '';\
\
        newsItems.forEach(item => \{\
            const feedItem = document.createElement('div');\
            feedItem.className = 'feed-item';\
            \
            let iconClass = 'news';\
            if (item.type === 'price') iconClass = 'price';\
            if (item.type === 'alert') iconClass = 'alert';\
            \
            feedItem.innerHTML = `\
                <div class="feed-icon $\{iconClass\}">\
                    <i class="fas fa-$\{item.type === 'price' ? 'rupee-sign' : item.type === 'alert' ? 'exclamation-triangle' : 'newspaper'\}"></i>\
                </div>\
                <div class="feed-content">\
                    <div class="feed-title">$\{item.title\}</div>\
                    <div class="feed-desc">$\{item.content\}</div>\
                    <div class="feed-time">$\{formatTimeAgo(item.timestamp)\}</div>\
                </div>\
            `;\
            \
            feedContainer.appendChild(feedItem);\
        \});\
    \}\
\
    updateTimestamp() \{\
        const now = new Date();\
        const timeStr = now.toLocaleTimeString([], \{hour: '2-digit', minute:'2-digit'\});\
        document.getElementById('update-time').textContent = timeStr;\
    \}\
\
    setupAutoRefresh() \{\
        // Refresh data every 5 minutes\
        setInterval(async () => \{\
            await this.loadData();\
        \}, 5 * 60 * 1000);\
        \
        // Update timestamp every minute\
        setInterval(() => \{\
            this.updateTimestamp();\
        \}, 60 * 1000);\
    \}\
\
    showError(message) \{\
        const dashboard = document.getElementById('dashboard');\
        dashboard.innerHTML = `\
            <div class="card" style="grid-column: 1 / -1">\
                <div class="card-header">Error</div>\
                <div class="card-body">\
                    <p>$\{message\}</p>\
                    <button id="retry-btn" class="btn btn-primary">Retry</button>\
                </div>\
            </div>\
        `;\
        \
        document.getElementById('retry-btn').addEventListener('click', () => \{\
            this.loadData();\
        \});\
    \}\
\}\
\
// Initialize the app when DOM is loaded\
document.addEventListener('DOMContentLoaded', () => \{\
    new IronOreApp();\
\});}