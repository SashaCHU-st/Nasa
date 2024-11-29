class HttpError extends Error
{
    constructor(message, errorCode)
    {
        super(message);/// add message property, super означает от родителя 
        this.code = errorCode;// add code property
    }
}

module.exports = HttpError