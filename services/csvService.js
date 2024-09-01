// services/csvService.js
const fs = require('fs');
const fastcsv = require('fast-csv');

async function parseCSV(filePath) {
    return new Promise((resolve, reject) => {
        const results = [];
        fs.createReadStream(filePath)
            .pipe(fastcsv.parse({ headers: true, skipEmptyLines: true }))
            .on('data', row => {
                try {
                    // Ensure required fields are present
                    if (!row.serialNumber || !row.productName || !row.inputImageUrls) {
                        throw new Error('Missing required columns');
                    }

                    // Ensure inputImageUrls is treated as a string
                    row.inputImageUrls = String(row.inputImageUrls);

                    results.push(row);
                } catch (error) {
                    console.error('Error parsing row:', error);
                }
            })
            .on('end', () => {
                resolve(results);
            })
            .on('error', error => {
                reject(error);
            });
    });
}

module.exports = {
    parseCSV,
};
