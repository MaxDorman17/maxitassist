const express = require('express');
const fs = require('fs').promises;
const app = express();
const port = 3000;

app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
app.use(express.static('.'));

app.post('/api/trial', async (req, res) => {
    const { employeeCount } = req.body;
    console.log('Received:', { employeeCount });
    try {
        let leads = [];
        try {
            const data = await fs.readFile('leads.json', 'utf8');
            leads = JSON.parse(data || '[]');
        } catch (error) {
            if (error.code === 'ENOENT') {
                console.log('leads.json not found, creating new file');
            } else {
                console.error('Error reading leads.json:', error);
                throw error;
            }
        }
        leads.push({ employeeCount, timestamp: new Date().toISOString() });
        await fs.writeFile('leads.json', JSON.stringify(leads, null, 2));
        console.log('Lead saved:', { employeeCount });
        res.json({ message: 'Lead saved! Thank you.' });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ message: 'Error saving lead' });
    }
});

app.listen(port, () => console.log(`🚀 Server running on http://localhost:${port}`));