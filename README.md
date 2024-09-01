# imageProcessing  
This project is a Node.js-based image processing system that reads image URLs from a CSV file, processes the images, and saves the processed data to a new CSV file. It involves downloading images, resizing them, and handling various errors related to image URLs and data formats.

Table of Contents
Features
Folder Structure
Setup
Usage
Error Handling
Troubleshooting
License
Features
Read image URLs from a CSV file.
Validate and process image URLs.
Resize images and save them to a specified directory.
Save processed image data to a new CSV file.
Handle and log errors related to image processing and CSV parsing.
Folder Structure
plaintext
Copy code
image-processing-system/
│
├── controllers/
│   └── imageController.js
│
├── services/
│   └── imageService.js
│
├── utils/
│   └── csvUtils.js
│
├── processed_images/ (generated directory for processed images)
│
├── uploads/ (directory for uploaded CSV files)
│
├── app.js
└── package.json
Setup
Clone the Repository

bash
Copy code
git clone https://github.com/yourusername/image-processing-system.git
cd image-processing-system
Install Dependencies

Make sure you have Node.js installed. Then run:

bash
Copy code
npm install
Set Up Environment

Ensure you have the necessary environment variables and configurations. You may need to adjust configurations based on your environment.

Usage
Start the Application

Run the application using:

bash
Copy code
npm start
Upload CSV File

To process images, upload a CSV file through the provided endpoint. The CSV file should be uploaded to the /uploads directory and follow this format:

plaintext
Copy code
serialNumber,productName,inputImageUrls
1,Product A,http://example.com/image1.jpg,http://example.com/image2.jpg
Process the CSV File

Once uploaded, the system will process the images according to the URLs provided in the CSV file. Processed images will be saved in the processed_images directory, and a new CSV file with processed data will be saved.
The output will be saved inside utils/
Error Handling
Invalid Image URLs Format: Ensure that the image URLs in the CSV file start with http and are properly formatted.
Invalid Data Format: The CSV data must be a non-empty array with the expected columns.
Missing Output File Path: Ensure the output directory is correctly set up and accessible.
Troubleshooting
Error: parseCSVFile is not defined
Make sure that parseCSVFile is correctly imported and defined in imageController.js.
Error: Missing output file path
Ensure the output directory is created and specified correctly. Check imageService.js for proper directory setup.
Error: Invalid image URLs format
Verify that the URLs in the CSV are valid and properly formatted.
Error: undefined is not iterable
Ensure that the data passed to csv-writer is correctly formatted and not undefined.
