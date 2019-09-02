
'use strict';
function displayResults(responseJson) {
    console.log('displayResults ran');
    $(responseJson).ready(function () {
        $('.loading').addClass('hidden')
    })
    console.log(responseJson)
    console.log(responseJson.length)
    console.log(responseJson[0].owner.login)
    let user = responseJson[0].owner.login
    let userinfo = `
        <h4>User: <span class="user">${user}</span></h4>
        <h4><span class="user">Repos: ${responseJson.length}</span></h4>
        <ul class="results-list"></ul>
    `
    $('.js-results').append(userinfo)
    for (let i = 0; i < responseJson.length; i++) {
        $('.js-results').append(`
        <div class="result-item"><li><h4>${responseJson[i].name}</h4>
        <a href="${responseJson[i].html_url}">${responseJson[i].html_url}</a>
        </li></div>
        `)
    }
    $('.js-results').removeClass('hidden')

}

function getRepos(username) {
    console.log('getRepos ran');
    const url = `https://api.github.com/users/${username}/repos`
    console.log(url);
    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson))
        .catch(err => {
            displayError(err.message);
        });
}

function displayError(error) {
    console.log('displayError ran');
    $('.js-results').html(`<h3 class="error">Something went wrong: ${error}</h3>`)
    $('.loading').addClass('hidden');
    $('.js-results').removeClass('hidden')
}
function getSearchPhrase() {
    return (['Search', 'Find', 'Gitty up GitHub','Look up','Go','Check','Push this button','Don\'t push this button'])[Math.floor(Math.random() * 8)];
}

function watchForm() {
    $('#js-form').submit(event => {
        event.preventDefault();
        console.log('watchForm ran');
        let searchPhrase = getSearchPhrase()
        console.log(searchPhrase)
        $('#find-btn').html(searchPhrase)
        $('.js-results').empty().addClass('hidden')
        const username = $('.js-username').val();
        console.log(username);
        $('.loading').removeClass('hidden');
        setTimeout(function () {
            getRepos(username);
        }, 1000)
    });
}

$(watchForm);