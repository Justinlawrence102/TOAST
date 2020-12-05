

Creators:
Hannah Williams
Justin Lawrence
Chase Root

# TOAST

TOAST (Terms of Applicable Service Translator): https://toastuf.glitch.me/

## Description

This web application was completed for a senior design project at UF during the Fall of 2020.

This tool works by first gathering the terms of service text from the provided link using the Cheerio web scraper. Then, the tool sends this information through a natural language processing Node.js module called Natural, which removes extraneous words (such as articles, et cetera) and verb tenses to compact the sentences down to smallest meaningful values. This is then compared to common terms on a database we created to identify important phrases. This information is then included on a resultant textured agreement, with a summary of important terms found, associated highlighting of important text in a reproduction of the original terms of service, and icons & vignettes to further engage the user. We also display a confidence score, which is the average of all confidence scores generated when each natural language processed sentence is compared to our database.

## Creators
Justin Lawrence  
Chase Root  
Hannah Williams  

## License
[MIT](https://choosealicense.com/licenses/mit/)
