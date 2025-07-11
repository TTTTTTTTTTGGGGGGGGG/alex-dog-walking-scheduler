// Dog Walking Scheduler App - JavaScript
// Created for Alex's Dog Walking Business

// =============================================================================
// DATA MANAGEMENT
// =============================================================================

// Sample dog photos (using placeholder images)
const dogPhotos = [
    'https://images.unsplash.com/photo-1552053831-71594a27632d?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1544944194-2d5176469def?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?w=150&h=150&fit=crop&crop=face'
];

// Initialize data structure
let appData = {
    appointments: [],
    expenses: [],
    currentWeekOffset: 0
};

// Load data from localStorage
function loadData() {
    const saved = localStorage.getItem('dogWalkingApp');
    if (saved) {
        appData = JSON.parse(saved);
    } else {
        // Load sample data for demo
        loadSampleData();
    }
}

// Save data to localStorage
function saveData() {
    localStorage.setItem('dogWalkingApp', JSON.stringify(appData));
}

// Load sample data for demonstration
function loadSampleData() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    appData.appointments = [
        {
            id: 1,
            dogName: 'Buddy',
            ownerName: 'Smith Family',
            date: formatDate(today),
            time: '09:00',
            duration: 30,
            rate: 15.00,
            address: '123 Main St',
            specialInstructions: 'Loves treats! Very energetic.',
            status: 'pending',
            paymentStatus: 'unpaid',
            photo: dogPhotos[0]
        },
        {
            id: 2,
            dogName: 'Luna',
            ownerName: 'Johnson Family',
            date: formatDate(today),
            time: '15:30',
            duration: 45,
            rate: 20.00,
            address: '456 Oak Ave',
            specialInstructions: 'Gentle walk, older dog.',
            status: 'pending',
            paymentStatus: 'unpaid',
            photo: dogPhotos[1]
        },
        {
            id: 3,
            dogName: 'Max',
            ownerName: 'Brown Family',
            date: formatDate(yesterday),
            time: '10:00',
            duration: 30,
            rate: 15.00,
            address: '789 Pine Rd',
            specialInstructions: 'Friendly but pulls on leash.',
            status: 'completed',
            paymentStatus: 'paid',
            paymentDate: formatDate(yesterday),
            photo: dogPhotos[2]
        },
        {
            id: 4,
            dogName: 'Charlie',
            ownerName: 'Davis Family',
            date: formatDate(yesterday),
            time: '16:00',
            duration: 60,
            rate: 25.00,
            address: '321 Elm St',
            specialInstructions: 'Needs extra exercise.',
            status: 'completed',
            paymentStatus: 'unpaid',
            photo: dogPhotos[3]
        },
        {
            id: 5,
            dogName: 'Bella',
            ownerName: 'Wilson Family',
            date: formatDate(tomorrow),
            time: '08:30',
            duration: 30,
            rate: 15.00,
            address: '654 Maple Dr',
            specialInstructions: 'Very small dog, be careful.',
            status: 'pending',
            paymentStatus: 'unpaid',
            photo: dogPhotos[4]
        }
    ];
    
    appData.expenses = [
        {
            id: 1,
            amount: 5.99,
            category: 'treats',
            description: 'Dog treats from pet store',
            date: formatDate(yesterday)
        },
        {
            id: 2,
            amount: 12.50,
            category: 'bags',
            description: 'Biodegradable poop bags',
            date: formatDate(new Date(today.getTime() - 3 * 24 * 60 * 60 * 1000))
        },
        {
            id: 3,
            amount: 8.75,
            category: 'transport',
            description: 'Bus fare to appointments',
            date: formatDate(new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000))
        }
    ];
    
    saveData();
}

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

// Format date to YYYY-MM-DD
function formatDate(date) {
    return date.toISOString().split('T')[0];
}

// Format date for display
function formatDisplayDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Format time for display
function formatDisplayTime(timeString) {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
}

// Format currency
function formatCurrency(amount) {
    return `$${parseFloat(amount).toFixed(2)}`;
}

