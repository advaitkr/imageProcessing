// services/imageService.js
const fs = require('fs');
const fastcsv = require('fast-csv');
const sharp = require("sharp")
const axios = require('axios');
const path = require('path');
const { saveOutputDataToCSV } = require('../utils/csvUtils');
async function processCSV(filePath) {
    return new Promise((resolve, reject) => {
        const results = [];
        fs.createReadStream(filePath)
            .pipe(fastcsv.parse({ headers: true }))
            .on('data', (row) => results.push(row))
            .on('end', () => resolve(results))
            .on('error', reject);
    });
}




const outputDir = path.join(__dirname, '../processed_images');
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

async function downloadAndProcessImage(imageUrl, outputPath) {
    try {
        const response = await axios({
            url: imageUrl,
            responseType: 'arraybuffer'
        });
        await sharp(response.data)
            .resize(800)
            .jpeg({ quality: 50 }) // Adjust size as needed
            .toFile(outputPath);
    } catch (error) {
        console.error('Error processing image:', imageUrl, error.message);
        throw new Error('Error processing image');
    }
}

async function processImages(csvData) {
    const processedData = [];

    if (!Array.isArray(csvData) || csvData.length === 0) {
        throw new Error('Invalid data format. Expected a non-empty array.');
    }

    for (const row of csvData) {
        const inputImageUrls = row.inputImageUrls.split(',').map(url => url.trim());
        if (inputImageUrls.some(url => !url.startsWith('http'))) {
            throw new Error('Invalid image URLs format.');
        }

        const outputImageUrls = [];

        for (const url of inputImageUrls) {
            const imageFileName = path.basename(url);
            const outputPath = path.join(outputDir, imageFileName);

            await downloadAndProcessImage(url, outputPath);
            outputImageUrls.push(`processed_images/${imageFileName}`);
        }

        processedData.push({
            serialNumber: row.serialNumber,
            productName: row.productName,
            inputImageUrls: row.inputImageUrls,
            outputImageUrls: outputImageUrls.join(',')
        });
    }

    return processedData;
}

module.exports = { processImages };

