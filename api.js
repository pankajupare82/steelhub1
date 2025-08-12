{\rtf1\ansi\ansicpg1252\cocoartf2761
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 class MarketDataAPI \{\
    constructor() \{\
        this.baseUrl = 'https://api.ironorepro.com/v1';\
        this.cache = \{\
            spotPrices: null,\
            regionalPrices: null,\
            forecast: null,\
            marketNews: null\
        \};\
    \}\
\
    async getSpotPrices() \{\
        if (this.cache.spotPrices) \{\
            return this.cache.spotPrices;\
        \}\
\
        // In a real app, this would be an actual API call\
        // const response = await fetch(`$\{this.baseUrl\}/spot-prices`);\
        // const data = await response.json();\
        \
        // Mock data for demonstration\
        const mockData = \{\
            currentPrice: 9320,\
            change: 1.2,\
            history: \{\
                labels: ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],\
                data: [9250, 9280, 9300, 9320, 9350, 9320, 9300]\
            \}\
        \};\
\
        this.cache.spotPrices = mockData;\
        return mockData;\
    \}\
\
    async getRegionalPrices() \{\
        if (this.cache.regionalPrices) \{\
            return this.cache.regionalPrices;\
        \}\
\
        // Mock data\
        const mockData = \{\
            regions: [\
                \{ name: 'Odisha', price: 9450 \},\
                \{ name: 'Chhattisgarh', price: 9200 \},\
                \{ name: 'Jharkhand', price: 9100 \},\
                \{ name: 'Karnataka', price: 8950 \}\
            ]\
        \};\
\
        this.cache.regionalPrices = mockData;\
        return mockData;\
    \}\
\
    async getForecast() \{\
        if (this.cache.forecast) \{\
            return this.cache.forecast;\
        \}\
\
        // Mock data\
        const mockData = \{\
            average: 9200,\
            range: 1300,\
            actual: [8900, 9000, 9250, null, null, null],\
            forecast: [null, null, null, 9300, 9400, 9350],\
            upperRange: [null, null, null, 9800, 10000, 10200],\
            lowerRange: [null, null, null, 8800, 8700, 8600],\
            labels: ['Jul 15', 'Jul 25', 'Aug 5', 'Aug 15', 'Aug 25', 'Sep 5']\
        \};\
\
        this.cache.forecast = mockData;\
        return mockData;\
    \}\
\
    async getMarketNews() \{\
        if (this.cache.marketNews) \{\
            return this.cache.marketNews;\
        \}\
\
        // Mock data\
        const mockData = [\
            \{\
                type: 'price',\
                title: 'Spot price increased to \uc0\u8377 9,320/MT',\
                content: '65% Fe lump ore price increased by 0.2% in last hour',\
                timestamp: new Date(Date.now() - 2 * 60 * 1000) // 2 minutes ago\
            \},\
            \{\
                type: 'news',\
                title: 'Monsoon disrupts mining in Odisha',\
                content: '12 mines temporarily closed due to heavy rainfall',\
                timestamp: new Date(Date.now() - 25 * 60 * 1000) // 25 minutes ago\
            \},\
            \{\
                type: 'alert',\
                title: 'Export duty maintained at 50%',\
                content: 'Government extends current export policy through 2025',\
                timestamp: new Date(Date.now() - 60 * 60 * 1000) // 1 hour ago\
            \},\
            \{\
                type: 'price',\
                title: 'NMDC auction premium at 14.5%',\
                content: 'Higher premium indicates strong domestic demand',\
                timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago\
            \},\
            \{\
                type: 'news',\
                title: 'Chinese steel output increases',\
                content: 'July production up 3.2% year-on-year',\
                timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000) // 3 hours ago\
            \}\
        ];\
\
        this.cache.marketNews = mockData;\
        return mockData;\
    \}\
\
    async getNewMarketEvents() \{\
        // In a real app, this would use WebSockets or polling for new events\
        // For demo purposes, we'll just return 1 random new event\
        const eventTypes = ['price', 'news', 'alert'];\
        const type = eventTypes[Math.floor(Math.random() * 3)];\
        \
        const newEvent = \{\
            type: type,\
            title: type === 'price' ? `Price adjustment to \uc0\u8377 $\{9300 + Math.floor(Math.random() * 100)\}/MT` : \
                   type === 'news' ? 'New market development reported' : \
                   'Important market alert',\
            content: 'New market update available',\
            timestamp: new Date()\
        \};\
\
        return [newEvent];\
    \}\
\}}