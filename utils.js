{\rtf1\ansi\ansicpg1252\cocoartf2761
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 function formatTimeAgo(date) \{\
    const now = new Date();\
    const diffInSeconds = Math.floor((now - date) / 1000);\
    \
    if (diffInSeconds < 60) \{\
        return 'Just now';\
    \}\
    \
    const diffInMinutes = Math.floor(diffInSeconds / 60);\
    if (diffInMinutes < 60) \{\
        return `$\{diffInMinutes\} minute$\{diffInMinutes === 1 ? '' : 's'\} ago`;\
    \}\
    \
    const diffInHours = Math.floor(diffInMinutes / 60);\
    if (diffInHours < 24) \{\
        return `$\{diffInHours\} hour$\{diffInHours === 1 ? '' : 's'\} ago`;\
    \}\
    \
    const diffInDays = Math.floor(diffInHours / 24);\
    return `$\{diffInDays\} day$\{diffInDays === 1 ? '' : 's'\} ago`;\
\}\
\
// Format currency with Indian locale\
function formatINR(amount) \{\
    return new Intl.NumberFormat('en-IN', \{\
        style: 'currency',\
        currency: 'INR',\
        minimumFractionDigits: 0,\
        maximumFractionDigits: 0\
    \}).format(amount);\
\}\
\
// Debounce function for performance optimization\
function debounce(func, wait) \{\
    let timeout;\
    return function(...args) \{\
        clearTimeout(timeout);\
        timeout = setTimeout(() => func.apply(this, args), wait);\
    \};\
\}\
\
export \{ formatTimeAgo, formatINR, debounce \};}