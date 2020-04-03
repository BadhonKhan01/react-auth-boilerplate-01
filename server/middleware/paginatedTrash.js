let paginatedTrash = (model, populate) => {
    return async (req, res, next) => {

        /*-------------------------------------------
        |--- @Get Current Page & Par Page Value
        -------------------------------------------*/
        const currentPages = parseInt(req.query.currentpages);
        const parPage = parseInt(req.query.parpage);

        /*-------------------------------------------
        |--- @Data Start Index & Start Index
        -------------------------------------------*/
        const startIndex = (currentPages - 1) * parPage;
        const endIndex = currentPages * parPage;

        /*------------------------------------------------------
        |--- @Store Result in This Result Empty Object
        ------------------------------------------------------*/
        const results = {}

        /*------------------------------------------------------
        |--- @Increment Current Page & Par Page Value
        ------------------------------------------------------*/
        if(endIndex < await model.countDocuments().exec()){
            results.next = {
                nextpages: currentPages + 1,
                parpage: parPage
            }
        }

        /*------------------------------------------------------
        |--- @Decrement Current Page & Par Page Value
        ------------------------------------------------------*/
        if(startIndex > 0){
            results.previous = {
                previouspages: currentPages - 1,
                parpage: parPage
            }
        }

        /*------------------------------------------------------
        |--- @Get Mongodb Query
        ------------------------------------------------------*/
        results.items = await model.find({ deleteItem: 1 })
                                    .limit(parPage)
                                    .skip(startIndex)
                                    .sort([['_id','desc' ]])
                                    .populate(populate)
                                    .exec();
        results.countItems = await model.find({ deleteItem: 1 }).countDocuments();
        results.countTrashItems = await model.find({ deleteItem: 1 }).countDocuments();
        const totalItems = await model.find({ deleteItem: 1 }).exec();

        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil( totalItems.length / parPage ); i++) {
            pageNumbers.push(i);
        }
        results.countPages = pageNumbers;
        res.paginated = results;

        next();
    }
}

module.exports = { paginatedTrash }