// Get week start date
function getWeekStart(weekOffset = 0) {
    const now = new Date();
    const start = new Date(now);
    start.setDate(now.getDate() - now.getDay() + (weekOffset * 7));
    start.setHours(0, 0, 0, 0);
    return start;
}

// Get week end date
function getWeekEnd(weekOffset = 0) {
    const start = getWeekStart(weekOffset);
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    end.setHours(23, 59, 59, 999);
    return end;
}

// Check if date is today
function isToday(dateString) {
    const today = new Date();
    const date = new Date(dateString);
    return date.toDateString() === today.toDateString();
}

// Generate unique ID
function generateId() {
    return Date.now() + Math.random().toString(36).substr(2, 9);
}

// =============================================================================
// UI FUNCTIONS
// =============================================================================

// Show toast notification
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const messageEl = toast.querySelector('.toast-message');
    const iconEl = toast.querySelector('.toast-icon');
    
    messageEl.textContent = message;
    
    if (type === 'success') {
        iconEl.textContent = '🎉';
        toast.style.background = '#7ED321';
    } else if (type === 'error') {
        iconEl.textContent = '❌';
        toast.style.background = '#FF6B6B';
    }
    
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Update current date display
function updateCurrentDate() {
    const dateEl = document.getElementById('currentDate');
    const now = new Date();
    dateEl.textContent = now.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// =============================================================================
// TAB NAVIGATION
// =============================================================================

// Switch between tabs
function switchTab(tabName) {
    // Hide all tabs
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    // Show selected tab
    document.getElementById(`${tabName}-tab`).classList.add('active');
    
    // Update navigation
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => item.classList.remove('active'));
    event.target.closest('.nav-item').classList.add('active');
    
    // Refresh tab content
    switch(tabName) {
        case 'home':
            renderTodaysSchedule();
            break;
        case 'payments':
            renderPaymentsSummary();
            renderPaymentsList();
            break;
        case 'expenses':
            renderExpenseCategories();
            renderExpensesList();
            break;
        case 'earnings':
            renderEarningsSummary();
            renderEarningsChart();
            break;
    }
}

// =============================================================================
// HOME TAB - TODAY'S SCHEDULE
// =============================================================================

