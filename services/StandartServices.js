import convert from "xml-js";

class StandartServices {
    Convert(data) {
        const format = data.headers["content-type"].split(';')[0].split('/')[1];

        if (format == 'xml') return convert.xml2js(data.data, {compact: true, spaces: 4});
        else if (format == 'json') return data.data;
        else throw new Error("Format result unknown")
    }
}

export default new StandartServices();