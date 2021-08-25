const dbClient = require('../configuration/db-config');
const validation = require('../services/validation-service');
const common = require('../services/common-service');

var validSortColumns = [
    {
        key: 'createdtime',
        value: '__createdtime__'
    },
    {
        key: 'ratings',
        value: 'ratings'
    }
];

// const getAllBookDetails = (req, res) => {
//     console.log('getAllBookDetails');
//     var sortBy, sortOrder;
//     sortBy = validation.validateSortColumn(req.params.column, validSortColumns);
//     if (sortBy === 'ERROR') {
//         return res.status(489).json(
//             {
//                 errorCode: 489,
//                 message: `Invalid sort column - ${req.params.column}`
//             }
//         )
//     }
//     sortOrder = validation.validateSortOrder(req.params.order);
//     if (sortOrder === 'ERROR') {
//         return res.status(489).json(
//             {
//                 errorCode: 489,
//                 message: `Invalid sort order - ${req.params.order}`
//             }
//         );
//     }
//     dbClient.query(`SELECT * from ${process.env.SCHEMA}.books ORDER BY ${sortBy} ${sortOrder}`, 
//     (error, response) => {
//         if (error) {
//             return res.status(489).json(error);
//         }
//         return res.status(200).json(response.data);
//     });
// }

const getBookDetailsById = (req, res) => {
    console.log('getBookDetailsById');
    dbClient.query(`SELECT * from ${process.env.SCHEMA}.books WHERE book_id = '${req.params.bookId}'`, 
    (error, response) => {
        if (error) {
            return res.status(489).json(error);
        }
        return res.status(200).json(response.data);
    });
}

const getAllBookDetailsWithFilters = (req, res) => {
    console.log('getAllBookDetailsWithFilters');
    var title, sortBy, sortOrder, catId, author;
    title = common.processReqParams(req.params.title);
    catId = common.processReqParams(req.params.catId);
    author = common.processReqParams(req.params.author);
    sortBy = validation.validateSortColumn(req.params.column, validSortColumns);
    if (sortBy === 'ERROR') {
        return res.status(489).json(
            {
                errorCode: 489,
                message: `Invalid sort column - ${req.params.column}`
            }
        )
    }
    sortOrder = validation.validateSortOrder(req.params.order);
    if (sortOrder === 'ERROR') {
        return res.status(489).json(
            {
                errorCode: 489,
                message: `Invalid sort order - ${req.params.order}`
            }
        );
    }
    dbClient.query(`SELECT * from ${process.env.SCHEMA}.books WHERE title like '%${title}%' AND category_id like '%${catId}%' AND author like '%${author}%' ORDER BY ${sortBy} ${sortOrder}`,
    (error, response) => {
        if (error) {
            return res.status(489).json(error);
        }
        return res.status(200).json(response.data);
    });
}

const getAuthors = (req, res) => {
    console.log('getAuthors');
    dbClient.query(`SELECT DISTINCT author from ${process.env.SCHEMA}.books`,
    (error, response) => {
        var authorList = [];
        if (error) {
            return res.status(489).json(error);
        }
        for (i = 0; i < response.data.length; i++) {
            // console.log((response.data[i].author).split(','));
            var authors = (response.data[i].author).split(',');
            for (j = 0; j < authors.length; j++) {
                if (!authorList.includes(authors[j])) {
                    authorList.push(authors[j].trim());
                }
            }
        }
        // console.log(authorList);
        return res.status(200).json({'authors':authorList});
    })

}

module.exports = {
    // getAllBookDetails,
    getBookDetailsById,
    getAllBookDetailsWithFilters,
    getAuthors
}