// Render today's schedule
function renderTodaysSchedule() {
    const container = document.getElementById('todaysSchedule');
    const today = formatDate(new Date());
    const todaysAppointments = appData.appointments.filter(apt => apt.date === today);
    
    if (todaysAppointments.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">🐕</div>
                <p>No walks scheduled for today!</p>
                <button class="add-btn" onclick="showAddAppointmentModal()">Add Your First Walk</button>
            </div>
        `;
        return;
    }
    
    // Sort by time
    todaysAppointments.sort((a, b) => a.time.localeCompare(b.time));
    
    container.innerHTML = todaysAppointments.map(appointment => `
        <div class="appointment-card ${appointment.status}" onclick="showAppointmentDetails(${appointment.id})">
            <div class="card-header">
                <div class="dog-info">
                    <img src="${appointment.photo}" alt="${appointment.dogName}" class="dog-photo" onerror="this.src='https://via.placeholder.com/60x60/4A90E2/white?text=🐕'">
                    <div class="dog-details">
                        <h3>${appointment.dogName}</h3>
                        <p>${appointment.ownerName}</p>
                    </div>
                </div>
                <div class="appointment-status">
                    <div class="status-badge ${appointment.status}" onclick="event.stopPropagation(); toggleStatus(${appointment.id})">
                        ${appointment.status === 'completed' ? '✅ Done' : '🔄 Pending'}
                    </div>
                    <div class="payment-badge ${appointment.paymentStatus}" onclick="event.stopPropagation(); togglePayment(${appointment.id})">
                        ${appointment.paymentStatus === 'paid' ? '✅ Paid' : '❌ Unpaid'}
                    </div>
                </div>
            </div>
            <div class="appointment-details">
                <div class="detail-item">
                    <span>⏰ Time</span>
                    <strong>${formatDisplayTime(appointment.time)}</strong>
                </div>
                <div class="detail-item">
                    <span>⏱️ Duration</span>
                    <strong>${appointment.duration} min</strong>
                </div>
                <div class="detail-item">
                    <span>💵 Rate</span>
                    <strong>${formatCurrency(appointment.rate)}</strong>
                </div>
                <div class="detail-item">
                    <span>📍 Address</span>
                    <strong>${appointment.address}</strong>
                </div>
            </div>
            ${appointment.specialInstructions ? `
                <div class="special-instructions">
                    <span>📋 Special Instructions:</span>
                    <p>${appointment.specialInstructions}</p>
                </div>
            ` : ''}
        </div>
    `).join('');
}

// Toggle appointment status
function toggleStatus(id) {
    const appointment = appData.appointments.find(apt => apt.id === id);
    if (appointment) {
        appointment.status = appointment.status === 'completed' ? 'pending' : 'completed';
        saveData();
        renderTodaysSchedule();
        showToast(appointment.status === 'completed' ? 'Walk completed! 🎉' : 'Walk marked as pending');
    }
}

// Toggle payment status
function togglePayment(id) {
    const appointment = appData.appointments.find(apt => apt.id === id);
    if (appointment) {
        if (appointment.paymentStatus === 'paid') {
            appointment.paymentStatus = 'unpaid';
            delete appointment.paymentDate;
            showToast('Payment marked as unpaid');
        } else {
            appointment.paymentStatus = 'paid';
            appointment.paymentDate = formatDate(new Date());
            showToast('Payment received! 💰');
        }
        saveData();
        renderTodaysSchedule();
        renderPaymentsSummary();
    }
}

// =============================================================================
// PAYMENTS TAB
// =============================================================================

// Render payments summary
function renderPaymentsSummary() {
    const weekStart = getWeekStart(0);
    const weekEnd = getWeekEnd(0);
    
    const weeklyAppointments = appData.appointments.filter(apt => {
        const aptDate = new Date(apt.date);
        return aptDate >= weekStart && aptDate <= weekEnd;
    });
    
    const weeklyEarnings = weeklyAppointments
        .filter(apt => apt.paymentStatus === 'paid')
        .reduce((sum, apt) => sum + apt.rate, 0);
    
    const outstandingPayments = appData.appointments
        .filter(apt => apt.paymentStatus === 'unpaid' && apt.status === 'completed')
        .reduce((sum, apt) => sum + apt.rate, 0);
    
    document.getElementById('weeklyEarnings').textContent = formatCurrency(weeklyEarnings);
    document.getElementById('outstandingPayments').textContent = formatCurrency(outstandingPayments);
}

// Render payments list
function renderPaymentsList() {
    const container = document.getElementById('paymentsList');
    const recentAppointments = appData.appointments
        .filter(apt => apt.status === 'completed')
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 10);
    
    if (recentAppointments.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">💰</div>
                <p>No completed walks yet!</p>
                <p>Complete some walks to track payments.</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = recentAppointments.map(appointment => `
        <div class="payment-card">
            <div class="card-header">
                <div class="dog-info">
                    <img src="${appointment.photo}" alt="${appointment.dogName}" class="dog-photo" onerror="this.src='https://via.placeholder.com/60x60/4A90E2/white?text=🐕'">
                    <div class="dog-details">
                        <h3>${appointment.dogName}</h3>
                        <p>${formatDisplayDate(appointment.date)}</p>
                    </div>
                </div>
                <div class="payment-info">
                    <div class="amount">${formatCurrency(appointment.rate)}</div>
                    <div class="payment-badge ${appointment.paymentStatus}" onclick="togglePayment(${appointment.id})">
                        ${appointment.paymentStatus === 'paid' ? '✅ Paid' : '❌ Unpaid'}
                    </div>
                </div>
            </div>
            ${appointment.paymentDate ? `
                <div class="payment-date">
                    Paid on ${formatDisplayDate(appointment.paymentDate)}
                </div>
            ` : ''}
        </div>
    `).join('');
}

// Filter payments
function filterPayments(filter) {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    const cards = document.querySelectorAll('.payment-card');
    cards.forEach(card => {
        const badge = card.querySelector('.payment-badge');
        const isPaid = badge.classList.contains('paid');
        
        if (filter === 'all' || 
            (filter === 'paid' && isPaid) || 
            (filter === 'unpaid' && !isPaid)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// =============================================================================
// EXPENSES TAB
// =============================================================================

// Render expense categories
function renderExpenseCategories() {
    const categories = {
        treats: 'treatExpenses',
        bags: 'bagExpenses',
        equipment: 'equipmentExpenses',
        transport: 'transportExpenses'
    };
    
    for (const [category, elementId] of Object.entries(categories)) {
        const total = appData.expenses
            .filter(exp => exp.category === category)
            .reduce((sum, exp) => sum + exp.amount, 0);
        
        document.getElementById(elementId).textContent = formatCurrency(total);
    }
}

// Render expenses list
function renderExpensesList() {
    const container = document.getElementById('expensesList');
    const sortedExpenses = appData.expenses
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 10);
    
    if (sortedExpenses.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">📝</div>
                <p>No expenses recorded yet!</p>
                <p>Add expenses to track your business costs.</p>
            </div>
        `;
        return;
    }
    
    const categoryIcons = {
        treats: '🦴',
        bags: '🛍️',
        equipment: '🎾',
        transport: '🚗',
        other: '📱'
    };
    
    container.innerHTML = sortedExpenses.map(expense => `
        <div class="expense-card">
            <div class="card-header">
                <div class="expense-info">
                    <div class="category-icon">${categoryIcons[expense.category]}</div>
                    <div class="expense-details">
                        <h3>${expense.description}</h3>
                        <p>${formatDisplayDate(expense.date)}</p>
                    </div>
                </div>
                <div class="expense-amount">
                    ${formatCurrency(expense.amount)}
                </div>
            </div>
        </div>
    `).join('');
}

