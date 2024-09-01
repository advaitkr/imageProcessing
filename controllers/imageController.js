const { saveToCSV } = require('../services/csvService');
const ProcessingStatus = require('../models/processingStatusModel');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const processImages = require('../services/imageService').processImages;
const processCSV = require('../services/imageService').processCSV;
const { parseCSV } = require('../services/csvService'); // Adjust the path as needed

const {saveOutputDataToCSV} = require("../utils/csvUtils")

exports.uploadCSV = async (req, res) => {
    try {
        const filePath = req.file.path; // Assuming file is uploaded and path is provided
        const csvData = await parseCSV(filePath); // Use parseCSV to read CSV

        // Validate CSV data structure
        if (!Array.isArray(csvData) || csvData.length === 0) {
            return res.status(400).json({ message: 'Invalid CSV data structure' });
        }

        // Process the images based on CSV data
        const processedData = await processImages(csvData);

        // Save the processed data to a CSV file
        await saveOutputDataToCSV(processedData);

        // Respond to the client
        res.status(200).json({
            message: 'CSV processed successfully',
            data: processedData
        });
    } catch (error) {
        console.error('Error processing CSV:', error);
        res.status(500).json({
            message: 'Error processing CSV file',
            error: error.message
        });
    }
};


exports.checkStatus = async (req, res) => {
    const { requestId } = req.params;
    const status = await ProcessingStatus.findOne({ requestId });

    if (!status) {
        return res.status(404).json({ message: 'Request ID not found' });
    }

    res.json({ requestId, status: status.status, updatedAt: status.updatedAt });
};
