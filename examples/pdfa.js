/*
 * you could read this from a file (e.g. server) or generate it (e.g. in the browser)
 */
var fileContent = '<?xml version="1.0" encoding="UTF-8"?><note>Hello World</note>'

/*
 * we can embed files in the pdf (/EmbeddedFiles)
 * if PDF/A-3 is requested, files will also appear in PDF/A-3 Associated Files (/AF) section
*/
var embeddedFiles = [{
  name: 'Hello world.xml',
  mime: 'text/xml',
  description: 'Foo',
  AFRelationship: 'Alternative',
  updatedAt: new Date(),
  content: fileContent
}];

/*
 * we can give additional XMP RDF to be injected in the pdf
 * Note: do not include attribute "rdf:about" as it is added automatically
 *       with the correct file identifier
 */
var anotherXmpRdf = '<rdf:Description><note>hello</note></rdf:Description>';

var fonts = {
	Roboto: {
		normal: 'fonts/Roboto-Regular.ttf'
	}
};

var PdfPrinter = require('../src/printer');
var printer = new PdfPrinter(fonts);
var fs = require('fs');

var docDefinition = {
	pdfKit: {
	  pdfa: true,
  	pdfaAdditionalXmpRdf: anotherXmpRdf,
  	embeddedFiles: embeddedFiles
	},
	content: [
		'Hello PDF/A-3!'
	]
};

var pdfDoc = printer.createPdfKitDocument(docDefinition);
pdfDoc.pipe(fs.createWriteStream('pdfs/pdfa.pdf'));
pdfDoc.end();