// =============================================================================
// EARNINGS TAB
// =============================================================================

// Render earnings summary
function renderEarningsSummary() {
    const weekStart = getWeekStart(appData.currentWeekOffset);
    const weekEnd = getWeekEnd(appData.currentWeekOffset);
    
    // Calculate earnings for the week
    const weeklyAppointments = appData.appointments.filter(apt => {
        const aptDate = new Date(apt.date);
        return aptDate >= weekStart && aptDate <= weekEnd && apt.paymentStatus === 'paid';
    });
    
    const totalEarnings = weeklyAppointments.reduce((sum, apt) => sum + apt.rate, 0);
    
    // Calculate expenses for the week
    const weeklyExpenses = appData.expenses.filter(exp => {
        const expDate = new Date(exp.date);
        return expDate >= weekStart && expDate <= weekEnd;
    });
    
    const totalExpenses = weeklyExpenses.reduce((sum, exp) => sum + exp.amount, 0);
    
    const netProfit = totalEarnings - totalExpenses;
    
    // Update display
    document.getElementById('totalEarnings').textContent = formatCurrency(totalEarnings);
    document.getElementById('totalExpenses').textContent = formatCurrency(totalExpenses);
    document.getElementById('netProfit').textContent = formatCurrency(netProfit);
    
    // Update profit color
    const profitEl = document.getElementById('netProfit');
    if (netProfit > 0) {
        profitEl.className = 'amount green';
    } else if (netProfit < 0) {
        profitEl.className = 'amount red';
    } else {
        profitEl.className = 'amount';
    }
    
    // Update week display
    const weekText = appData.currentWeekOffset === 0 ? 'This Week' : 
                     appData.currentWeekOffset === -1 ? 'Last Week' :
                     appData.currentWeekOffset === 1 ? 'Next Week' :
                     `Week of ${weekStart.toLocaleDateString()}`;
    
    document.getElementById('currentWeek').textContent = weekText;
}

// Change week view
function changeWeek(direction) {
    appData.currentWeekOffset += direction;
    renderEarningsSummary();
    renderEarningsChart();
}

