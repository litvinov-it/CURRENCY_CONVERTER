// Imports
import convert from "xml-js";

// Class
class StandartServices {
    Convert(data) {
        // Fucntion convert data in JSON
        const format = data.headers["content-type"].split(';')[0].split('/')[1];

        // Return
        if (format == 'xml') return convert.xml2js(data.data, {compact: true, spaces: 4});
        else if (format == 'json') return data.data;

        // Throw error if format unknown
        else throw new Error("Format result unknown")
    }
}

// Export class
export default new StandartServices();