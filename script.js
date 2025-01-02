const voltageElement = document.getElementById('voltage');
const currentElement = document.getElementById('current');
const tableBody = document.querySelector('#data-table tbody');

async function fetchData() {
    try {
        // Fetch all data records from the backend
        const response = await fetch(''postgres://database_piezoeletric_user:yi9qGEvsvCzkvpNswrKHmKW5rIpKuBOd@host:5432/postgresql://database_piezoeletric_user:yi9qGEvsvCzkvpNswrKHmKW5rIpKuBOd@dpg-ctqm86aj1k6c73a34t0g-a/database_piezoeletric // Adjust the endpoint if necessary
        const data = await response.json();

        if (data && data.length > 0) {
            // Get the latest record (assuming it's the last item in the array)
            const latestData = data[data.length - 1];

            // Update live data display
            voltageElement.textContent = latestData.voltage;
            currentElement.textContent = latestData.current;

            // Clear existing table rows
            tableBody.innerHTML = '';

            // Populate the table with the latest data (limit to the last 10 entries)
            const latestEntries = data.slice(-10); // Get the last 10 records
            latestEntries.forEach(entry => {
                const row = document.createElement('tr');
                row.innerHTML = `<td>${entry.voltage}</td><td>${entry.current}</td>`;
                tableBody.appendChild(row);
            });
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function sortTable(columnIndex) {
    const rows = Array.from(tableBody.rows);
    rows.sort((a, b) => {
        const valA = parseFloat(a.cells[columnIndex].textContent);
        const valB = parseFloat(b.cells[columnIndex].textContent);
        return valA - valB;
    });
    rows.forEach(row => tableBody.appendChild(row)); // Re-attach rows in sorted order
}

// Fetch data periodically (every 2 seconds)
setInterval(fetchData, 2000);