// Render earnings chart
function renderEarningsChart() {
    const canvas = document.getElementById('earningsChart');
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = 400;
    canvas.height = 200;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Get last 7 days data
    const days = [];
    const earnings = [];
    const expenses = [];
    
    for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i + (appData.currentWeekOffset * 7));
        
        const dayEarnings = appData.appointments
            .filter(apt => apt.date === formatDate(date) && apt.paymentStatus === 'paid')
            .reduce((sum, apt) => sum + apt.rate, 0);
        
        const dayExpenses = appData.expenses
            .filter(exp => exp.date === formatDate(date))
            .reduce((sum, exp) => sum + exp.amount, 0);
        
        days.push(date.toLocaleDateString('en-US', { weekday: 'short' }));
        earnings.push(dayEarnings);
        expenses.push(dayExpenses);
    }
    
    // Chart dimensions
    const chartWidth = canvas.width - 80;
    const chartHeight = canvas.height - 80;
    const barWidth = chartWidth / days.length / 2 - 10;
    const maxValue = Math.max(...earnings, ...expenses, 50);
    
    // Draw background
    ctx.fillStyle = '#f8f9fa';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw bars
    days.forEach((day, index) => {
        const x = 50 + index * (chartWidth / days.length);
        const earningsHeight = (earnings[index] / maxValue) * chartHeight;
        const expensesHeight = (expenses[index] / maxValue) * chartHeight;
        
        // Earnings bar
        ctx.fillStyle = '#7ED321';
        ctx.fillRect(x, canvas.height - 30 - earningsHeight, barWidth, earningsHeight);
        
        // Expenses bar
        ctx.fillStyle = '#FF6B6B';
        ctx.fillRect(x + barWidth + 5, canvas.height - 30 - expensesHeight, barWidth, expensesHeight);
        
        // Day label
        ctx.fillStyle = '#666';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(day, x + barWidth, canvas.height - 10);
    });
    
    // Draw legend
    ctx.fillStyle = '#7ED321';
    ctx.fillRect(20, 20, 15, 15);
    ctx.fillStyle = '#333';
    ctx.font = '12px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('Earnings', 40, 32);
    
    ctx.fillStyle = '#FF6B6B';
    ctx.fillRect(120, 20, 15, 15);
    ctx.fillText('Expenses', 140, 32);
}

// Share earnings with parents
function shareEarnings() {
    const weekStart = getWeekStart(appData.currentWeekOffset);
    const weekEnd = getWeekEnd(appData.currentWeekOffset);
    
    const weeklyAppointments = appData.appointments.filter(apt => {
        const aptDate = new Date(apt.date);
        return aptDate >= weekStart && aptDate <= weekEnd && apt.paymentStatus === 'paid';
    });
    
    const totalEarnings = weeklyAppointments.reduce((sum, apt) => sum + apt.rate, 0);
    
    const weeklyExpenses = appData.expenses.filter(exp => {
        const expDate = new Date(exp.date);
        return expDate >= weekStart && expDate <= weekEnd;
    });
    
    const totalExpenses = weeklyExpenses.reduce((sum, exp) => sum + exp.amount, 0);
    const netProfit = totalEarnings - totalExpenses;
    
    const shareText = `🐕 Alex's Dog Walking Report
    
Week: ${weekStart.toLocaleDateString()} - ${weekEnd.toLocaleDateString()}
💰 Total Earnings: ${formatCurrency(totalEarnings)}
📝 Total Expenses: ${formatCurrency(totalExpenses)}
🎉 Net Profit: ${formatCurrency(netProfit)}
🚶 Walks Completed: ${weeklyAppointments.length}

Great job this week! 🌟`;
    
    if (navigator.share) {
        navigator.share({
            title: 'Alex\'s Dog Walking Report',
            text: shareText
        });
    } else {
        // Fallback for browsers that don't support Web Share API
        navigator.clipboard.writeText(shareText).then(() => {
            showToast('Report copied to clipboard! 📋');
        });
    }
}

// =============================================================================
// MODAL FUNCTIONS
// =============================================================================

