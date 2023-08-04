import React, { useEffect, useState } from 'react';
import xml2js from 'xml2js';

const XmlDataFetcher = () => {
    const [xmlData, setXmlData] = useState(null);

    useEffect(() => {
        const fetchXmlData = async () => {
            try {
                const response = await fetch('https://rozgar.com/sitemap.xml');
                const xmlText = await response.text();
                const parsedData = await parseXml(xmlText);
                setXmlData(parsedData);
            } catch (error) {
                console.error('Error fetching or parsing XML data:', error);
            }
        };

        fetchXmlData();
    }, []);

    const parseXml = (xmlText) => {
        return new Promise((resolve, reject) => {
            xml2js.parseString(xmlText, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    };

    // Render the fetched XML data (adjust as needed based on the structure of your XML file)
    return (
        <div>
            {xmlData ? (
                <pre>{JSON.stringify(xmlData, null, 2)}</pre>
            ) : (
                <p>Loading XML data...</p>
            )}
        </div>
    );
};

export default XmlDataFetcher;
