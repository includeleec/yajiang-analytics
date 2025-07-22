// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true
    });

    // Initialize Charts
    initializeCharts();
    
    // Setup Navigation
    setupNavigation();
    
    // Setup Company Tabs
    setupCompanyTabs();
});

// Navigation Functions
function setupNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            const navHeight = document.querySelector('.navbar').offsetHeight;
            
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - navHeight - 20,
                    behavior: 'smooth'
                });
            }
            
            // Close mobile menu if open
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
}

// Company Tabs Functions
function setupCompanyTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const companyContents = document.querySelectorAll('.companies-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            companyContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Show corresponding content
            const targetId = button.getAttribute('onclick').match(/'([^']+)'/)[1];
            document.getElementById(targetId).classList.add('active');
        });
    });
}

function showCompanies(tier) {
    const tabButtons = document.querySelectorAll('.tab-button');
    const companyContents = document.querySelectorAll('.companies-content');
    
    // Remove active class from all
    tabButtons.forEach(btn => btn.classList.remove('active'));
    companyContents.forEach(content => content.classList.remove('active'));
    
    // Add active class to selected
    event.target.classList.add('active');
    document.getElementById(tier).classList.add('active');
}

// Chart Initialization
function initializeCharts() {
    createComparisonChart();
    createImpactChart();
}

function createComparisonChart() {
    const ctx = document.getElementById('comparisonChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['雅江水电站', '三峡工程', '白鹤滩水电站', '乌东德水电站'],
            datasets: [
                {
                    label: '投资规模 (万亿元)',
                    data: [1.2, 0.21, 0.18, 0.12],
                    backgroundColor: [
                        'rgba(52, 152, 219, 0.8)',
                        'rgba(46, 204, 113, 0.8)',
                        'rgba(155, 89, 182, 0.8)',
                        'rgba(230, 126, 34, 0.8)'
                    ],
                    borderColor: [
                        'rgb(52, 152, 219)',
                        'rgb(46, 204, 113)',
                        'rgb(155, 89, 182)',
                        'rgb(230, 126, 34)'
                    ],
                    borderWidth: 2
                },
                {
                    label: '装机容量 (万千瓦)',
                    data: [6000, 2250, 1600, 1020],
                    backgroundColor: [
                        'rgba(231, 76, 60, 0.8)',
                        'rgba(241, 196, 15, 0.8)',
                        'rgba(52, 73, 94, 0.8)',
                        'rgba(26, 188, 156, 0.8)'
                    ],
                    borderColor: [
                        'rgb(231, 76, 60)',
                        'rgb(241, 196, 15)',
                        'rgb(52, 73, 94)',
                        'rgb(26, 188, 156)'
                    ],
                    borderWidth: 2,
                    yAxisID: 'y1'
                }
            ]
        },
        options: {
            responsive: true,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        font: {
                            size: 12
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleFont: {
                        size: 14
                    },
                    bodyFont: {
                        size: 12
                    }
                }
            },
            scales: {
                x: {
                    display: true,
                    grid: {
                        display: false
                    },
                    ticks: {
                        font: {
                            size: 11
                        }
                    }
                },
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    title: {
                        display: true,
                        text: '投资规模 (万亿元)',
                        font: {
                            size: 12
                        }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: {
                        display: true,
                        text: '装机容量 (万千瓦)',
                        font: {
                            size: 12
                        }
                    },
                    grid: {
                        drawOnChartArea: false,
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeOutQuart'
            }
        }
    });
}

function createImpactChart() {
    const ctx = document.getElementById('impactChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: [
                '工程建设',
                '设备制造',
                '原材料供应',
                '输变电设备',
                '技术服务',
                '金融服务'
            ],
            datasets: [{
                label: '影响力指数',
                data: [95, 85, 78, 82, 70, 65],
                backgroundColor: 'rgba(52, 152, 219, 0.2)',
                borderColor: 'rgb(52, 152, 219)',
                borderWidth: 3,
                pointBackgroundColor: 'rgb(52, 152, 219)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(52, 152, 219)',
                pointRadius: 6,
                pointHoverRadius: 8
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        font: {
                            size: 14
                        }
                    }
                }
            },
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    },
                    pointLabels: {
                        font: {
                            size: 12
                        }
                    },
                    ticks: {
                        display: false
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeOutBounce'
            }
        }
    });
}

// Equipment Demand Chart
function createEquipmentChart() {
    const ctx = document.getElementById('equipmentChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['工程机械', '隧洞设备', '起重设备', '混凝土机械', '其他设备'],
            datasets: [{
                data: [600, 400, 300, 250, 250],
                backgroundColor: [
                    '#3498db',
                    '#e74c3c',
                    '#f39c12',
                    '#2ecc71',
                    '#9b59b6'
                ],
                borderColor: '#fff',
                borderWidth: 3
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        font: {
                            size: 12
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + context.parsed + '亿元';
                        }
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeOutBounce'
            }
        }
    });
}

// Utility Functions
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function showTooltip(element, text) {
    // Create tooltip
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = text;
    tooltip.style.cssText = `
        position: absolute;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 8px 12px;
        border-radius: 4px;
        font-size: 12px;
        z-index: 1000;
        pointer-events: none;
    `;
    
    document.body.appendChild(tooltip);
    
    // Position tooltip
    const rect = element.getBoundingClientRect();
    tooltip.style.left = rect.left + 'px';
    tooltip.style.top = (rect.top - tooltip.offsetHeight - 10) + 'px';
    
    // Remove tooltip after 3 seconds
    setTimeout(() => {
        document.body.removeChild(tooltip);
    }, 3000);
}

// Add hover effects to cards
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.company-card, .overview-card, .chain-item');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Scroll-triggered animations
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function handleScrollAnimations() {
    const elements = document.querySelectorAll('.stat-number');
    
    elements.forEach(element => {
        if (isElementInViewport(element) && !element.classList.contains('animated')) {
            element.classList.add('animated');
            animateNumber(element);
        }
    });
}

function animateNumber(element) {
    const target = parseInt(element.textContent);
    let current = 0;
    const increment = target / 50;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + (element.textContent.includes('万') ? '万亿' : 
                              element.textContent.includes('千瓦') ? '万千瓦' : 
                              element.textContent.includes('年') ? '年' : '');
    }, 50);
}

window.addEventListener('scroll', handleScrollAnimations);

// Loading screen (optional)
function showLoading() {
    const loading = document.createElement('div');
    loading.id = 'loading';
    loading.innerHTML = `
        <div class="loading-spinner">
            <div class="spinner"></div>
            <p>加载中...</p>
        </div>
    `;
    loading.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
    `;
    
    document.body.appendChild(loading);
    
    // Hide loading after 2 seconds
    setTimeout(() => {
        loading.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(loading);
        }, 500);
    }, 2000);
}

// Add CSS for spinner
const style = document.createElement('style');
style.textContent = `
    .loading-spinner {
        text-align: center;
    }
    
    .spinner {
        width: 50px;
        height: 50px;
        border: 4px solid #f3f3f3;
        border-top: 4px solid #3498db;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto 20px;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    .tooltip {
        animation: fadeIn 0.3s ease;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
`;
document.head.appendChild(style);

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
});

// Performance monitoring
window.addEventListener('load', function() {
    const loadTime = performance.now();
    console.log(`Page loaded in ${Math.round(loadTime)} milliseconds`);
});

// Export functions for potential external use
window.YajiangAnalysis = {
    showCompanies,
    formatNumber,
    showTooltip,
    createEquipmentChart
};