// Show add appointment modal
function showAddAppointmentModal() {
    const modal = document.getElementById('addAppointmentModal');
    const form = document.getElementById('appointmentForm');
    
    // Set default date to today
    document.getElementById('walkDate').value = formatDate(new Date());
    
    // Reset form
    form.reset();
    
    // Show modal
    modal.classList.add('active');
}

// Show add expense modal
function showAddExpenseModal() {
    const modal = document.getElementById('addExpenseModal');
    const form = document.getElementById('expenseForm');
    
    // Set default date to today
    document.getElementById('expenseDate').value = formatDate(new Date());
    
    // Reset form
    form.reset();
    
    // Show modal
    modal.classList.add('active');
}

// Close modal
function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

// =============================================================================
// FORM HANDLERS
// =============================================================================

// Handle appointment form submission
document.getElementById('appointmentForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const appointment = {
        id: generateId(),
        dogName: document.getElementById('dogName').value,
        ownerName: document.getElementById('ownerName').value,
        date: document.getElementById('walkDate').value,
        time: document.getElementById('walkTime').value,
        duration: parseInt(document.getElementById('walkDuration').value),
        rate: parseFloat(document.getElementById('walkRate').value),
        address: document.getElementById('ownerAddress').value,
        specialInstructions: document.getElementById('specialInstructions').value,
        status: 'pending',
        paymentStatus: 'unpaid',
        photo: dogPhotos[Math.floor(Math.random() * dogPhotos.length)]
    };
    
    appData.appointments.push(appointment);
    saveData();
    
    closeModal('addAppointmentModal');
    renderTodaysSchedule();
    showToast('New walk added! 🐕');
});

// Handle expense form submission
document.getElementById('expenseForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const expense = {
        id: generateId(),
        amount: parseFloat(document.getElementById('expenseAmount').value),
        category: document.getElementById('expenseCategory').value,
        description: document.getElementById('expenseDescription').value,
        date: document.getElementById('expenseDate').value
    };
    
    appData.expenses.push(expense);
    saveData();
    
    closeModal('addExpenseModal');
    renderExpenseCategories();
    renderExpensesList();
    showToast('Expense recorded! 📝');
});

// =============================================================================
// EVENT LISTENERS
// =============================================================================

// Close modals when clicking outside
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('active');
    }
});

// Handle keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const activeModal = document.querySelector('.modal.active');
        if (activeModal) {
            activeModal.classList.remove('active');
        }
    }
});

// =============================================================================
// INITIALIZATION
// =============================================================================

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Load data
    loadData();
    
    // Update current date
    updateCurrentDate();
    
    // Render initial content
    renderTodaysSchedule();
    renderPaymentsSummary();
    renderExpenseCategories();
    renderEarningsSummary();
    
    // Update date every minute
    setInterval(updateCurrentDate, 60000);
    
    console.log('🐕 Alex\'s Dog Walking Scheduler loaded successfully!');
});

// =============================================================================
// ADDITIONAL FEATURES
// =============================================================================

// Show appointment details (placeholder for future enhancement)
function showAppointmentDetails(id) {
    const appointment = appData.appointments.find(apt => apt.id === id);
    if (appointment) {
        showToast(`Viewing details for ${appointment.dogName}`, 'info');
    }
}

// Export data (for backup)
function exportData() {
    const dataStr = JSON.stringify(appData, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'dog-walking-data.json';
    link.click();
    URL.revokeObjectURL(url);
}

// Import data (for restoration)
function importData(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            appData = data;
            saveData();
            location.reload();
        } catch (error) {
            showToast('Error importing data', 'error');
        }
    };
    reader.readAsText(file);
}

// Reset app data (for demo purposes)
function resetApp() {
    if (confirm('Are you sure you want to reset all data? This cannot be undone.')) {
        localStorage.removeItem('dogWalkingApp');
        location.reload();
    }
}

// Make functions globally available for debugging
window.dogWalkingApp = {
    exportData,
    importData,
    resetApp,
    appData,
    showToast
}; 
