exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: JSON.stringify({ message: 'Method Not Allowed' }) };
    }
    const { employeeCount } = JSON.parse(event.body);
    try {
        // Note: Netlify Functions don't have persistent file storage.
        // For now, simulate saving for testing.
        console.log('Received:', { employeeCount });
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Lead saved! Thank you.' })
        };
    } catch (error) {
        console.error('Function error:', error.message);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error saving lead' })
        };
    }
};