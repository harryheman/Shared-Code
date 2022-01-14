export default (name = Date.now()) => `
<div class="question-box">
    <br><hr>
    <h4 class="title"></h4>
    <div class="row">
        <input type="text" class="form-control col-11 question-text">
        <button class="btn btn-danger col remove-question-btn">X</button>
    </div>
    <hr>
    <h4>Answers:</h4>
    <div class="row answers-box">
        <div class="input-group">
            <div class="input-group-prepend">
                <div class="input-group-text">
                    <input type="radio" checked name="${name}">
                </div>
            </div>

            <input class="form-control answer-text" type="text" >

            <div class="input-group-append">
                <button class="btn btn-outline-danger remove-answer-btn">X</button>
            </div>
        </div>
        <div class="input-group">
            <div class="input-group-prepend">
                <div class="input-group-text">
                    <input type="radio" name="${name}">
                </div>
            </div>

            <input class="form-control answer-text" type="text" >

            <div class="input-group-append">
                <button class="btn btn-outline-danger remove-answer-btn">X</button>
            </div>
        </div>
        <div class="input-group">
            <div class="input-group-prepend">
                <div class="input-group-text">
                    <input type="radio" name="${name}">
                </div>
            </div>

            <input class="form-control answer-text" type="text" >

            <div class="input-group-append">
                <button class="btn btn-outline-danger remove-answer-btn">X</button>
            </div>
        </div>
    </div>
    <br>
    <button class="btn btn-primary add-answer-btn">Add answer</button>
    <hr>
    <h4>Explanation:</h4>
    <div class="row explanation-box">
        <input type="text" class="form-control explanation-text">
    </div>
</div>
`
