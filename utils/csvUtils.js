const path = require('path');
const { createObjectCsvWriter } = require('csv-writer');
const fs = require('fs');
const fastcsv = require('fast-csv');
async function saveOutputDataToCSV(data) {
    // const outputFilePath = path.join(__dirname,'output_images.csv');
    const outputFilePath = path.join(__dirname, '../output/output_images.csv');

    if (!Array.isArray(data) || data.length === 0) {
        console.error('Invalid data format. Expected a non-empty array.');
        return;
    }

    console.log('Data to be saved to CSV:', data);

    const csvWriter = createObjectCsvWriter({
        path: outputFilePath,
        header: [
            { id: 'serialNumber', title: 'Serial Number' },
            { id: 'productName', title: 'Product Name' },
            { id: 'inputImageUrls', title: 'Input Image URLs' },
            { id: 'outputImageUrls', title: 'Output Image URLs' },
        ],
    });

    try {
        await csvWriter.writeRecords(data);
        console.log(`Processed data has been saved to ${outputFilePath}`);
    } catch (error) {
        console.error('Error saving processed data to CSV:', error);
    }
}

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
                    row.inputImageUrls = String(row.inputImageUrls).trim();
                    
                    // Check for valid URL format
                    const urls = row.inputImageUrls.split(',');
                    if (urls.some(url => !url.startsWith('http'))) {
                        throw new Error('Invalid image URLs format');
                    }

                    results.push(row);
                } catch (error) {
                    console.error('Error parsing row:', error.message);
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



module.exports = { saveOutputDataToCSV,parseCSV };

